#!/usr/bin/env node
/**
 * Content-parity proof: docs/ vs the frozen GitBook snapshot.
 *
 * Both sides are normalized to the same canonical text and diffed per page;
 * any difference fails the script. Each normalization rule corresponds 1:1
 * to a sanctioned transform in scripts/import-gitbook.mjs, so a clean run
 * proves that nothing beyond those transforms differs from the GitBook
 * content. No network access — safe for CI.
 *
 * Also asserts:
 *   - docs/ contains exactly the pages listed in llms.txt (no extras),
 *   - every image file on disk is referenced exactly once and vice versa,
 *   - no GitBook residue (template tags, /files/, internal absolute links),
 *   - front matter carries only the sanctioned keys with expected values.
 */

import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'scripts', 'gitbook-source');
const DOCS = path.join(ROOT, 'docs');
const IMG = path.join(ROOT, 'static', 'img');
const ROOT_PAGE = 'introduction/overview';

let failures = 0;
function report(msg) {
  failures++;
  console.error(`FAIL: ${msg}`);
}

function parseIndex(text) {
  const pages = [];
  const re = /^- \[(.+?)\]\(https:\/\/docs\.tbook\.com\/tbook\/(.+?)\.md\)(?:: (.*))?$/;
  for (const line of text.split('\n')) {
    const m = line.match(re);
    if (m) pages.push({title: m[1], path: m[2], description: m[3] ?? null});
  }
  return pages;
}

// Shared final canonicalization for both sides. Deliberately minimal: only
// blank-run collapse outside code fences (mirroring the importer) — no
// trailing-whitespace stripping, so lost hard breaks or in-fence whitespace
// edits cannot hide.
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

function canonical(text) {
  return collapseBlankRuns(text).replace(/^\n+/, '').replace(/\n+$/, '\n');
}

// GitBook export -> canonical form (mirrors import-gitbook.mjs rules).
function normalizeExport(pagePath, raw) {
  let lines = raw.split('\n');
  if (!lines[0].startsWith('> For the complete documentation index')) {
    report(`${pagePath}: export missing llms.txt banner`);
  }
  lines = lines.slice(lines[1] === '' ? 2 : 1);

  const out = [];
  for (let line of lines) {
    line = line.replace(
      /^(#{1,6} .+?)\s*<a href="#[^"]*" id="([^"]*)"><\/a>\s*$/,
      (_, h, id) => `${h} {#${id}}`,
    );
    line = line.replace(/^\{% hint style="(info|warning)" %\}\s*$/, ':::$1');
    line = line.replace(/^\s*\{% endhint %\}\s*$/, ':::');
    if (/^\{% (stepper|endstepper|step|endstep) %\}\s*$/.test(line)) continue;
    const div = line.match(/^<div[^>]*>(.*)<\/div>$/);
    if (div && /^(\s*<figure>.*<\/figure>\s*)+$/.test(div[1])) line = div[1].trim();
    line = line.replace(
      /<figure><img src="\/files\/([A-Za-z0-9]+)"[^>]*><figcaption><\/figcaption><\/figure>/g,
      'IMG($1)',
    );
    line = line.replace(/(IMG\([^)]+\))\s+(?=IMG\()/g, '$1\n');
    out.push(line);
  }
  let content = out.join('\n');
  content = content.replace(
    /\]\((?:https:\/\/docs\.tbook\.com)?\/tbook\/([^)#]+?)\.md(#[^)]*)?\)/g,
    (_, p, a) => `](DOC(${p}${a ?? ''}))`,
  );
  content = content.replace(
    /\]\(https:\/\/docs\.tbook\.com\/tbook\/\)/g,
    `](DOC(${ROOT_PAGE}))`,
  );
  content = content.replace(
    /(<table data-header-hidden[^>]*>)<thead>[\s\S]*?<\/thead>/g,
    '$1',
  );
  return canonical(content);
}

// The exact front matter the importer emits for a page — nothing else is
// sanctioned. Byte-exact comparison closes YAML-spacing/quoting bypasses.
function expectedFrontMatter(page) {
  const fm = [];
  if (page.path === ROOT_PAGE) fm.push('slug: /');
  else if (path.posix.basename(page.path) === path.posix.basename(path.posix.dirname(page.path))) {
    fm.push(`slug: /${page.path}`);
  }
  if (page.description) fm.push(`description: '${page.description.replace(/'/g, "''")}'`);
  return fm.length > 0 ? `---\n${fm.join('\n')}\n---\n\n` : '';
}

// Migrated doc -> canonical form.
function normalizeMigrated(page, raw) {
  let content = raw;

  const expected = expectedFrontMatter(page);
  if (expected) {
    if (content.startsWith(expected)) {
      content = content.slice(expected.length);
    } else {
      report(`${page.path}: front matter is not byte-identical to the sanctioned block`);
      const fm = content.match(/^---\n[\s\S]*?\n---\n+/);
      if (fm) content = content.slice(fm[0].length);
    }
  }
  if (/^---\n/.test(content)) {
    report(`${page.path}: unsanctioned front matter block`);
    const fm = content.match(/^---\n[\s\S]*?\n---\n+/);
    if (fm) content = content.slice(fm[0].length);
  }

  content = content.replace(/!\[\]\(\/img\/([A-Za-z0-9]+)\.[a-z]+\)/g, 'IMG($1)');
  content = content.replace(
    /\]\((\.{1,2}\/[^)#]*?)\.md(#[^)]*)?\)/g,
    (_, rel, a) =>
      `](DOC(${path.posix.normalize(path.posix.join(path.posix.dirname(page.path), rel))}${a ?? ''}))`,
  );
  return canonical(content);
}

function firstDiff(a, b) {
  const al = a.split('\n');
  const bl = b.split('\n');
  for (let i = 0; i < Math.max(al.length, bl.length); i++) {
    if (al[i] !== bl[i]) {
      return `  line ${i + 1}\n  gitbook : ${JSON.stringify(al[i] ?? '<EOF>')}\n  migrated: ${JSON.stringify(bl[i] ?? '<EOF>')}`;
    }
  }
  return '  (differs only in invisible trailing content)';
}

// ------------------------------------------------------------------- main

const pages = parseIndex(fs.readFileSync(path.join(SRC, 'llms.txt'), 'utf8'));
if (pages.length === 0) report('llms.txt: no pages parsed');

// 1. file sets match (.mdx included: Docusaurus would serve it, so an .mdx
// file that isn't in the sanctioned page set must be flagged, not ignored)
const docFiles = fs
  .readdirSync(DOCS, {recursive: true})
  .filter((f) => f.endsWith('.md') || f.endsWith('.mdx'))
  .map((f) => f.replace(/\.mdx?$/, ''))
  .sort();
const indexPaths = pages.map((p) => p.path).sort();
if (JSON.stringify(docFiles) !== JSON.stringify(indexPaths)) {
  const extra = docFiles.filter((f) => !indexPaths.includes(f));
  const missing = indexPaths.filter((f) => !docFiles.includes(f));
  report(`page set mismatch — extra: [${extra}], missing: [${missing}]`);
}

// 2. per-page canonical diff + residue checks
const referencedImages = [];
for (const page of pages) {
  const exportFile = path.join(SRC, `${page.path}.md`);
  const docFile = path.join(DOCS, `${page.path}.md`);
  if (!fs.existsSync(docFile)) continue; // already reported above
  const migratedRaw = fs.readFileSync(docFile, 'utf8');

  for (const re of [/\/files\//, /\{%/, /<figure/, /\]\((?:https:\/\/docs\.tbook\.com|\/tbook\/)/, /llms\.txt/, /<a [^>]*href="#/]) {
    const m = migratedRaw.match(re);
    if (m) report(`${page.path}: GitBook residue ${JSON.stringify(m[0])}`);
  }
  for (const m of migratedRaw.matchAll(/!\[\]\(\/img\/([A-Za-z0-9]+)\.([a-z]+)\)/g)) {
    referencedImages.push(`${m[1]}.${m[2]}`);
  }

  const a = normalizeExport(page.path, fs.readFileSync(exportFile, 'utf8'));
  const b = normalizeMigrated(page, migratedRaw);
  if (a !== b) {
    report(`${page.path}: content diverges from GitBook export`);
    console.error(firstDiff(a, b));
  }
}

// 3. image accounting (favicon.png is site chrome, not page content)
const diskImages = fs
  .readdirSync(IMG)
  .filter((f) => /^[A-Za-z0-9]{16,}\.[a-z]+$/.test(f))
  .sort();
const refSorted = [...referencedImages].sort();
if (new Set(referencedImages).size !== referencedImages.length) {
  report('an image is referenced more than once (unexpected for this space)');
}
if (JSON.stringify(diskImages) !== JSON.stringify(refSorted)) {
  const extra = diskImages.filter((f) => !refSorted.includes(f));
  const missing = refSorted.filter((f) => !diskImages.includes(f));
  report(`image set mismatch — on disk but unreferenced: [${extra}], referenced but missing: [${missing}]`);
}

if (failures > 0) {
  console.error(`\n${failures} parity failure(s)`);
  process.exit(1);
}
console.log(`parity OK: ${pages.length} pages, ${diskImages.length} images`);
