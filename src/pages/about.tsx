import { PageMetadata } from '@docusaurus/theme-common';
import LeftSidebar from '@site/src/components/LeftSidebar';
import Layout from '@theme/Layout';
import styles from './about.module.css';

export default function About(): JSX.Element {
  return (
    <>
      <PageMetadata title="About" description="About Aliaksei Aksionau — Software Engineer working with .NET, Azure, Kubernetes, and AI." />
      <Layout>
        <div className={styles.pageLayout}>
          <LeftSidebar showTopics={false} />
          <main className={styles.mainContent}>
            <div className={styles.aboutContainer}>
              <div className={styles.header}>
                <img
                  src="/img/aaksionau_profile.jpg"
                  alt="Aliaksei Aksionau"
                  className={styles.avatar}
                />
                <div>
                  <h1 className={styles.name}>Aliaksei Aksionau</h1>
                  <p className={styles.title}>Software Engineer · .NET, Azure, AI</p>
                  <div className={styles.socialLinks}>
                    <a href="https://github.com/aaksionau" target="_blank" rel="noopener noreferrer">GitHub</a>
                    <span className={styles.dot}>·</span>
                    <a href="https://www.linkedin.com/in/aliaksei-aksionau/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                  </div>
                </div>
              </div>

              <section className={styles.section}>
                <h2>About me</h2>
                <p>
                  I'm a software engineer focused on building reliable backend systems and cloud-native solutions.
                  I work primarily with .NET and Azure, and I'm interested in the practical side of AI — how it
                  can be integrated into real products rather than staying in demos.
                </p>
                <p>
                  This blog is where I share things I've learned in the process: patterns that worked,
                  mistakes I made, tools worth knowing about.
                </p>
              </section>
              <section className={styles.section}>
                <h2>Get in touch</h2>
                <p>
                  Feel free to reach out on{' '}
                  <a href="https://www.linkedin.com/in/aliaksei-aksionau/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                  {' '}or open an issue / discussion on{' '}
                  <a href="https://github.com/aaksionau" target="_blank" rel="noopener noreferrer">GitHub</a>.
                </p>
              </section>
            </div>
          </main>
        </div>
      </Layout>
    </>
  );
}
