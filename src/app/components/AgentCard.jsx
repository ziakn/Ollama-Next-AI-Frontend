export default function AgentCard({ agent }) {
    return (
      <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <img
          className="h-48 w-full object-cover"
          src={agent.image}
          alt={agent.name}
        />
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2">{agent.name}</h2>
          <p className="text-gray-600 mb-4">{agent.description}</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            View Profile
          </button>
        </div>
      </div>
    );
  }
  