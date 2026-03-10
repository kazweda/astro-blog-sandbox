# astro-blog-sandbox

Minimal reproduction sandbox for feed-like paths in `starlight-blog` under `trailingSlash: "always"`.

This repo intentionally uses:

- Astro
- Starlight
- starlight-blog

## Problem

starlight-blog may classify feed-like paths such as `/blog/rss.xml` as blog post slugs when `trailingSlash` is `always`, which can lead to blog-entry resolution errors instead of handling feed routes correctly.

## Reproduction

1. Clone this minimal repo: `https://github.com/kazweda/astro-blog-sandbox`
2. Install dependencies: `pnpm install`
3. Start dev server: `pnpm dev`
4. Open `/blog/rss.xml` and `/blog/rss.xml/`
5. Repeat with i18n path if included: `/en/blog/rss.xml`

## Behavior

Actual:

Feed-like paths can be routed through blog post resolution logic and may produce a blog post not found error path.

Expected:

Feed/index-like terminals such as `rss.xml` should never be treated as blog post pages. They should be handled as feed routes consistently, regardless of trailing slash.

## Local Commands

- `pnpm dev` - Start local dev server
- `pnpm build` - Build static output
- `pnpm preview` - Preview built site
- `pnpm check` - Run Astro static analysis
- `pnpm lint` - Run ESLint
- `pnpm test` - Build and run RSS route smoke test

## GitHub Pages

This repository includes a GitHub Actions workflow for Pages deployment.

After enabling Pages in repository settings with source set to `GitHub Actions`, pushes to `main` will deploy the site.
