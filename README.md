# astro-blog-sandbox

Observation sandbox for Astro `trailingSlash: "always"` behavior with endpoint-like paths in a Starlight + starlight-blog setup.

This repository does not claim a confirmed plugin bug. It is a neutral reproduction and behavior record.

## Background

- Discussion origin: [netplanmyj/astro-starlight#160](https://github.com/netplanmyj/astro-starlight/issues/160)
- Related PR: [HiDeoo/starlight-blog#196](https://github.com/HiDeoo/starlight-blog/pull/196) (closed)
- Related issue: [HiDeoo/starlight-blog#198](https://github.com/HiDeoo/starlight-blog/issues/198)
- Maintainer interpretation referenced Astro behavior: [withastro/astro#9674 (comment)](https://github.com/withastro/astro/issues/9674#issuecomment-1969265501)

## Reproduction

1. Clone: `https://github.com/kazweda/astro-blog-sandbox`
2. Install: `pnpm install`
3. Run dev server: `pnpm dev`
4. Open both paths: `/blog/rss.xml/` and `/blog/rss.xml`

## Observed Behavior

- `/blog/rss.xml/` behaves as the canonical path and returns RSS content.
- `/blog/rss.xml` can behave differently under `trailingSlash: "always"` and may result in a 404 path in this setup.

## Interpretation

Current interpretation is that this is primarily an Astro `trailingSlash` behavior boundary, not a confirmed starlight-blog bug.

## Local Commands

- `pnpm dev` - Start local dev server
- `pnpm build` - Build static output
- `pnpm preview` - Preview built site
- `pnpm check` - Run Astro static analysis
- `pnpm lint` - Run ESLint
- `pnpm test` - Build and run RSS route smoke test

## GitHub Pages

After enabling Pages with source `GitHub Actions`, pushes to `main` deploy the site.
