import { PageMetadata } from '@docusaurus/theme-common';
import LeftSidebar from '@site/src/components/LeftSidebar';
import Layout from '@theme/Layout';
import { useMemo, useState } from 'react';
import styles from './projects.module.css';

interface Project {
  name: string;
  duration: string;
  tech: string[];
  bullets: string[];
  organization?: string;
  year?: number;
}

const projects: Project[] = [
  {
    name: 'BenngiHealth',
    organization: 'Benafica',
    duration: '1.5 Years',
    year: 2021,
    tech: ['.NET', 'C#', 'Microsoft SQL', 'Xamarin Forms', 'EF Core', 'Dapper', 'xUnit'],
    bullets: [
      'Collaborated with the CEO and designer to gather requirements, define priorities, and translate business goals into technical specifications.',
      'Designed and implemented RESTful APIs in .NET using EF Core for the internal Microsoft SQL database and Dapper for third-party client web service integrations.',
      'Built and published a cross-platform mobile application for Android and iOS using Xamarin Forms, managing end-to-end deployment through the Google Play Store and Apple App Store.'
    ],
  },
  {
    name: 'IdentityServer Integration',
    organization: 'Benafica',
    duration: '3 Months',
    year: 2022,
    tech: ['.NET', 'C#', 'IdentityServer4', 'JWT'],
    bullets: [
      'Integrated IdentityServer4 into an existing legacy system to modernize authentication, enabling OAuth 2.0 and OpenID Connect flows across internal and client-facing services.',
      'Secured a newly developed API with JWT bearer token authorization, replacing session-based authentication to improve scalability and reduce coupling between services.',
      'Defined client configurations, scopes, and claims to ensure consistent identity and access management across both legacy and modern application surfaces.',
    ],
  },
  {
    name: 'Homeschooling Application',
    organization: 'Personal Project',
    duration: '6 Months',
    year: 2022,
    tech: ['Angular', 'Azure Functions', 'Azure Data Tables', 'GitHub Actions', 'Azure Static Web App', 'Azure Storage'],
    bullets: [
      'Built Angular SPA to share resources among homeschooling families.',
      'Developed event scheduling and communication features.',
      'Utilized Azure Data Tables for storage and GitHub Actions for CI/CD.',
    ],
  },
  {
    name: 'Migration from Bing Maps to Azure Maps',
    organization: 'CH Robinson',
    duration: '6 Months',
    year: 2022,
    tech: ['.NET', 'C#', 'Node.js', 'ElasticSearch', 'React', 'Terraform', 'Azure Maps'],
    bullets: [
      'Collaborated with the team to migrate mapping services from Bing Maps to Azure Maps, enhancing performance and user experience.',
      'Contributed to implementing SAS (Shared Access Signature) authentication for Azure Maps, significantly improving load times.',
      'Worked with ElasticSearch to support geospatial queries for map data.',
      'Built several React components for visualizing shipments and orders on interactive maps.',
      'Supported infrastructure provisioning using Terraform for Azure Maps authentication.',
    ],
  },
  {
    name: 'User Permissions and Notification Setup via CSV',
    organization: 'CH Robinson',
    duration: '2 Months',
    year: 2023,
    tech: ['.NET', 'C#'],
    bullets: [
      'Independently designed and developed a console application to automate user onboarding via CSV input, including permission assignment and notification configuration.',
      'Integrated environment-specific settings, ensuring consistent behavior across environments.',
      'Leveraged libraries to provide progress feedback and improve the CLI user experience.',
      'Ensured robust error handling and data validation for smooth batch processing.',
    ],
  },
  {
    name: 'Orders Search Uplift',
    organization: 'CH Robinson',
    duration: '12 Months',
    year: 2023,
    tech: ['.NET', 'C#', 'Node.js', 'ElasticSearch', 'React', 'Kafka'],
    bullets: [
      'Contributed to a long-term initiative to modernize the Orders Search experience, focusing on front-end and back-end improvements.',
      'Developed several React components to enhance the search page UI and user interactions.',
      'Participated in integrating map-based views of order data, improving logistics visibility.',
      'Helped implement new filter capabilities on the backend.',
      'Developed a guided tour feature on the order details page to onboard users to new features.',
    ],
  },
  {
    name: 'Custom Filters and Identifiers',
    organization: 'CH Robinson',
    duration: '12 Months',
    year: 2024,
    tech: ['.NET', 'C#', 'Node.js', 'ElasticSearch', 'React', 'Kafka', 'MongoDB'],
    bullets: [
      'Contributed to React components enabling administrators to create and manage custom filters in the portal UI.',
      'Developed backend functionality to store and manage custom filters in MongoDB.',
      'Contributed to ElasticSearch aggregations/queries to retrieve related orders and shipments based on custom filters.',
      'Migrated legacy gateway API from .NET Framework 4.6.2 to .NET 8.0, helping modernize the tech stack.',
    ],
  },
  {
    name: 'Natural Language to SQL',
    organization: 'University of Minnesota',
    duration: '6 Months',
    year: 2026,
    tech: ['Python', 'React', 'Azure AI Foundry', 'Azure Application Insights', 'Azure DevOps', 'Azure App Service', 'Azure Static Web App'],
    bullets: [
      'Designed and implemented multi-agent workflows to improve consistency and reliability of AI-generated results.',
      'Helped define the overall workflow architecture and implemented structured outputs throughout the solution.',
      'Implemented monitoring and observability using Azure Application Insights and Azure AI Foundry.',
      'Added CI/CD pipelines to deploy UI/API to Azure.',
      'Built a custom LLM-as-a-judge evaluation framework to assess generated SQL correctness.',
    ],
  },
  {
    name: 'Location-Based Access Restrictions',
    organization: 'CH Robinson',
    duration: '3 Months',
    year: 2025,
    tech: ['.NET', 'C#', 'Node.js', 'ElasticSearch', 'React', 'Kafka'],
    bullets: [
      'Collaborated with the backend team to design and implement data models that determine user permissions for viewing shipments and orders.',
      'Adjusted ElasticSearch queries to support location-based filtering logic.',
      'Contributed to integration testing and validation of location restriction rules.',
    ],
  },
  {
    name: 'Library Management SaaS',
    organization: 'Personal Project',
    duration: '',
    year: 2026,
    tech: ['.NET 10', 'ASP.NET Core', 'Razor Pages', 'PostgreSQL', 'EF Core', 'pgvector', 'Azure OpenAI', 'Azure AI Foundry', 'Hangfire', 'Azure Storage'],
    bullets: [
      'Modular monolith in ASP.NET Core (.NET 10) with isolated EF Core DbContexts per module and PostgreSQL as the data store.',
      'AI-powered semantic book search using Azure OpenAI embeddings (pgvector) and automated age classification via Azure AI Foundry (GPT-4o-mini).',
      'Self-service kiosk module with a custom JWT device-auth middleware pipeline, separate from the admin UI.',
      'Hangfire background job worker (separate deployable) handling embedding generation, AI classification, and email delivery via Mailgun.',
      'Azure Blob Storage for book assets, EAN-13 barcode generation, subscription-based feature gating.',
    ],
  },
];

export default function Projects(): JSX.Element {
  const [selectedTech, setSelectedTech] = useState<string[]>([]);

  const allTech = useMemo(() => {
    const seen = new Set<string>();
    projects.forEach(p => p.tech.forEach(t => seen.add(t)));
    return Array.from(seen).sort();
  }, []);

  const filtered = (selectedTech.length === 0
    ? projects
    : projects.filter(p => selectedTech.some(t => p.tech.includes(t)))
  ).slice().sort((a, b) => (b.year ?? 0) - (a.year ?? 0));

  const groupedByYear = filtered.reduce<[number, Project[]][]>((acc, p) => {
    const y = p.year ?? 0;
    const last = acc[acc.length - 1];
    if (last && last[0] === y) last[1].push(p);
    else acc.push([y, [p]]);
    return acc;
  }, []);

  const toggleTech = (tech: string) => {
    setSelectedTech(prev =>
      prev.includes(tech) ? prev.filter(t => t !== tech) : [...prev, tech]
    );
  };

  return (
    <>
      <PageMetadata title="Projects" description="A selection of projects by Aliaksei Aksionau — .NET, Azure, React, and more." />
      <Layout>
        <div className={styles.pageLayout}>
          <LeftSidebar showTopics={false} />
          <main className={styles.mainContent}>
            <div className={styles.projectsContainer}>
              <h1 className={styles.pageTitle}>Projects</h1>
              <p className={styles.pageSubtitle}>A selection of projects I've worked on.</p>

              <div className={styles.filterBar}>
                {allTech.map(tech => (
                  <button
                    key={tech}
                    onClick={() => toggleTech(tech)}
                    className={`${styles.filterChip} ${selectedTech.includes(tech) ? styles.filterChipActive : ''}`}
                  >
                    {tech}
                  </button>
                ))}
                {selectedTech.length > 0 && (
                  <button className={styles.clearFilter} onClick={() => setSelectedTech([])}>
                    × Clear
                  </button>
                )}
              </div>

              {selectedTech.length > 0 && (
                <p className={styles.filterCount}>
                  {filtered.length} of {projects.length} projects
                </p>
              )}

              {filtered.length === 0 ? (
                <p className={styles.emptyState}>No projects match the selected filters.</p>
              ) : (
                <div className={styles.timeline}>
                  {groupedByYear.map(([year, yearProjects], idx, arr) => (
                    <div key={year} className={styles.timelineSection}>
                      <span className={styles.yearLabel}>{year}</span>
                      <div className={styles.dotAndLine}>
                        <div className={styles.yearDot} />
                        {idx < arr.length - 1 && <div className={styles.yearLine} />}
                      </div>
                      <div className={styles.yearCards}>
                        {yearProjects.map((project) => (
                          <div key={project.name} className={styles.projectCard}>
                            <div className={styles.cardHeader}>
                              <div>
                                <h2 className={styles.projectName}>{project.name}</h2>
                                {project.organization && (
                                  <span className={styles.organization}>{project.organization}</span>
                                )}
                              </div>
                              <span className={styles.duration}>{project.duration}</span>
                            </div>
                            <div className={styles.techList}>
                              {project.tech.map((t) => (
                                <span
                                  key={t}
                                  className={`${styles.techTag} ${selectedTech.includes(t) ? styles.techTagActive : ''}`}
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                            <ul className={styles.bullets}>
                              {project.bullets.map((b) => (
                                <li key={b}>{b}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </main>
        </div>
      </Layout>
    </>
  );
}
