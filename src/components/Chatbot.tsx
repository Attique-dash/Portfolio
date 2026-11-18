"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiMessageCircle, FiSend, FiX } from "react-icons/fi";

type Message = { role: "user" | "assistant"; content: string };

const suggestions = ["What does Attique do?", "Tell me about his projects", "How can I get in touch?"];

function answerQuestion(query: string): { content: string; section?: string } {
  const text = query.toLowerCase();
  if (/\b(email|e-mail|phone|contact|reach|hire|message|location)\b/.test(text)) {
    return {
      content: "You can reach Muhammad at attiqueshafeeq246@gmail.com. He is based in Lahore, Pakistan. Use the contact form on this page to share a project brief.",
      section: "contact-section",
    };
  }
  if (/\b(project|work|portfolio|built|made|created)\b/.test(text)) {
    return {
      content: "Selected work includes AutoPost AI, an automated content tool; IQ Play, a multiplayer quiz experience; UniSys ERP, an academic management system; and B-site Blog, a modern publishing platform. Project images and detailed case studies can be added as they become available.",
      section: "projects-section",
    };
  }
  if (/\b(skill|stack|technology|technologies|tools|framework|code)\b/.test(text)) {
    return {
      content: "Attique works with React, Next.js, TypeScript, Node.js, MongoDB, Tailwind CSS, Python, Firebase, and REST APIs. His focus is building responsive, maintainable web products.",
      section: "skills-section",
    };
  }
  if (/\b(service|help|design|develop|build|website|app|application|ai)\b/.test(text)) {
    return {
      content: "He can help with responsive web experiences, full-stack products, product UI/UX, and practical AI integrations. Share what you have in mind through the contact form.",
      section: "services-section",
    };
  }
  if (/\b(about|who|attique|background)\b/.test(text)) {
    return {
      content: "Muhammad Attique is a full-stack developer who enjoys turning ideas into polished, responsive digital products. Explore the portfolio or get in touch to discuss a project.",
      section: "about-section",
    };
  }
  return {
    content: "I can help with information about Attique, his projects, skills, services, and contact details. Try one of the suggested questions, or send a project inquiry using the contact form.",
  };
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isLoading, isOpen]);

  const sendMessage = (value: string) => {
    const question = value.trim();
    if (!question || isLoading) return;
    setMessages((current) => [...current, { role: "user", content: question }]);
    setInput("");
    setIsLoading(true);

    window.setTimeout(() => {
      const response = answerQuestion(question);
      setMessages((current) => [...current, { role: "assistant", content: response.content }]);
      setIsLoading(false);
      if (response.section) {
        document.getElementById(response.section)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 350);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="fixed bottom-4 right-4 z-[110] sm:bottom-6 sm:right-6">
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.section
            key="chat-panel"
            initial={{ opacity: 0, y: 14, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            aria-label="Portfolio assistant"
            className="flex h-[min(34rem,calc(100dvh-6rem))] w-[min(24rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#101014] shadow-[0_24px_90px_rgba(0,0,0,0.6)]"
          >
            <header className="flex items-center justify-between border-b border-white/[0.08] bg-white/[0.025] px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-orange-200/15 bg-orange-300/[0.08] text-orange-200"><FiMessageCircle size={18} aria-hidden="true" /></span>
                <div>
                  <h2 className="text-sm font-semibold text-white">Portfolio assistant</h2>
                  <p className="mt-0.5 text-[11px] text-white/45">Ask about projects, skills, or contact</p>
                </div>
              </div>
              <button type="button" onClick={() => setIsOpen(false)} aria-label="Close chat" className="rounded-lg p-2 text-white/50 transition hover:bg-white/[0.06] hover:text-white"><FiX size={19} /></button>
            </header>

            <div ref={scrollRef} aria-live="polite" className="flex-1 space-y-4 overflow-y-auto p-4 sm:p-5">
              {messages.length === 0 && (
                <div className="space-y-4">
                  <div className="rounded-2xl rounded-tl-md border border-white/[0.07] bg-white/[0.04] p-4 text-sm leading-6 text-white/70">
                    Hi! I can help you learn more about Muhammad Attique&apos;s work. What would you like to know?
                  </div>
                  <div className="flex flex-col items-start gap-2">
                    {suggestions.map((suggestion) => (
                      <button key={suggestion} type="button" onClick={() => sendMessage(suggestion)} className="max-w-full rounded-full border border-white/10 px-3 py-2 text-left text-xs text-white/65 transition hover:border-orange-200/30 hover:text-orange-100">
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {messages.map((message, index) => (
                <div key={`${index}-${message.role}`} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <p className={`max-w-[88%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-6 ${message.role === "user" ? "rounded-br-md bg-orange-300 text-[#17100a]" : "rounded-bl-md border border-white/[0.07] bg-white/[0.04] text-white/75"}`}>
                    {message.content}
                  </p>
                </div>
              ))}
              {isLoading && <p className="text-xs text-white/40" role="status">Putting together an answer…</p>}
            </div>

            <form onSubmit={handleSubmit} className="border-t border-white/[0.08] p-3 sm:p-4">
              <label htmlFor="portfolio-chat-input" className="sr-only">Ask a question</label>
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.035] p-1.5 focus-within:border-orange-200/40">
                <input
                  id="portfolio-chat-input"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Ask a question..."
                  className="min-w-0 flex-1 bg-transparent px-2 py-2 text-sm text-white outline-none placeholder:text-white/35"
                />
                <button type="submit" disabled={isLoading || !input.trim()} aria-label="Send message" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-300 text-[#17100a] transition hover:bg-orange-200 disabled:cursor-not-allowed disabled:opacity-40"><FiSend size={15} /></button>
              </div>
            </form>
          </motion.section>
        ) : (
          <motion.button
            key="chat-launcher"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Open portfolio assistant"
            className="flex h-14 w-14 items-center justify-center rounded-2xl border border-orange-100/20 bg-orange-300 text-[#17100a] shadow-[0_10px_38px_rgba(251,146,60,0.22)] transition hover:-translate-y-0.5 hover:bg-orange-200"
          >
            <FiMessageCircle size={23} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
