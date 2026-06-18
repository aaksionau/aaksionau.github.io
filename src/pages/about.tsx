import Link from '@docusaurus/Link';
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
                <h2>What I work with</h2>
                <div className={styles.skillsGrid}>
                  <div className={styles.skillGroup}>
                    <h3>Languages & Frameworks</h3>
                    <ul>
                      <li>C# / .NET</li>
                      <li>ASP.NET Core</li>
                      <li>TypeScript / React</li>
                    </ul>
                  </div>
                  <div className={styles.skillGroup}>
                    <h3>Cloud & Infrastructure</h3>
                    <ul>
                      <li>Microsoft Azure</li>
                      <li>Kubernetes</li>
                      <li>Docker</li>
                    </ul>
                  </div>
                  <div className={styles.skillGroup}>
                    <h3>AI & Agents</h3>
                    <ul>
                      <li>Azure AI Foundry</li>
                      <li>Microsoft Semantic Kernel</li>
                      <li>LLM integration & evaluation</li>
                    </ul>
                  </div>
                </div>
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
