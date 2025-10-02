"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import CardResponse from "@/components/CardResponse";
import { useRouter } from 'next/navigation';


export default function AgentDetailPage({ params }) {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/'); // redirect to login
    }
  }, [router]);
  
  const { slug } = use(params);


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
    }
    ,
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

  const agent = agents.find((a) => a.slug === slug);

  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRunAgent = async () => {
    setLoading(true);
    setResponse("");

    try {
      const res = await fetch(`/api/agents/${slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input }),
      });

      const data = await res.json();
      setResponse(data.output);
    } catch (err) {
      setResponse("Error processing the prompt.");
    } finally {
      setLoading(false);
    }
  };

  if (!agent) return notFound();

  return (
    <div className="container py-5">
      {/* Agent Info */}
      <div className="text-center mb-5">
        <div
          className="text-white rounded-circle d-flex justify-content-center align-items-center mx-auto mb-3"
          style={{
            width: 100,
            height: 100,
            background: "linear-gradient(135deg, #ff00e4, #f22f10)",
            boxShadow: "0 4px 12px rgb(255 0 0)",
          }}
        >
          <i className={`bi ${agent.icon} fs-1`}></i>
        </div>
        <h1>{agent.name}</h1>
        <span className="badge bg-dark fs-6 my-2">
          <i className={`bi ${agent.badgeIcon} me-1`}></i> {agent.type}
        </span>
      </div>

      {/* Description */}
      <div className="row justify-content-center mb-4">
        <div className="col-md-8">
          <p className="lead text-center">{agent.description}</p>
        </div>
      </div>

      {/* Prompt Input Section */}
      <div className="row justify-content-center mb-5">
        <div className="col-md-8">
          <textarea
            className="form-control mb-3"
            rows="4"
            placeholder="Enter your prompt..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <div className="d-grid">
            <button
              className="btn btn-gradient btn-lg"
              onClick={handleRunAgent}
              disabled={loading}
              style={{
                background: "linear-gradient(135deg, #3a0ca3, #7209b7)",
                color: "white",
                border: "none",
              }}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                  />
                  Running...
                </>
              ) : (
                "Run Agent"
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Response Output */}
      {response && <CardResponse response={response} />}

      {/* Back Button */}
      <div className="text-center mt-5">
        <Link href="/agents" className="btn btn-outline-secondary">
          ← Back to Agents
        </Link>
      </div>
    </div>
  );
}
