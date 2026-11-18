"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import {
  FiArrowDown,
  FiArrowUpRight,
  FiCode,
  FiLayers,
  FiMail,
  FiMapPin,
  FiSend,
  FiSmartphone,
  FiZap,
} from "react-icons/fi";
import { toast } from "react-hot-toast";
import Chatbot from "@/components/Chatbot";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import { sendEmail } from "@/utils/emailService";

const skills = ["React", "Next.js", "TypeScript", "Node.js", "MongoDB", "Tailwind CSS", "Python", "Firebase", "REST APIs"];

const services = [
  { icon: FiLayers, title: "Web experiences", description: "Responsive websites and interfaces that feel considered on every screen." },
  { icon: FiCode, title: "Full-stack products", description: "Reliable web applications, APIs, and integrations built around real needs." },
  { icon: FiSmartphone, title: "Product UI & UX", description: "Clear user journeys and polished interface systems for web and mobile." },
  { icon: FiZap, title: "AI integration", description: "Practical AI features and automation that make digital products more useful." },
];

const inputClass = "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-orange-300/60 focus:bg-white/[0.06]";

export default function Home() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      const result = await sendEmail(formData);
      if (result.success) {
        toast.success("Thanks for reaching out. Your message has been sent.");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        toast.error("Your message could not be sent. Please try again.");
      }
    } catch {
      toast.error("Something went wrong. Please try again or email me directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#070709] text-white">
      <Navbar />
      <div id="home-section" className="relative">
        <Hero />
      </div>

      <section id="about-section" className="relative z-10 border-y border-white/[0.06] bg-[#0b0b0e] px-5 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-center md:gap-20">
          <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-orange-300">A little about me</p>
            <h2 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">I build useful things for the web.</h2>
          </motion.div>
          <div>
            <p className="text-base leading-8 text-white/60 sm:text-lg">
              I&apos;m Muhammad Attique, a full-stack developer focused on thoughtful digital products. I enjoy taking ideas from the first sketch to a polished, responsive experience—with clean interfaces, dependable engineering, and details that make a product feel complete.
            </p>
            <a href="#projects-section" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-orange-200 transition hover:text-orange-100">
              Explore selected work <FiArrowDown aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <Projects />

      <section id="skills-section" className="relative z-10 border-y border-white/[0.06] bg-[#0b0b0e] px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[0.8fr_1.2fr] md:items-center md:gap-20">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-orange-300">How I work</p>
            <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">Tools are only part of the craft.</h2>
            <p className="mt-5 max-w-lg text-sm leading-7 text-white/55 sm:text-base">I combine modern technologies with a focus on clarity, performance, accessibility, and maintainable code.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill, index) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04 }}
                className="rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3 text-sm text-white/75 shadow-[0_10px_30px_rgba(0,0,0,0.15)] transition hover:-translate-y-0.5 hover:border-orange-300/30 hover:text-white"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      <section id="services-section" className="relative z-10 px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 max-w-2xl sm:mb-16">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-orange-300">What I can help with</p>
            <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">From concept to launch.</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.map(({ icon: Icon, title, description }, index) => (
              <motion.article
                key={title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6 transition duration-300 hover:-translate-y-1 hover:border-orange-300/25 hover:bg-white/[0.04]"
              >
                <span className="mb-8 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-orange-200/15 bg-orange-300/[0.08] text-orange-200"><Icon size={19} aria-hidden="true" /></span>
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/50">{description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact-section" className="relative z-10 px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-[#0b0b0e] md:grid-cols-[0.85fr_1.15fr]">
          <div className="relative overflow-hidden p-7 sm:p-10 lg:p-14">
            <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-orange-500/[0.12] blur-[100px]" />
            <div className="relative">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-orange-300">Let&apos;s talk</p>
              <h2 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">Have a good idea?</h2>
              <p className="mt-5 max-w-md text-sm leading-7 text-white/55 sm:text-base">Tell me what you&apos;re working on. I&apos;d love to hear about it and explore how I can help.</p>
              <a href="mailto:attiqueshafeeq246@gmail.com" className="mt-8 inline-flex max-w-full items-center gap-3 break-all text-sm text-white/80 transition hover:text-orange-200">
                <FiMail className="shrink-0 text-orange-200" aria-hidden="true" /> attiqueshafeeq246@gmail.com <FiArrowUpRight aria-hidden="true" />
              </a>
              <p className="mt-4 flex items-center gap-3 text-sm text-white/45"><FiMapPin className="text-orange-200/80" aria-hidden="true" /> Lahore, Pakistan</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="border-t border-white/[0.08] p-6 sm:p-10 md:border-l md:border-t-0 lg:p-14">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2 text-xs font-medium text-white/60">Name
                <input required name="name" autoComplete="name" value={formData.name} onChange={(event) => setFormData({ ...formData, name: event.target.value })} className={inputClass} placeholder="Your name" />
              </label>
              <label className="space-y-2 text-xs font-medium text-white/60">Email
                <input required type="email" name="email" autoComplete="email" value={formData.email} onChange={(event) => setFormData({ ...formData, email: event.target.value })} className={inputClass} placeholder="you@example.com" />
              </label>
            </div>
            <label className="mt-4 block space-y-2 text-xs font-medium text-white/60">Subject
              <input required name="subject" value={formData.subject} onChange={(event) => setFormData({ ...formData, subject: event.target.value })} className={inputClass} placeholder="What would you like to build?" />
            </label>
            <label className="mt-4 block space-y-2 text-xs font-medium text-white/60">Message
              <textarea required name="message" rows={5} value={formData.message} onChange={(event) => setFormData({ ...formData, message: event.target.value })} className={`${inputClass} resize-y`} placeholder="A few details about your project..." />
            </label>
            <button type="submit" disabled={isSubmitting} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-orange-300 px-5 py-3.5 text-sm font-semibold text-[#17100a] transition hover:bg-orange-200 disabled:cursor-not-allowed disabled:opacity-60">
              {isSubmitting ? "Sending…" : "Send a message"} <FiSend aria-hidden="true" />
            </button>
          </form>
        </div>
      </section>

      <footer className="border-t border-white/[0.07] px-5 py-7 text-center text-xs text-white/40 sm:px-8">
        <p>© {new Date().getFullYear()} Muhammad Attique. Designed and built with care.</p>
      </footer>
      <Chatbot />
    </main>
  );
}
