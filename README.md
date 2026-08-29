# kevinxhan.com

Personal site for Kevin Han. Built with [Astro](https://astro.build), deployed to
GitHub Pages. Ships zero JavaScript.

```
npm install     # once
npm run dev     # preview at localhost:4321, live-reloads as you edit
npm run build   # production build into dist/
```

---

## Updating the site

**Everything you edit lives in `content/`.** You never need to touch `src/`.

| I want to… | Edit this |
|---|---|
| Change my bio | `content/about.md` |
| Add or reorder a paper | `content/publications.yaml` |
| Change my name, tagline, links, or SEO description | `content/site.yaml` |
| Write a blog post | new file in `content/blog/` |
| Swap my photo | replace `public/images/kevin.jpg` |
| Update my CV | replace `public/cv.pdf` |

Commit and push to `master`. GitHub Actions rebuilds and deploys automatically —
usually live in under a minute.

### Adding a paper

Open `content/publications.yaml` and copy an existing block to the top:

```yaml
- title: "Your Paper Title"
  authors: "Kevin Han, Coauthor One, Coauthor Two"
  venue: "Conference Name (ABBR), 2026"
  year: 2026
  url: "https://arxiv.org/abs/..."
  award: "Best Paper Award"        # optional
  links:
    - label: pdf
      url: "https://arxiv.org/abs/..."
    - label: code
      url: "https://github.com/..."
```

Your name is bolded automatically. For co-first authorship write `Kevin Han*`.
Papers render in file order, so newest goes at the top.

### Writing a post

Create `content/blog/my-post.md`:

```markdown
---
title: "What I learned scaling MLIP inference"
description: "A one-sentence summary. This becomes your Google result snippet."
date: 2026-09-15
tags: ["research", "systems"]
draft: false
---

Your Markdown here.
```

The filename becomes the URL: `my-post.md` → `kevinxhan.com/blog/my-post`.
Set `draft: true` to hide a post from the site, the sitemap, and the RSS feed.
`content/blog/hello-world.md` is a draft template with the full field reference —
delete it whenever you like.

### Adding a new section

Sections like Experience, Projects, or Teaching are about ten lines of work:
add a YAML file under `content/`, then drop a `<Section>` block into
`src/pages/index.astro` following the `Selected Papers` pattern.

---

## SEO

Most of this is automatic. What's already wired up:

- **Canonical URLs** on every page — prevents duplicate-content dilution.
- **JSON-LD structured data** — a `Person` entity with your affiliations,
  alternate name spellings, and verified profile links (`sameAs`), plus every
  paper as a `ScholarlyArticle`, and `BlogPosting` + `BreadcrumbList` on posts.
  This is what search engines read to decide that the query "Kevin Han" means
  *you*, and it's the prerequisite for a knowledge panel.
- **Sitemap** at `/sitemap-index.xml`, regenerated every build.
- **RSS feed** at `/rss.xml`.
- **Open Graph + Twitter cards** — `public/og.png` is the 1200×630 image people
  see when your site is shared. Regenerate it with `npm run og` after changing
  your name, tagline, or photo.
- **`robots.txt`** that explicitly allows AI answer engines (GPTBot,
  ClaudeBot, PerplexityBot, Google-Extended), since those increasingly mediate
  "who is this person" queries.
- **`max-image-preview:large`** so Google shows a big thumbnail next to your
  result rather than a text-only line.
- **Semantic HTML, a skip link, and zero client JS** — Core Web Vitals are a
  ranking signal, and this site has essentially nothing to slow it down.

### What you still need to do by hand

1. **Verify the domain in [Google Search Console](https://search.google.com/search-console)**
   and [Bing Webmaster Tools](https://www.bing.com/webmasters). Paste the
   verification codes into `verification:` in `content/site.yaml`, then submit
   `https://kevinxhan.com/sitemap-index.xml` in both.
2. **Point your other profiles back here.** Add `kevinxhan.com` to your Google
   Scholar homepage field, GitHub bio, LinkedIn, and arXiv author page. The
   `sameAs` links only assert ownership in one direction — inbound links from
   those high-authority profiles are what actually confirm it.
3. **Keep the description in `content/site.yaml` current.** It's the single
   highest-leverage field on the site; it's what appears under your name in
   search results.

---

## Deployment

Pushes to `master` trigger `.github/workflows/deploy.yml`, which builds the site
and publishes `dist/` to GitHub Pages.

**One-time setup:** in the repo's **Settings → Pages**, set **Source** to
**GitHub Actions** (it currently points at a branch, for the old Jekyll build).
Leave the custom domain as `kevinxhan.com`.

`public/CNAME` keeps the custom domain attached on every deploy — don't delete it.

---

## Layout

```
content/            ← everything you edit
  site.yaml           name, links, SEO, structured data
  about.md            homepage bio prose
  publications.yaml   papers
  blog/               posts
public/             ← static files served as-is
  images/, og.png, favicon.svg, robots.txt, CNAME
src/                ← the machinery; rarely needs touching
  pages/              routes (index, blog, rss.xml, 404)
  components/         SEO, LinkRow, Section, PublicationEntry
  layouts/            BaseLayout
  styles/global.css   all styling; design tokens at the top
  lib/site.ts         loads YAML, bolds your name in author lists
scripts/make-og.mjs ← regenerates the social card
```

Design tokens (colors, fonts, spacing) are the `:root` block at the top of
`src/styles/global.css`. Change a value there and it propagates site-wide.
