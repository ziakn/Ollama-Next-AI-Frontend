import AgentCard from "../components/AgentCard";

const agents = [
  {
    id: 1,
    name: "John Doe",
    description: "Top real estate agent with 10 years of experience.",
    image: "/images/agent1.jpg",
  },
  {
    id: 2,
    name: "Jane Smith",
    description: "Specialist in luxury apartments and villas.",
    image: "/images/agent2.jpg",
  },
  {
    id: 3,
    name: "Mike Johnson",
    description: "Expert in commercial real estate investments.",
    image: "/images/agent3.jpg",
  },
];

export default function AgentsPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-12">Our Agents</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {agents.map((agent) => (
          <AgentCard key={agent.id} agent={agent} />
        ))}
      </div>
    </div>
  );
}
