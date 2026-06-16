import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import {usePluginData} from '@docusaurus/useGlobalData';

import styles from './index.module.css';

type BlogPostTag = {label: string; permalink: string};

type BlogPostMetadata = {
  permalink: string;
  title: string;
  description: string;
  date: string;
  readingTime: number;
  tags: BlogPostTag[];
};

type BlogPost = {
  id: string;
  metadata: BlogPostMetadata;
};

type BlogPluginData = {
  blogPosts: BlogPost[];
};

function RecentPosts() {
  const {blogPosts} = usePluginData('docusaurus-plugin-content-blog') as BlogPluginData;
  const recent = blogPosts.slice(0, 5);

  return (
    <section className={styles.recentPosts}>
      <div className="container">
        <Heading as="h2" className={styles.recentPostsTitle}>Recent Posts</Heading>
        <div className={styles.postList}>
          {recent.map((post) => (
            <article key={post.id} className={styles.postCard}>
              <Heading as="h3">
                <Link to={post.metadata.permalink}>{post.metadata.title}</Link>
              </Heading>
              <p className={styles.postMeta}>
                {new Date(post.metadata.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
                {post.metadata.readingTime > 0 && (
                  <> · {Math.ceil(post.metadata.readingTime)} min read</>
                )}
              </p>
              {post.metadata.description && (
                <p className={styles.postDescription}>{post.metadata.description}</p>
              )}
              <Link to={post.metadata.permalink}>Read more →</Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <RecentPosts />
      </main>
    </Layout>
  );
}
