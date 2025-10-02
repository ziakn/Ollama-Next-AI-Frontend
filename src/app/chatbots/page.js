'use client';
import ChatbotCard from '@/components/ChatbotCard';
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



export default function ChatbotsPage() {
  return (
    <div className="container py-5">
      <h2 className="mb-4 fw-bold text-center">AI Chatbots</h2>
      <div className="row">
        {chatbots.map((bot) => (
          <ChatbotCard key={bot.id} {...bot} />
        ))}
      </div>
    </div>
  );
}
