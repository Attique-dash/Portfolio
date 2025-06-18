// Modern Chatbot with API integration and auto-scroll
'use client';

import { useEffect, useRef, useState } from 'react';
import { FaComments, FaTimes } from 'react-icons/fa';
import axios from 'axios'; // Use fetch if preferred

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

// Predefined responses for portfolio-related questions
const portfolioResponses = {
  about: [
    "Muhammad Attique is a skilled full-stack developer specializing in:\n\n• Web Development\n• Kill Bugs\n• Software Architecture\n\nCurrently focused on creating innovative solutions using modern technologies.",
    "As a professional developer, Muhammad Attique brings:\n\n• Strong technical expertise\n• Creative problem-solving\n• Modern development practices\n\nPassionate about creating efficient and scalable solutions.",
    "Muhammad Attique's professional profile:\n\n• Full-stack Developer\n• AI Enthusiast\n• Solution Architect\n\nDedicated to delivering high-quality software solutions."
  ],
  projects: [
    "Here are my key projects:\n\n1. AutoPost AI\n   • IoT-based solution\n   • Real-time monitoring\n   • Automated control\n\n2. IQPLAY Game\n   • Game Development\n   • User Interface\n   • Gameplay MCQ\n\n3. B-Site Blog\n   • Blog Development\n   • User Interface\n   • Blog Posting\n   • Blog Commenting",
    "Notable Developments:\n\n1. UniSys ERP\n   • ERP Development\n   • User Interface\n   • Role Based Access\n\n2. Store Management System\n   • Product Management\n   • Shopping Cart\n   • Add/Update/Delete Products\n\n3. Fachem Salt\n   • Modern design\n   • Responsive layout\n   • Product Purchase",
    "Recent Projects:\n\n1. E-Commerce Platform\n   • Full-stack development\n   • Payment integration\n   • User authentication\n\n2. Task Management App\n   • Real-time updates\n   • Team collaboration\n   • Progress tracking\n\n3. Portfolio Website\n   • Modern design\n   • Responsive layout\n   • Interactive features"
  ],
  skills: [
    "Technical Skills Overview:\n\n• Frontend: React.js, Next.js, TypeScript\n• Backend: Node.js, Python, Express\n• Database: MongoDB, Firebase\n• AI: AI Implementation",
    "Core Competencies:\n\n• Web Application Development\n• Database Architecture\n• API Development\n• UI/UX Implementation",
    "Expertise Areas:\n\n• Full-stack Development\n• Cloud Solutions\n• Mobile Development\n• DevOps Practices\n• System Architecture"
  ],
  services: [
    "Professional Services:\n\n1. Full-stack Development\n   • Custom web applications\n   • Mobile-first design\n   • API integration\n\n2. Web Design\n   • Modern Design\n   • Responsive Layout\n   • User Interface\n\n3. API Development\n   • API Integration\n   • API Documentation\n   • API Testing",
    "Service Offerings:\n\n1. Web Development\n   • Frontend development\n   • Backend architecture\n   • Database design\n\n2. Problem Solving\n   • Algorithm Development\n   • Data Structure\n   • Problem Solving\n\n3. Responsive Design\n   • User Interface\n   • Responsive Layout\n   • Mobile-first design",
    "What I Offer:\n\n1. Custom Software Development\n   • Tailored solutions\n   • Scalable architecture\n   • Performance optimization\n\n2. Technical Consulting\n   • Architecture design\n   • Technology selection\n   • Best practices\n\n3. Maintenance & Support\n   • Regular updates\n   • Bug fixes\n   • Performance monitoring"
  ],
  contact: [
    "Contact Information:\n\n• Email: attiqueshafeeq246@gmail.com\n• Phone: +92-3244771036\n• Location: Lahore, Pakistan\n\nFeel free to reach out for professional inquiries.",
    "Get in Touch:\n\n• Professional Email: attiqueshafeeq246@gmail.com\n• Personal Number: +92-3244771036\n• LinkedIn: Available on request\n\nAvailable for project discussions and collaborations.",
    "Contact Details:\n\n• Primary Email: attiqueshafeeq246@gmail.com\n• Contact Number: +92-3244771036\n• Based in: Lahore, Pakistan\n\nOpen to discussing new opportunities and projects."
  ],
  education: [
    "Educational Background:\n\n• Masters in Computer Science\n  - Superior University Lahore\n  - Experience: 4+ Years\n  - Focus: Web Development & AI\n\n• BS Computer Science\n  - Superior University\n  - Graduated: June 2021\n  - Experience: 2021-2025\n  - Specialized in Web Development",
    "Academic Journey:\n\n• Masters in Computer Science\n  - Superior University Lahore\n  - Research in AI/ML\n  - Advanced Programming\n\n• BS Computer Science\n  - Superior University\n  - Software Engineering\n  - Data Structures\n  - Algorithms",
    "Education & Training:\n\n• Masters in Computer Science\n  - Superior University Lahore\n  - Specialization in AI\n  - Advanced Web Technologies\n\n• BS Computer Science\n  - Superior University\n  - Core Computer Science\n  - Software Development\n  - Database Systems"
  ]
};

// Keywords for matching questions to predefined responses
const keywords = {
  about: ['about', 'who', 'information', 'background', 'profile', 'introduction', 'bio', 'tell me about', 'know more'],
  projects: ['project', 'work', 'portfolio', 'developed', 'created', 'built', 'made', 'showcase'],
  skills: ['skill', 'expertise', 'technology', 'tech', 'programming', 'language', 'framework', 'capabilities'],
  services: ['service', 'offer', 'provide', 'help', 'assistance', 'solutions', 'what you do', 'what you offer'],
  contact: ['contact', 'email', 'phone', 'number', 'reach', 'connect', 'message', 'get in touch'],
  education: ['education', 'study', 'degree', 'university', 'college', 'qualification', 'academic']
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{
    role: 'assistant',
    content: "Hi there 👋 I'm Attique's AI assistant! Ask me about skills, projects, or anything else."
  }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const lastResponsesRef = useRef<Record<string, number>>({});

  // Auto-scroll on new messages or loading
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  // Helper function to remove markdown characters
  const removeMarkdown = (text: string): string => {
    // Remove headers (###, ##, #)
    text = text.replace(/^#+\s/gm, '');
    // Remove bold/italic (**text**, *text*)
    text = text.replace(/\*\*(.*?)\*\*|__(.*?)__|\*(.*?)\*|_(.*?)_/g, '$1$2$3$4');
    // Remove code blocks (```language ... ```) and inline code (`code`)
    text = text.replace(/```[\s\S]*?```|`([^`]+)`/g, '$1');
    // Remove horizontal rules (---, ***, ___)
    text = text.replace(/^(-{3,}|_{3,}|\*{3,})$/gm, '');
    // Remove list markers (-, *, +) only at the beginning of a line, preserving content
    text = text.replace(/^(\s*)[-*+]\s/gm, '$1');
    // Remove blockquotes (>)
    text = text.replace(/^>\s?/gm, '');
    // Replace multiple newlines with single newlines to avoid excessive spacing
    text = text.replace(/(\n){2,}/g, '\n');
    return text.trim();
  };

  const getPredefinedResponse = (query: string): string | null => {
    const lowerQuery = query.toLowerCase();

    // Check each category
    for (const [category, words] of Object.entries(keywords)) {
      if (words.some(word => lowerQuery.includes(word))) {
        const responses = portfolioResponses[category as keyof typeof portfolioResponses];
        const lastIndex = lastResponsesRef.current[category] || -1;

        let nextIndex = lastIndex;
        // Keep generating a random index until it's different from the last one
        // and there's more than one response available.
        if (responses.length > 1) {
          while (nextIndex === lastIndex) {
            nextIndex = Math.floor(Math.random() * responses.length);
          }
        } else {
          // If there's only one response, just use it.
          nextIndex = 0;
        }

        // Update last shown index
        lastResponsesRef.current[category] = nextIndex;
        return responses[nextIndex];
      }
    }

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // First check for predefined responses
      const predefinedResponse = getPredefinedResponse(input);

      if (predefinedResponse) {
        // Add artificial delay for predefined responses (5 seconds)
        await new Promise(resolve => setTimeout(resolve, 5000));
        const botMsg: Message = { role: 'assistant', content: removeMarkdown(predefinedResponse) }; // Apply removeMarkdown here
        setMessages(prev => [...prev, botMsg]);
        // ... (inside handleSubmit)
      } else {
        // Use AI API for other questions
        const res = await axios.post('/api/chat', { message: input });
        if (res.data && res.data.reply) {
          const botMsg: Message = { role: 'assistant', content: removeMarkdown(res.data.reply) }; // Apply removeMarkdown here
          setMessages(prev => [...prev, botMsg]);
        } else {
          throw new Error('Invalid response from API');
        }
      }
      // ...
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I apologize, but I'm having trouble processing your request. Please try asking about my portfolio, skills, projects, services, or contact information."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-[9999]">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-black dark:bg-yellow-500 dark:hover:bg-yellow-600 text-white p-4 rounded-full shadow-lg transition transform hover:scale-110"
        >
          <FaComments className="text-2xl" />
        </button>
      ) : (
        <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg shadow-xl w-80 sm:w-96 h-[500px] flex flex-col">
          <div className="bg-black dark:bg-yellow-500 text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">Chat with AI Assistant</h3>
            <button onClick={() => setIsOpen(false)} className="hover:text-gray-200 transition">
              <FaTimes />
            </button>
          </div>

          <div ref={chatRef} className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-lg p-3 text-sm md:text-base whitespace-pre-wrap ${msg.role === 'user'
                    ? 'bg-black text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white'
                  }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-black-500 dark:bg-gray-800 dark:text-white"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="bg-black  dark:bg-yellow-500 dark:hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}