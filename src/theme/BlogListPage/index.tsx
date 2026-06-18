import Link from '@docusaurus/Link';
import {
  HtmlClassNameProvider,
  PageMetadata,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import LeftSidebar from '@site/src/components/LeftSidebar';
import TopicsWidget from '@site/src/components/TopicsWidget';
import type { Props } from '@theme/BlogListPage';
import BlogListPaginator from '@theme/BlogListPaginator';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import styles from './styles.module.css';

function PostCard({content}: {content: Props['items'][number]['content']}) {
  const {metadata} = content;
  const readingTime = metadata.readingTime
    ? `${Math.ceil(metadata.readingTime)} min read`
    : null;
  const formattedDate = metadata.formattedDate ||
    new Date(metadata.date).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'});

  return (
    <article className={styles.postCard}>
      <Link to={metadata.permalink} className={styles.postTitle}>
        {metadata.title}
      </Link>
      <div className={styles.postMeta}>
        <time dateTime={metadata.date}>{formattedDate}</time>
        {readingTime && <span className={styles.dot}>·</span>}
        {readingTime && <span>{readingTime}</span>}
      </div>
      {metadata.description && (
        <p className={styles.postExcerpt}>{metadata.description}</p>
      )}
      {metadata.tags.length > 0 && (
        <div className={styles.tagRow}>
          {metadata.tags.map((tag) => (
            <Link key={tag.permalink} to={tag.permalink} className={styles.tag}>
              {tag.label}
            </Link>
          ))}
        </div>
      )}
    </article>
  );
}

export default function BlogListPage({metadata, items}: Props): JSX.Element {
  const {blogDescription, blogTitle} = metadata;
  return (
    <HtmlClassNameProvider
      className={clsx(
        ThemeClassNames.wrapper.blogPages,
        ThemeClassNames.page.blogListPage,
      )}>
      <PageMetadata title={blogTitle} description={blogDescription} />
      <Layout>
        <div className={styles.pageLayout}>
          <LeftSidebar showTopics={false} />
          <main className={styles.mainContent}>
            <div className={styles.postList}>
              {items.map(({content}) => (
                <PostCard key={content.metadata.permalink} content={content} />
              ))}
            </div>
            <BlogListPaginator metadata={metadata} />
          </main>
          <aside className={styles.rightSidebar}>
            <TopicsWidget />
          </aside>
        </div>
      </Layout>
    </HtmlClassNameProvider>
  );
}
