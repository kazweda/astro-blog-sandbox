---
title: Behavior Notes
description: Minimal setup to observe trailingSlash behavior for endpoint-like paths.
---

This sandbox configures Astro + Starlight + starlight-blog with `trailingSlash: "always"`.

Check these routes in dev mode and compare behavior:

- `/blog/rss.xml`
- `/blog/rss.xml/`

If i18n is enabled in a variant, also check:

- `/en/blog/rss.xml`
- `/en/blog/rss.xml/`
