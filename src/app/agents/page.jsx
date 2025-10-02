'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Card from '@/components/AgentCard';

const agents = [
  {
    id: 1,
    name: "Talkhis Al Maqalat",
    slug: "article-summarizer",
    description:
      "AI-powered agent that condenses long news articles into concise summaries.",
    icon: "bi-chat-left-text",
    type: "Language AI",
    badgeIcon: "bi-translate",
  },
  {
    id: 2,
    name: "Munshe' Al Muhtawa Al Daa'im",
    slug: "news-generator",
    description:
      "Generates evergreen news-style articles from given topics or bullet points.",
    icon: "bi-robot",
    type: "Content AI",
    badgeIcon: "bi-lightning-charge-fill",
  },
  {
    id: 3,
    name: "Tadqiq",
    slug: "tadqiq",
    description:
      "AI-powered grammar and spell checker for precise and polished writing.",
    icon: "bi-spellcheck",
    type: "Writing AI",
    badgeIcon: "bi-pencil-square",
  },
  {
    id: 4,
    name: "Kashif",
    slug: "kashif",
    description:
      "AI agent specialized in extracting named entities such as persons, organizations, locations, and dates from any text.",
    icon: "bi-person-bounding-box",
    type: "NER AI",
    badgeIcon: "bi-card-list",
  },
  {
    id: 5,
    name: "Ameer - Tahlil Al Mashaa'ir",
    slug: "ameer",
    description:
      "AI agent specialized in sentiment analysis to understand emotions and tone in text.",
    icon: "bi-emoji-smile",
    type: "Emotion AI",
    badgeIcon: "bi-heart-fill",
  },
  {
    id: 6,
    name: "Tag Manager",
    slug: "tags",
    description:
      "AI-powered agent that intelligently assigns and manages tags for content to enhance categorization and searchability.",
    icon: "bi-tags", // More appropriate for a tagging system
    type: "Content Categorization",
    badgeIcon: "bi-bookmark-check", // Reflects tag verification or relevance
  },
  {
    id: 7,
    name: "Educational Research Tagger",
    slug: "educational-research-tags",
    description:
      "An AI-driven system designed to intelligently assign and manage semantic tags for academic and educational research content, improving categorization, retrieval, and cross-disciplinary discoverability.",
    icon: "bi-journal-richtext", // Symbolic of academic content
    type: "Research Content Categorization",
    badgeIcon: "bi-award", // Suggests academic rigor and verified tagging
  },
  {
    id: 8,
    name: "SBP Financial Insight Assistant",
    slug: "genai-statebank-rag-assistant",
    description:
      "A multilingual GenAI solution tailored for financial institutions. It leverages Retrieval-Augmented Generation (RAG) to provide regulatory, policy, and financial insights in local languages (Urdu, Pashto, Sindhi, Punjabi, Balochi). Users can query with natural prompts and receive summarized, semantically enriched answers and supporting documents.",
    icon: "bi-bank", // Symbolic of financial institutions
    type: "Regulatory & Financial Knowledge Retrieval",
    badgeIcon: "bi-globe", // Reflects multilingual and nationwide accessibility
  }
  
  
];

export default function AgentsPage() {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/'); // redirect to login
    }
  }, [router]);
  return (
    <div className="container py-5">
      <h1 className="text-center mb-5">AlSharq Tech AI Agents</h1>
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
