import LeftSidebar from '@site/src/components/LeftSidebar';
import TopicsWidget from '@site/src/components/TopicsWidget';
import type { Props } from '@theme/BlogLayout';
import Layout from '@theme/Layout';
import styles from './styles.module.css';

export default function BlogLayout({children, toc, sidebar: _sidebar, ...layoutProps}: Props): JSX.Element {
  return (
    <Layout {...layoutProps}>
      <div className={styles.pageLayout}>
        <LeftSidebar showProfile={false} showTopics={false} />
        <main className={styles.mainContent}>
          {children}
        </main>
        <aside className={styles.tocColumn}>
          {toc && (
            <>
              <div className={styles.tocContent}>{toc}</div>
              <TopicsWidget />
              <a
                href="#"
                className={styles.backToTop}
                onClick={(e) => { e.preventDefault(); window.scrollTo({top: 0, behavior: 'smooth'}); }}
              >
                ↑ Back to top
              </a>
            </>
          )}
        </aside>
      </div>
    </Layout>
  );
}
