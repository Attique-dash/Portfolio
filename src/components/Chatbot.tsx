'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaComments, FaTimes, FaPaperPlane, FaRobot } from 'react-icons/fa';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

// ... Keep your existing sectionKeywords, specificQueries, sectionResponses, and aiResponses exactly as they are ...
const sectionKeywords = {
  about: ['about', 'who', 'information', 'background', 'profile', 'introduction', 'bio', 'tell me about', 'know more'],
  skills: ['skills', 'expertise', 'technologies', 'tech stack', 'programming', 'languages', 'tools', 'frameworks', 'what can you do', 'capabilities', 'tech'],
  projects: ['projects', 'work', 'portfolio', 'applications', 'developed', 'created', 'built', 'made', 'showcase', 'development'],
  services: ['services', 'offerings', 'provide', 'offer', 'help', 'assistance', 'solutions', 'service', 'servies', 'what you offer'],
  contact: ['contact', 'reach', 'email', 'phone', 'connect', 'message', 'get in touch', 'contact info', 'number', 'social', 'e-mail', 'mail', 'contact no', 'mobile'],
  education: ['education', 'study', 'degree', 'university', 'academic', 'qualification', 'college', 'school', 'eudcation', 'studied', 'learning']
};

const specificQueries = {
  email: ['email', 'e-mail', 'mail', 'send mail', 'electronic mail'],
  phone: ['phone', 'contact no', 'number', 'mobile', 'call', 'telephone'],
  location: ['location', 'address', 'where', 'place', 'city'],
  education: ['education', 'study', 'degree', 'university', 'qualification']
};

const sectionResponses = {
  about: [
    `Muhammad Attique is a skilled full-stack developer specializing in Web Development, AI/ML Solutions, and Software Architecture.`,
    `As a professional developer, Muhammad Attique brings strong technical expertise and creative problem-solving to every project.`
  ],
  skills: [
    `Technical Skills Overview:\n• Frontend: React.js, Next.js, TypeScript\n• Backend: Node.js, Python, Express\n• Database: MongoDB, Firebase\n• AI: Implementation & Integration`
  ],
  projects: [
    `Key Projects:\n1. AutoPost AI (IoT/Automation)\n2. IQPLAY Game (Game Dev/MCQs)\n3. B-Site Blog (Modern Publishing)`
  ],
  services: [
    `I offer Full-stack Development, Modern Web Design, and custom API Architectures.`
  ],
  contact: [
    `Contact Information:\n• Email: attiqueshafeeq246@gmail.com\n• Phone: +92-3244771036\n• Location: Lahore, Pakistan`
  ],
  education: [
    `Educational Background:\n• MS Computer Science - Superior University\n• BS Computer Science - Superior University (2021-2025)`
  ]
};

const aiResponses = {
  sports: ["I'm focused on Attique's professional work, but sports are great! For cricket stats, check official sports portals."],
  general: ["I am Attique's AI assistant. Ask me about his skills, projects, or how to contact him!"]
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const getRandomResponse = (section: string): string => {
    const responses = sectionResponses[section as keyof typeof sectionResponses];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const getAIResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    if (lowerQuery.includes('cricket') || lowerQuery.includes('sport')) {
      return aiResponses.sports[0];
    }
    return aiResponses.general[0];
  };

  const findMatchingSection = (query: string): { section: string | null, specific?: string } => {
    const words = query.toLowerCase().split(' ');
    for (const [type, keywords] of Object.entries(specificQueries)) {
      if (keywords.some(keyword => words.some(word => word.includes(keyword)))) return { section: 'contact', specific: type };
    }
    for (const [section, keywords] of Object.entries(sectionKeywords)) {
      if (keywords.some(keyword => words.some(word => word.includes(keyword)))) return { section };
    }
    return { section: null };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    // Simulate AI thinking
    setTimeout(() => {
      const { section, specific } = findMatchingSection(currentInput.toLowerCase());
      let content: string;

      if (section) {
        if (specific === 'email') content = "Email: attiqueshafeeq246@gmail.com";
        else if (specific === 'phone') content = "Contact: +92-3244771036";
        else if (specific === 'location') content = "Location: Lahore, Pakistan";
        else content = getRandomResponse(section);

        const element = document.querySelector(`#${section}-section`);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      } else {
        content = getAIResponse(currentInput);
      }

      setMessages(prev => [...prev, { role: 'assistant', content }]);
      setIsLoading(false);
    }, 1200);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {!isOpen ? (
          <motion.button
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 45 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsOpen(true)}
            className="w-16 h-16 bg-gradient-to-tr from-blue-600 to-purple-600 text-white rounded-2xl shadow-[0_10px_40px_rgba(37,99,235,0.4)] flex items-center justify-center hover:scale-110 transition-transform cursor-pointer will-change-transform"
          >
            <FaComments size={28} />
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="w-[90vw] sm:w-[380px] h-[550px] bg-[#0d0d0d]/80 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-2xl flex flex-col overflow-hidden will-change-transform"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">
                  <FaRobot size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">Attique AI</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest">Online</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition cursor-pointer">
                <FaTimes size={20} />
              </button>
            </div>

            {/* Chat Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
              {messages.length === 0 && (
                <div className="space-y-4 py-4">
                   <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-gray-400 text-xs leading-relaxed">
                    👋 Hi! I&apos;m Attique&apos;s virtual assistant. Ask me about his <span className="text-blue-400">Skills</span>, <span className="text-purple-400">Experience</span>, or <span className="text-pink-400">Projects</span>.
                  </div>
                </div>
              )}
              {messages.map((msg, i) => (
                <motion.div
                  initial={{ opacity: 0, x: msg.role === 'user' ? 8 : -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} will-change-transform`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-blue-600 text-white rounded-tr-none shadow-lg shadow-blue-900/20'
                        : 'bg-white/10 text-gray-200 border border-white/10 rounded-tl-none'
                    }`}
                  >
                    {msg.content.split('\n').map((line, j) => (
                      <p key={j}>{line}</p>
                    ))}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" />
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <form onSubmit={handleSubmit} className="p-6 bg-white/5 border-t border-white/5">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  className="w-full bg-white/5 border border-white/10 text-white rounded-xl py-3 pl-4 pr-12 text-sm outline-none focus:border-blue-500/50 transition-all placeholder:text-gray-600"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-blue-500 hover:text-blue-400 disabled:opacity-0 transition-all cursor-pointer"
                >
                  <FaPaperPlane size={14} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}