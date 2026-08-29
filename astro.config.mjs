// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import yaml from '@rollup/plugin-yaml';

// https://astro.build/config
export default defineConfig({
  // `site` is REQUIRED for SEO: it is what makes canonical URLs, the sitemap,
  // the RSS feed, and every absolute og:image URL resolve correctly.
  site: 'https://kevinxhan.com',
  trailingSlash: 'ignore',

  integrations: [
    mdx(),
    sitemap({
      // Blog posts marked `draft: true` never reach dist/, so they are
      // already excluded here. This filters the 404 page out too.
      filter: (page) => !page.includes('/404'),
      changefreq: 'weekly',
      lastmod: new Date(),
    }),
  ],

  markdown: {
    shikiConfig: { theme: 'github-light', wrap: true },
  },

  build: {
    // Emit `/blog/post/index.html` so URLs stay clean and extension-less.
    format: 'directory',
  },

  vite: {
    plugins: [yaml()],
  },
});
