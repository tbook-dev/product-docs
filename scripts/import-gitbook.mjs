#!/usr/bin/env node
/**
 * One-shot importer: GitBook markdown exports -> Docusaurus docs/.
 *
 * Reads the frozen snapshot in scripts/gitbook-source/ (45 page exports +
 * llms.txt index) and emits docs/**.md plus static/img/<fileId>.<ext>.
 *
 * Only the transforms listed below are applied; body text is never touched.
 * scripts/verify-gitbook-parity.mjs re-derives each transform and proves a
 * per-page zero diff, so the two scripts must be kept rule-for-rule in sync.
 *
 * Transforms:
 *   1. Drop the llms.txt banner line (first line of every export).
 *   2. Heading anchors `## T <a href="#x" id="x"></a>` -> `## T {#x}`.
 *   3. `{% hint style="X" %}`/`{% endhint %}` -> `:::X` / `:::` admonitions.
 *   4. `{% stepper %}`/`{% step %}` marker lines removed (steps keep their
 *      own ### headings; numbering is visual chrome).
 *   5. `<figure><img src="/files/<id>"...></figure>` -> `![](/img/<id>.<ext>)`;
 *      <div> wrappers that contain only figures are dropped.
 *   6. Internal links (https://docs.tbook.com/tbook/<p>.md and /tbook/<p>.md)
 *      -> file-relative links, validated by the Docusaurus build.
 *   7. The bare space link https://docs.tbook.com/tbook/ -> overview page.
 *   8. Whitepaper `<table data-header-hidden>`: strip its <thead> (GitBook
 *      hides it; keeping it would render text absent from the live site).
 *   9. Front matter: `slug: /` on the space root page; `description:` for
 *      the pages that carry one in llms.txt (meta-only on GitBook).
 *
 * Images cannot be fetched from the /files/<id> URLs in the exports (they
 * 404). Instead each page's rendered HTML is fetched and the original
 * files.gitbook.io URLs are read from its data-testid="zoom-image" tags,
 * paired with the export's figures by order. A per-page count assertion
 * protects the pairing; magic bytes decide the file extension.
 *
 * Usage:
 *   node scripts/import-gitbook.mjs [--skip-images] [--fetch]
 *     --skip-images  reuse images already in static/img/ (content-only rerun)
 *     --fetch        re-download llms.txt + all exports into gitbook-source/
 */

import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'scripts', 'gitbook-source');
const DOCS = path.join(ROOT, 'docs');
const IMG = path.join(ROOT, 'static', 'img');
const SITE = 'https://docs.tbook.com/tbook';
const ROOT_PAGE = 'introduction/overview';

const SKIP_IMAGES = process.argv.includes('--skip-images');
const FETCH = process.argv.includes('--fetch');

function fail(msg) {
  console.error(`ERROR: ${msg}`);
  process.exit(1);
}

async function fetchText(url) {
  const res = await fetch(url, {redirect: 'follow'});
  if (!res.ok) fail(`GET ${url} -> ${res.status}`);
  return res.text();
}

// ---------------------------------------------------------------- llms.txt

function parseIndex(text) {
  const pages = [];
  const re = /^- \[(.+?)\]\(https:\/\/docs\.tbook\.com\/tbook\/(.+?)\.md\)(?:: (.*))?$/;
  for (const line of text.split('\n')) {
    const m = line.match(re);
    if (m) pages.push({title: m[1], path: m[2], description: m[3] ?? null});
  }
  if (pages.length === 0) fail('llms.txt: no pages parsed');
  return pages;
}

// ------------------------------------------------------------------ images

const MAGIC = [
  {ext: 'png', test: (b) => b.length > 4 && b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47},
  {ext: 'jpg', test: (b) => b.length > 2 && b[0] === 0xff && b[1] === 0xd8},
  {ext: 'gif', test: (b) => b.length > 4 && b.subarray(0, 4).toString('ascii') === 'GIF8'},
  {ext: 'webp', test: (b) => b.length > 12 && b.subarray(0, 4).toString('ascii') === 'RIFF' && b.subarray(8, 12).toString('ascii') === 'WEBP'},
  {ext: 'svg', test: (b) => /^\s*(<\?xml|<svg)/.test(b.subarray(0, 256).toString('utf8'))},
];

function figureIdsInOrder(exportText) {
  return [...exportText.matchAll(/<img src="\/files\/([A-Za-z0-9]+)"/g)].map((m) => m[1]);
}

function zoomImageUrls(html) {
  const urls = [];
  for (const tag of html.matchAll(/<img\b[^>]*data-testid="zoom-image"[^>]*>/g)) {
    const src = tag[0].match(/\bsrc="([^"]+)"/);
    if (!src) fail(`zoom-image tag without src: ${tag[0].slice(0, 120)}`);
    const url = new URL(src[1].replace(/&amp;/g, '&'), SITE);
    const inner = url.searchParams.get('url');
    if (!inner) fail(`zoom-image src has no url= param: ${src[1].slice(0, 120)}`);
    urls.push(inner);
  }
  return urls;
}

async function downloadImages(pages, exportsByPath) {
  const idToExt = new Map();
  for (const page of pages) {
    const ids = figureIdsInOrder(exportsByPath.get(page.path));
    if (ids.length === 0) continue;
    const html = await fetchText(`${SITE}/${page.path}`);
    const urls = zoomImageUrls(html);
    if (urls.length !== ids.length) {
      fail(`${page.path}: export has ${ids.length} figures but rendered page has ${urls.length} zoom-images — order pairing unsafe, aborting`);
    }
    for (let i = 0; i < ids.length; i++) {
      const id = ids[i];
      if (idToExt.has(id)) fail(`file id ${id} appears in more than one figure — pairing assumption broken`);
      const res = await fetch(urls[i]);
      if (!res.ok) fail(`image GET ${urls[i]} -> ${res.status} (page ${page.path})`);
      const buf = Buffer.from(await res.arrayBuffer());
      const magic = MAGIC.find((m) => m.test(buf));
      if (!magic) fail(`undetectable image type for ${id} from ${urls[i]} (page ${page.path})`);
      const nameExt = path.extname(new URL(urls[i]).pathname).replace('.', '').toLowerCase();
      if (nameExt && nameExt !== magic.ext && !(nameExt === 'jpeg' && magic.ext === 'jpg')) {
        console.warn(`  note: ${id} filename says .${nameExt} but magic bytes say .${magic.ext}; using magic`);
      }
      fs.writeFileSync(path.join(IMG, `${id}.${magic.ext}`), buf);
      idToExt.set(id, magic.ext);
      console.log(`  image ${id}.${magic.ext}  (${buf.length} bytes, ${page.path})`);
    }
  }
  return idToExt;
}

function existingImageMap() {
  const idToExt = new Map();
  for (const f of fs.readdirSync(IMG)) {
    const m = f.match(/^([A-Za-z0-9]{16,})\.(png|jpg|gif|webp|svg)$/);
    if (m) idToExt.set(m[1], m[2]);
  }
  return idToExt;
}

// ---------------------------------------------------------------- content

function yamlQuote(s) {
  return `'${s.replace(/'/g, "''")}'`;
}

function collapseBlankRuns(text) {
  const out = [];
  let inFence = false;
  let blanks = 0;
  for (const line of text.split('\n')) {
    if (/^(```|~~~)/.test(line.trim())) inFence = !inFence;
    if (!inFence && line.trim() === '') {
      blanks++;
      if (blanks > 1) continue;
    } else {
      blanks = 0;
    }
    out.push(line);
  }
  return out.join('\n');
}

function relativeLink(fromPath, toPath, anchor = '') {
  let rel = path.posix.relative(path.posix.dirname(fromPath), toPath);
  if (!rel.startsWith('.')) rel = `./${rel}`;
  return `${rel}${anchor}`;
}

function transformPage(page, raw, idToExt) {
  let lines = raw.split('\n');

  // 1. banner
  if (!lines[0].startsWith('> For the complete documentation index')) {
    fail(`${page.path}: first line is not the llms.txt banner — unknown export variant`);
  }
  lines = lines.slice(lines[1] === '' ? 2 : 1);

  const out = [];
  for (let line of lines) {
    // 2. heading anchors -> {#id}
    line = line.replace(
      /^(#{1,6} .+?)\s*<a href="#[^"]*" id="([^"]*)"><\/a>\s*$/,
      (_, h, id) => `${h} {#${id}}`,
    );
    // 3. hints -> admonitions (closer dedented to column 0)
    line = line.replace(/^\{% hint style="(info|warning)" %\}\s*$/, ':::$1');
    line = line.replace(/^\s*\{% endhint %\}\s*$/, ':::');
    // 4. stepper markers -> removed
    if (/^\{% (stepper|endstepper|step|endstep) %\}\s*$/.test(line)) continue;
    // 5. drop <div> wrappers whose content is only figures
    const div = line.match(/^<div[^>]*>(.*)<\/div>$/);
    if (div && /^(\s*<figure>.*<\/figure>\s*)+$/.test(div[1])) line = div[1].trim();
    line = line.replace(
      /<figure><img src="\/files\/([A-Za-z0-9]+)"[^>]*><figcaption><\/figcaption><\/figure>/g,
      (_, id) => {
        const ext = idToExt.get(id);
        if (!ext) fail(`${page.path}: no downloaded image for file id ${id}`);
        return `![](/img/${id}.${ext})`;
      },
    );
    // one gallery line may now hold several images separated by spaces
    line = line.replace(/(!\[\]\(\/img\/[^)]+\))\s+(?=!\[\])/g, '$1\n');
    out.push(line);
  }

  let content = out.join('\n');

  // 6. internal .md links -> file-relative
  content = content.replace(
    /\]\((?:https:\/\/docs\.tbook\.com)?\/tbook\/([^)#]+?)\.md(#[^)]*)?\)/g,
    (_, p, anchor) => `](${relativeLink(page.path, `${p}.md`, anchor ?? '')})`,
  );
  // 7. bare space link -> overview
  content = content.replace(
    /\]\(https:\/\/docs\.tbook\.com\/tbook\/\)/g,
    `](${relativeLink(page.path, `${ROOT_PAGE}.md`)})`,
  );
  // 8. hidden table header
  content = content.replace(
    /(<table data-header-hidden[^>]*>)<thead>[\s\S]*?<\/thead>/g,
    '$1',
  );

  // collapse runs of blank lines left by removed marker lines (fence-aware:
  // blank lines inside code fences are content and must survive verbatim)
  content = collapseBlankRuns(content).replace(/\n+$/, '\n');

  // 9. front matter
  const fm = [];
  if (page.path === ROOT_PAGE) fm.push('slug: /');
  // A doc whose filename equals its parent directory name is treated by
  // Docusaurus as the category index (route /tokenomics instead of
  // /tokenomics/tokenomics); pin the GitBook URL with an explicit slug.
  else if (path.posix.basename(page.path) === path.posix.basename(path.posix.dirname(page.path))) {
    fm.push(`slug: /${page.path}`);
  }
  if (page.description) fm.push(`description: ${yamlQuote(page.description)}`);
  if (fm.length > 0) content = `---\n${fm.join('\n')}\n---\n\n${content}`;

  // residue assertions — anything left means an unrecognized construct.
  // docs.tbook.com is only checked in link targets: the visible text
  // "docs.tbook.com" is legitimate page content. <a href="# catches heading
  // anchors whose shape the rewrite above didn't recognize.
  for (const re of [/\/files\//, /\{%/, /<figure/, /\]\((?:https:\/\/docs\.tbook\.com|\/tbook\/)/, /llms\.txt/, /<a [^>]*href="#/]) {
    const m = content.match(re);
    if (m) fail(`${page.path}: residue "${m[0]}" after transforms — unrecognized construct`);
  }
  return content;
}

// -------------------------------------------------------------------- main

async function main() {
  if (FETCH) {
    console.log('Refreshing gitbook-source/ from live site…');
    fs.mkdirSync(SRC, {recursive: true});
    const index = await fetchText(`${SITE}/llms.txt`);
    fs.writeFileSync(path.join(SRC, 'llms.txt'), index);
    for (const page of parseIndex(index)) {
      const file = path.join(SRC, `${page.path}.md`);
      fs.mkdirSync(path.dirname(file), {recursive: true});
      fs.writeFileSync(file, await fetchText(`${SITE}/${page.path}.md`));
      console.log(`  fetched ${page.path}.md`);
    }
  }

  const pages = parseIndex(fs.readFileSync(path.join(SRC, 'llms.txt'), 'utf8'));
  console.log(`${pages.length} pages in index`);

  const exportsByPath = new Map(
    pages.map((p) => [p.path, fs.readFileSync(path.join(SRC, `${p.path}.md`), 'utf8')]),
  );

  fs.mkdirSync(IMG, {recursive: true});
  const idToExt = SKIP_IMAGES ? existingImageMap() : await downloadImages(pages, exportsByPath);
  console.log(`${idToExt.size} images`);

  fs.rmSync(DOCS, {recursive: true, force: true});
  for (const page of pages) {
    const outFile = path.join(DOCS, `${page.path}.md`);
    fs.mkdirSync(path.dirname(outFile), {recursive: true});
    fs.writeFileSync(outFile, transformPage(page, exportsByPath.get(page.path), idToExt));
    console.log(`  wrote docs/${page.path}.md`);
  }
  console.log('done');
}

await main();
