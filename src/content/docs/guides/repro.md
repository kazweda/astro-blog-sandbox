---
title: Reproduction Notes
description: Minimal setup to reproduce feed-like path routing behavior in starlight-blog.
---

This sandbox configures Astro + Starlight + starlight-blog with `trailingSlash: "always"`.

Check these routes in dev mode:

- `/blog/rss.xml`
- `/blog/rss.xml/`

If i18n is enabled in a variant, also check:

- `/en/blog/rss.xml`
- `/en/blog/rss.xml/`
