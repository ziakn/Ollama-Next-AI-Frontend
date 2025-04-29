import Link from 'next/link';

export default function AgentDetailPage({ params }) {
  const { slug } = params;

  const agents = [
    {
      id: 1,
      name: 'Zayna',
      slug: 'zayna',
      description: 'Natural language expert specializing in Arabic comprehension and sentiment analysis.',
      icon: 'bi-chat-left-text',
      type: 'Language AI',
      badgeIcon: 'bi-translate',
    },
    {
      id: 2,
      name: 'Rafiq',
      slug: 'rafiq',
      description: 'Your intelligent virtual assistant for smart Q&A and task automation.',
      icon: 'bi-robot',
      type: 'Assistant AI',
      badgeIcon: 'bi-lightning-charge-fill',
    },
    {
      id: 3,
      name: 'Sahm',
      slug: 'sahm',
      description: 'AI strategist for market insights, analytics, and decision-making.',
      icon: 'bi-graph-up-arrow',
      type: 'Insight AI',
      badgeIcon: 'bi-bar-chart-line-fill',
    },
    {
      id: 4,
      name: 'Nour',
      slug: 'nour',
      description: 'Creative powerhouse generating text, visuals, and brand stories.',
      icon: 'bi-palette2',
      type: 'Creative AI',
      badgeIcon: 'bi-stars',
    },
    {
      id: 5,
      name: 'Ameer',
      slug: 'ameer',
      description: 'Enterprise-grade AI for cybersecurity and infrastructure defense.',
      icon: 'bi-shield-shaded',
      type: 'Security AI',
      badgeIcon: 'bi-lock-fill',
    },
  ];

  const agent = agents.find((a) => a.slug === slug);

  if (!agent) {
    notFound();
  }

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <div
          className="text-white rounded-circle d-flex justify-content-center align-items-center mx-auto mb-3"
          style={{
            width: 100,
            height: 100,
            background: 'linear-gradient(135deg, #007BFF, #6610f2)',
            boxShadow: '0 4px 12px rgba(0, 123, 255, 0.3)',
          }}
        >
          <i className={`bi ${agent.icon} fs-1`}></i>
        </div>
        <h1>{agent.name}</h1>
        <span className="badge bg-dark fs-6 my-2">
          <i className={`bi ${agent.badgeIcon} me-1`}></i> {agent.type}
        </span>
      </div>

      <div className="row justify-content-center mb-4">
        <div className="col-md-8">
          <p className="lead">{agent.description}</p>
        </div>
      </div>

      {/* ➡️ Back Button */}
      <div className="text-center">
        <Link href="/agents" className="btn btn-primary">
          ← Back to Agents
        </Link>
      </div>
    </div>
  );
}
