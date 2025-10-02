'use client';
import ChatBotsDetail from '@/components/ChatBotsDetail';
import PersonalSpeechAssistant from '@/components/PersonalSpeechAssistant';
import PersonalTravelAssistant from '@/components/PersonalSpeechAssistant';
import { useParams } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';

const chatbots = [
  {
    id: 1,
    name: 'Customer Support Assistant',
    slug: 'customer-support-bot',
    description: 'Provides real-time answers to common user queries with high accuracy.',
    icon: 'bi-headset',
    type: 'Customer AI',
    badgeIcon: 'bi-chat-dots-fill',
  },
  {
    id: 2,
    name: 'Personal Speech Assistant',
    slug: 'personal-speech-assistant',
    description: 'Helps users effortlessly plan and book their travel.',
    icon: 'bi-geo-alt',
    type: 'Assistant AI',
    badgeIcon: 'bi-globe2',
  },
  {
    id: 3,
    name: 'AI Legal Advisor',
    slug: 'ai-legal-advisor',
    description: 'Offers legal assistance, including financial tips, budgeting, and expense tracking.',
    icon: 'bi-cash-stack',
    type: 'Finance AI',
    badgeIcon: 'bi-bank',
  },
  {
    id: 4,
    name: 'Medical Symptom Checker',
    slug: 'medical-symptom-checker',
    description: 'Helps users identify symptoms and provides possible diagnoses.',
    icon: 'bi-journal-bookmark-fill',
    type: 'Health AI',
    badgeIcon: 'bi-mortarboard-fill',
  },
  {
    id: 5,
    name: 'Ecommerce Product Recommender',
    slug: 'ecommerce-product-recommender',
    description: 'Suggests products based on user preferences and browsing history.',
    icon: 'bi-heart-pulse-fill',
    type: 'Ecommerce AI',
    badgeIcon: 'bi-activity',
  },
];


export default function ChatbotDetailPage() {
  const { slug } = useParams();
  const bot = chatbots.find((chatbot) => chatbot.slug === slug);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatRef = useRef(null);

  if (!bot) return <div className="container py-5">Chatbot not found.</div>;

  const handleSend = async (input) => {
    if (!input) return;

    const userMessage = { role: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    console.log(userMessage, slug);

    try {
      const res = await fetch(`/api/chatbots/${slug}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input }),
      });
      const data = await res.json();
      console.log(data)
      const botMessage = { role: 'bot', text: data.output.data };
      setMessages((prev) => [...prev, botMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'bot', text: '❌ Sorry, something went wrong.' },
      ]);
    }
    setLoading(false);
  };

  useEffect(() => {
    chatRef.current?.scrollTo(0, chatRef.current.scrollHeight);
  }, [messages, loading]);


  const renderCustomBot = (slug) =>{
    switch(slug)
    {
      case 'personal-speech-assistant':
        return <PersonalSpeechAssistant bot={bot} chatRef={chatRef} messages={messages} loading={loading} handleSend={handleSend}/>;
      default:
        return <ChatBotsDetail bot={bot} chatRef={chatRef} messages={messages} loading={loading}  handleSend={handleSend}/>;
    }
   

  }


  return (
    <div className="container py-5">
       {renderCustomBot(slug)}
    </div>
  );
}
