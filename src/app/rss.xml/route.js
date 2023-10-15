import RSS from "rss";
import { getBlogPostList } from '@/helpers/file-helpers';

export async function GET() {
  const posts = await getBlogPostList();
  const host = "http://localhost:3004/"

  const feed = new RSS({
    title: 'Hello',
    description: 'An RSS feed',
    site_url: host,
    feed_url: `${host}rss`,
    copyright: '@JWC',
    language: 'English',
    pubDate: new Date().toDateString(),
  });
  
  posts.map((post) => {
    feed.item({
      title: post.title,
      guid: `${host}${post.slug}`,
      url: `${host}${post.uri}`,
      date: post.publishedOn,
      description: post.abstract,
      author: 'JWC',
      categories: ['this', 'that']
    });
  });

  return new Response(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8',
    },
  });
}