import React, {cache} from 'react';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { loadBlogPost } from '@/helpers/file-helpers';
import CodeSnippet from '@/components/CodeSnippet';
import BlogHero from '@/components/BlogHero';
import styles from './postSlug.module.css';
import Spinner from '@/components/Spinner';

const DivisionGroupsDemo = dynamic(() => import('@/components/DivisionGroupsDemo'), { loading: Spinner, });
const CircularColorsDemo = dynamic(() => import('@/components/CircularColorsDemo'), { loading: Spinner, });

const getPost = cache(loadBlogPost);

export async function generateMetadata({ params }) {
  let post;

  try {
    post = await getPost(params.postSlug);
  } catch (error) {
    notFound();
  }
  const split = post.frontmatter.abstract.split('.')

  return {
    title: post.frontmatter.title,
    description: split[0],
  };
}

async function BlogPost({params}) {
  const post = await loadBlogPost(params.postSlug);

  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={post.frontmatter.title}
        publishedOn={new Date(post.frontmatter.publishedOn)}
      />
      <div className={styles.page}>
        <MDXRemote source={post.content} components={{pre: CodeSnippet, DivisionGroupsDemo, CircularColorsDemo}} />
      </div>
    </article>
  );
}

export default BlogPost;
