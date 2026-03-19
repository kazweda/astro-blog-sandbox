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

| Path | Dev server | Production (GitHub Pages) |
|------|-----------|--------------------------|
| `/blog/rss.xml/` | 200 — RSS XML | 404 |
| `/blog/rss.xml` | 404 — Starlight 404 page | 200 — RSS XML |

Dev and production behave in opposite ways for these two paths.

The `Blog post with slug 'blog/rss.xml' not found` runtime error (claimed in [netplanmyj/astro-starlight#160](https://github.com/netplanmyj/astro-starlight/issues/160)) was **not reproduced** in this repository. The 404 in dev is a standard Starlight 404 page, not a blog post misidentification error.

See [issue #3](https://github.com/kazweda/astro-blog-sandbox/issues/3) for the full analysis.

## Interpretation

The dev/production inconsistency appears to stem from how Astro's `trailingSlash: "always"` interacts with the `[...prefix]/rss.xml` endpoint registered by starlight-blog. In dev the route is served at the trailing-slash URL; in production the static file has no trailing slash. This is a behavior boundary issue, not a confirmed plugin logic bug.

## Local Commands

- `pnpm dev` - Start local dev server
- `pnpm build` - Build static output
- `pnpm preview` - Preview built site
- `pnpm check` - Run Astro static analysis
- `pnpm lint` - Run ESLint
- `pnpm test` - Build and run RSS route smoke test

## GitHub Pages

After enabling Pages with source `GitHub Actions`, pushes to `main` deploy the site.

