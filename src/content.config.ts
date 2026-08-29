import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Blog posts live in `content/blog/*.md`. Drop a file in, it appears.
 * The schema below is validated at build time — a typo in frontmatter
 * fails the build loudly instead of silently shipping a broken page.
 */
const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './content/blog' }),
  schema: z.object({
    title: z.string(),
    // Used as the meta description for the post. Write it for a human
    // scanning Google results, not for a crawler.
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    // Draft posts are excluded from the site, the sitemap, and the RSS feed.
    draft: z.boolean().default(false),
    // Optional social-card image, relative to /public. Falls back to the
    // site-wide OG card when omitted.
    image: z.string().optional(),
  }),
});

/**
 * The homepage intro prose. A one-file collection so the bio stays plain
 * Markdown (links, bold, paragraphs) while Astro handles the rendering.
 */
const about = defineCollection({
  loader: glob({ pattern: 'about.md', base: './content' }),
  schema: z.object({
    researchBlurb: z.string(),
  }),
});

export const collections = { blog, about };
