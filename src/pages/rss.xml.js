import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import siteData from '../../content/site.yaml';

export async function GET(context) {
  const posts = (await getCollection('blog', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  );

  return rss({
    title: `${siteData.name} — Writing`,
    description: siteData.description,
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/blog/${post.id}`,
      categories: post.data.tags,
      author: siteData.name,
    })),
    customData: '<language>en-us</language>',
  });
}
