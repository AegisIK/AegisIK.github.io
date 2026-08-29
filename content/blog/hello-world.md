---
title: "Hello, world"
description: "A placeholder post that shows the shape of the frontmatter. Delete this file whenever you're ready to write something real."
date: 2026-08-29
tags: ["meta"]
draft: true
---

This post is a **template**. It is marked `draft: true`, so it does not appear on
the site, in the sitemap, or in the RSS feed. Flip that to `false` to publish it.

## Adding a post

1. Create a new file in `content/blog/`, e.g. `content/blog/my-post.md`.
2. Copy the frontmatter block above. The filename becomes the URL —
   `my-post.md` renders at `/blog/my-post`.
3. Write Markdown. Run `npm run dev` to preview at `localhost:4321`.
4. Commit and push. The site rebuilds and deploys on its own.

### Frontmatter reference

| Field | Required | Notes |
|---|---|---|
| `title` | yes | The `<h1>` and the `<title>` tag |
| `description` | yes | Your Google result snippet — write it for a human |
| `date` | yes | `YYYY-MM-DD` |
| `updated` | no | Shows "updated ..." and refreshes `dateModified` |
| `tags` | no | List of strings |
| `draft` | no | `true` hides the post everywhere |
| `image` | no | Social card path, e.g. `/images/my-post.png` |

A missing or misspelled field fails the build with a clear error rather than
silently shipping a broken page.

### Formatting

Regular prose, `inline code`, [links](https://example.com), and blockquotes:

> Everything here is styled to match the rest of the site.

```python
def hello() -> str:
    return "syntax highlighting works too"
```
