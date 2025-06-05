'use client';

import { useState } from 'react';
import { FaComments, FaTimes } from 'react-icons/fa';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

// Keywords mapping for each section with more variations
const sectionKeywords = {
  about: ['about', 'who', 'information', 'background', 'profile', 'introduction', 'bio', 'tell me about', 'know more'],
  skills: ['skills', 'expertise', 'technologies', 'tech stack', 'programming', 'languages', 'tools', 'frameworks', 'what can you do', 'capabilities', 'tech'],
  projects: ['projects', 'work', 'portfolio', 'applications', 'developed', 'created', 'built', 'made', 'showcase', 'development'],
  services: ['services', 'offerings', 'provide', 'offer', 'help', 'assistance', 'solutions', 'service', 'servies', 'what you offer'],
  contact: ['contact', 'reach', 'email', 'phone', 'connect', 'message', 'get in touch', 'contact info', 'number', 'social', 'e-mail', 'mail', 'contact no', 'mobile'],
  education: ['education', 'study', 'degree', 'university', 'academic', 'qualification', 'college', 'school', 'eudcation', 'studied', 'learning']
};

// Add specific query mappings
const specificQueries = {
  email: ['email', 'e-mail', 'mail', 'send mail', 'electronic mail'],
  phone: ['phone', 'contact no', 'number', 'mobile', 'call', 'telephone'],
  location: ['location', 'address', 'where', 'place', 'city'],
  education: ['education', 'study', 'degree', 'university', 'qualification']
};

// Define section-specific responses with more variations
const sectionResponses = {
  about: [
    `Muhammad Attique is a skilled full-stack developer specializing in:
    • Web Development
    • AI/ML Solutions
    • Software Architecture
    Currently focused on creating innovative solutions using modern technologies.`,
    `As a professional developer, Muhammad Attique brings:
    • Strong technical expertise
    • Creative problem-solving
    • Modern development practices
    Passionate about creating efficient and scalable solutions.`,
    `Muhammad Attique's professional profile:
    • Full-stack Developer
    • AI Enthusiast
    • Solution Architect
    Dedicated to delivering high-quality software solutions.`
  ],
  skills: [
    `Technical Skills Overview:
    • Frontend: React.js, Next.js, TypeScript
    • Backend: Node.js, Python, express
    • Database: MongoDB, Firebase
    • AI: AI Implementation`,
    `Core Competencies:
    • Web Application Development
    • Database Architecture
    • API Development
    • UI/UX Implementation`,
    `Technical Expertise:
    • Modern JavaScript/TypeScript
    • Full-stack Development
    • Software Architecture
    • AI Integration`
  ],
  projects: [
    `Key Projects:
    1. AutoPost AI
       • IoT-based solution
       • Real-time monitoring
       • Automated control
    
    2. IQPLAY Game
       • Game Development
       • User Interface
       • Gameplay MCQ
    
    3. B-Site Blog
       • Blog Development
       • User Interface
       • Blog Posting
       • Blog Commenting`,
    `Notable Developments:
    1. UniSys ERP
       • ERP Development
       • User Interface
       • Role Based Access
    
    2. Store Management System
       • Product Management
       • Shopping Cart
       • Add Product
       • Update Product
       • Delete Product
    
    3. Fachem Salt
       • Modern design
       • Responsive layout
       • Product Purchase`
  ],
  services: [
    `Professional Services:
    1. Full-stack Development
       • Custom web applications
       • Mobile-first design
       • API integration
    
    2. Web Design
       • Modern Design
       • Responsive Layout
       • User Interface
    
    3. API Development
       • API Integration
       • API Documentation
       • API Testing`,
    `Service Offerings:
    1. Web Development
       • Frontend development
       • Backend architecture
       • Database design
    
    2. Problem Solving
       • Algorithm Development
       • Data Structure
       • Problem Solving
    
    3. Responsive Design
       • User Interface
       • Responsive Layout
       • Mobile-first design`
  ],
  contact: [
    `Contact Information:
    • Email: attiqueshafeeq246@gmail.com
    • Phone: +92-3244771036
    • Location: Lahore, Pakistan
    
    Feel free to reach out for professional inquiries.`,
    `Get in Touch:
    • Professional Email: attiqueshafeeq246@gmail.com
    • Personal Number: +92-3244771036
    • LinkedIn: Available on request
    
    Available for project discussions and collaborations.`,
    `Contact Details:
    • Primary Email: attiqueshafeeq246@gmail.com
    • Contact Number: +92-3244771036
    • Based in: Lahore, Pakistan
    
    Open to discussing new opportunities and projects.`
  ],
  education: [
    `Educational Background:
    . Masters in Computer Science
       • Superior University Lahore
       • Experience: 4 + Years
       • Focus: Web Development & AI,
    
    . BS Computer Science
       • Superior University
       • Graduated: June 2021
       • Experience: 2021 - 2025
       • Specialized in Web Development`,
    ` 
     . Advanced computer vision
      - Bachelors Degree
      - Computer Science
      - Research AI `
  ]
};

// AI response variations for non-section queries
const aiResponses = {
  sports: [
    "While I specialize in providing information about Muhammad Attique's professional work and background, I can tell you that  is a fascinating sport! For the most current cricket rankings and player statistics, I'd recommend checking official cricket websites or sports news portals.",
    "I'm primarily focused on Muhammad Attique's professional profile, but for cricket-related questions, you might want to check official statistics websites for the most up-to-date information.",
    "My expertise is in providing information about Muhammad Attique's work and skills. For cricket statistics and rankings, please refer to official  websites or sports databases."
  ],
  general: [
    "I'm Muhammad Attique's AI assistant, specialized in providing information about his professional background, skills, and work. What would you like to know about his expertise?",
    "I can help you learn about Muhammad Attique's professional experience, projects, and skills. What specific aspect would you like to know more about?",
    "While I focus on Muhammad Attique's professional profile, I'd be happy to tell you about his work, education, or technical expertise. What interests you?"
  ]
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingTimeout, setLoadingTimeout] = useState<NodeJS.Timeout | null>(null);

  const getRandomResponse = (section: string): string => {
    const responses = sectionResponses[section as keyof typeof sectionResponses];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const getAIResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    // Check for sports-related queries
    if (lowerQuery.includes('cricket') || lowerQuery.includes('player') || lowerQuery.includes('sport')) {
      return aiResponses.sports[Math.floor(Math.random() * aiResponses.sports.length)];
    }
    
    return aiResponses.general[Math.floor(Math.random() * aiResponses.general.length)];
  };

  const findMatchingSection = (query: string): { section: string | null, specific?: string } => {
    const words = query.toLowerCase().split(' ');
    
    // First check for specific queries
    for (const [type, keywords] of Object.entries(specificQueries)) {
      if (keywords.some(keyword => words.some(word => word.includes(keyword) || keyword.includes(word)))) {
        return { section: 'contact', specific: type };
      }
    }
    
    // Then check for general sections
    for (const [section, keywords] of Object.entries(sectionKeywords)) {
      if (keywords.some(keyword => words.some(word => word.includes(keyword) || keyword.includes(word)))) {
        return { section };
      }
    }
    return { section: null };
  };

  const getSpecificResponse = (type: string): string => {
    switch (type) {
      case 'email':
        return `Email: attiqueshafeeq246@gmail.com`;
      case 'phone':
        return `Contact Number: +92-3244771036`;
      case 'location':
        return `Location: Lahore, Pakistan`;
      default:
        return getRandomResponse('contact');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    if (loadingTimeout) {
      clearTimeout(loadingTimeout);
    }

    try {
      const query = input.toLowerCase().trim();
      const { section, specific } = findMatchingSection(query);

      const timeout = setTimeout(() => {
        let response: Message;

        if (section) {
          let content: string;
          
          if (specific) {
            content = getSpecificResponse(specific);
          } else {
            content = getRandomResponse(section);
          }

          const element = document.querySelector(`#${section}-section`);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }

          response = {
            role: 'assistant',
            content
          };
        } else {
          response = {
            role: 'assistant',
            content: getAIResponse(query)
          };
        }

        setMessages(prev => [...prev, response]);
        setIsLoading(false);
      }, 5000);

      setLoadingTimeout(timeout);

    } catch (error: unknown) {
      const errorMessage: Message = {
        role: 'assistant',
        content: error instanceof Error ? error.message : 'Sorry, I encountered an error. Please try again.'
      };
      setMessages(prev => [...prev, errorMessage]);
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 cursor-pointer text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all"
        >
          <FaComments size={24} />
        </button>
      ) : (
        <div className="w-[90vw] sm:w-80 md:w-96 lg:w-[28rem] h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col border border-gray-200">
          {/* Header */}
          <div className="p-4 border-b border-gray-300 flex justify-between items-center bg-blue-50 rounded-t-2xl">
            <h3 className="font-semibold text-blue-600">Chat with AI</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 cursor-pointer hover:text-red-500 transition"
              aria-label="Close chat"
            >
              <FaTimes size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 mt-4">
                <p>👋 Hi! I can help you learn about:</p>
                <p className="mt-2">• About & Background</p>
                <p>• Skills & Expertise</p>
                <p>• Projects & Portfolio</p>
                <p>• Services & Offerings</p>
                <p>• Contact Information</p>
                <p>• Education & Qualifications</p>
                <p className="mt-2">Feel free to ask anything!</p>
              </div>
            )}
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-xl px-4 py-2 text-sm shadow ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white border border-gray-200 text-gray-800'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 text-gray-800 rounded-xl p-3">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-300 bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-2 border border-gray-300 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              />
              <button
                type="submit"
                className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                disabled={isLoading}
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
