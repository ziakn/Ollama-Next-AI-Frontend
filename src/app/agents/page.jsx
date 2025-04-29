import Card from './../components/AgentCard'; // ✅ Import the Card component

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

export default function AgentsPage() {
  return (
    <div className="container py-5">
      <h1 className="text-center mb-5">Meet AlSharq Tech AI Agents</h1>
      <div className="row g-4">
        {agents.map((agent) => (
          <Card
            key={agent.id}
            icon={agent.icon}
            name={agent.name}
            type={agent.type}
            badgeIcon={agent.badgeIcon}
            description={agent.description}
            slug={agent.slug}
          />
        ))}
      </div>
    </div>
  );
}
