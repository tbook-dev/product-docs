# TBook Product Docs

TBook product documentation — migrated from the GitBook space
[docs.tbook.com/tbook](https://docs.tbook.com/tbook) and now maintained here.

Live site: **https://tbook-dev.github.io/product-docs/**

## How to edit the docs

The docs are plain Markdown files under [`docs/`](docs/); the directory tree
mirrors the original GitBook URL structure. Edit a file, open a PR against
`master`, and the merged change is built and published to GitHub Pages
automatically by [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

- Sidebar/navigation lives in [`sidebars.ts`](sidebars.ts).
- Images live in [`static/img/`](static/img/) and are referenced as
  `![](/img/<name>.<ext>)`.
- The site is built with [Docusaurus](https://docusaurus.io/):
  `npm ci && npm start` for a local preview, `npm run build` for the
  production build (fails on broken links and missing images).

## Migration provenance

The content was imported verbatim from GitBook:

- `scripts/gitbook-source/` — frozen snapshot of the raw Markdown exports of
  all 45 GitBook pages (plus `llms.txt`, the page index), fetched 2026-07-09.
- `scripts/import-gitbook.mjs` — the one-shot importer that produced `docs/`
  and `static/img/` from that snapshot. Only sanctioned markup transforms are
  applied (GitBook hint/stepper templates, figure tags, internal links,
  heading anchors); body text is untouched.
- `scripts/verify-gitbook-parity.mjs` — proved per-page zero-diff parity
  between the snapshot and `docs/` modulo exactly those transforms, and ran
  in CI until intentional content editing began on 2026-07-10. **This repo
  is the source of truth now**; the scripts and snapshot are kept only as a
  historical record of what was migrated.

Post-migration content fixes (deliberate divergence from the GitBook
original): removed two broken `mailto:undefined` links (in
`architecture-of-wise` and the FAQ Telegram setup page) and one stray
`[<br>](https://app.gitbook.com/...)` editor link (in
`custom-off-chain-api-on-sui`).
