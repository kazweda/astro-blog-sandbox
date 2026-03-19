# astro-blog-sandbox

Observation sandbox for Astro `trailingSlash: "always"` behavior with endpoint-like paths in a Starlight + starlight-blog setup.

This repository does not claim a confirmed plugin bug. It is a neutral reproduction and behavior record.

## Background

- Discussion origin: [netplanmyj/astro-starlight#160](https://github.com/netplanmyj/astro-starlight/issues/160)
- Refined analysis (Astro 6.0 confirmed): [netplanmyj/astro-starlight#194](https://github.com/netplanmyj/astro-starlight/issues/194)
- Related PR: [HiDeoo/starlight-blog#196](https://github.com/HiDeoo/starlight-blog/pull/196) (closed)
- Related issue: [HiDeoo/starlight-blog#198](https://github.com/HiDeoo/starlight-blog/issues/198)
- Astro core maintainer comment: [withastro/astro#9674 (comment)](https://github.com/withastro/astro/issues/9674#issuecomment-1969265501)

## Reproduction

1. Clone: `https://github.com/kazweda/astro-blog-sandbox`
2. Install: `pnpm install`
3. Run dev server: `pnpm dev`
4. Open both paths: `/blog/rss.xml/` and `/blog/rss.xml`

## Observed Behavior

Verified with **astro 6.0.5 + starlight-blog 0.26.1**:

| Path | Dev server | Production (static build) |
|------|-----------|--------------------------|
| `/blog/rss.xml/` | 200 — RSS XML | 404 |
| `/blog/rss.xml` | 404 + `Blog post with slug 'blog/rss.xml' not found.` error | 200 — RSS XML |

Dev and production behave in opposite ways for these two paths.

See [issue #3](https://github.com/kazweda/astro-blog-sandbox/issues/3) and [netplanmyj/astro-starlight#194](https://github.com/netplanmyj/astro-starlight/issues/194) for the full analysis.

## Root Cause

Under `trailingSlash: 'always'`, the dev server only recognizes the injected route `/[...prefix]/rss.xml` at the trailing-slash URL. Without a trailing slash, the request falls through to the catch-all `/[...prefix]/[...page]` route and is mistakenly treated as a blog post lookup — producing the `Blog post with slug 'blog/rss.xml' not found` error.

In production, the static file `/blog/rss.xml` is served directly and returns 200. No trailing slash is involved.

Note: issue #160 incorrectly attributed the error to `isAnyBlogPostPage()` misidentification. The actual cause is routing priority between the injected RSS route and the catch-all blog route under `trailingSlash: 'always'`.

## Upstream Confirmation (by Design)

Both upstream maintainers have confirmed this is Astro's intended behavior, not a bug:

- **Astro core maintainer** ([withastro/astro#9674](https://github.com/withastro/astro/issues/9674#issuecomment-1969265501)):
  > It's not the first time users were 'surprised' that trailingSlash was affecting endpoints too, especially the ones that emit images. We will discuss if it's worth to allowlist 'known' extensions. Still, that's not a bug.

- **starlight-blog maintainer** ([HiDeoo/starlight-blog#198](https://github.com/HiDeoo/starlight-blog/issues/198#issuecomment-4033381332)):
  > The described behavior, as surprising as it may seem, is actually the expected one in Astro for endpoints as described in this issue, even the different behavior between the dev server and the actual build output when building for production.

## Workaround

`src/pages/404.astro` implements a client-side JS redirect to handle the dev server case:

```js
const rssRedirectMap = {
  '/blog/rss.xml': '/blog/rss.xml/',
  '/en/blog/rss.xml': '/en/blog/rss.xml/',
};
```

In dev: `/blog/rss.xml` → 404.astro → redirects to `/blog/rss.xml/` (200).
In production: `/blog/rss.xml` is served as a static file (200) — the workaround is not needed.

## Local Commands

- `pnpm dev` - Start local dev server
- `pnpm build` - Build static output
- `pnpm preview` - Preview built site
- `pnpm check` - Run Astro static analysis
- `pnpm lint` - Run ESLint
- `pnpm test` - Build and run RSS route smoke test

## GitHub Pages

After enabling Pages with source `GitHub Actions`, pushes to `main` deploy the site.

