import React from 'react';
import Link from '@docusaurus/Link';
import { TOPICS } from '@site/src/components/LeftSidebar';
import styles from './styles.module.css';

export default function TopicsWidget(): JSX.Element {
  return (
    <div className={styles.topicsWidget}>
      <span className={styles.topicsLabel}>Topics</span>
      <div className={styles.topicPills}>
        {TOPICS.map(({label, to}) => (
          <Link key={to} to={to} className={styles.topicLink}>
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}
