"use client";

import { motion } from "framer-motion";
import { FiArrowUpRight, FiCpu, FiGlobe, FiLayers, FiMessageSquare } from "react-icons/fi";
import TiltCard from "./TiltCard";

const projects = [
  {
    number: "01",
    title: "AutoPost AI",
    category: "AI · Automation",
    description:
      "A content automation platform that turns topic ideas into a steady stream of ready-to-share posts, with controls to pause and resume generation.",
    tags: ["Artificial intelligence", "Automation", "Web application"],
    icon: FiCpu,
    accent: "from-orange-400/20 to-amber-400/5",
  },
  {
    number: "02",
    title: "IQ Play",
    category: "Interactive · Gaming",
    description:
      "A multiplayer quiz experience built around friendly competition, progressive difficulty, and clear player progress.",
    tags: ["React", "Game mechanics", "Responsive UI"],
    icon: FiLayers,
    accent: "from-violet-400/20 to-fuchsia-400/5",
  },
  {
    number: "03",
    title: "UniSys ERP",
    category: "Education · Management",
    description:
      "A role-based academic management system designed to bring student, teacher, and class representative workflows together.",
    tags: ["ERP", "Role-based access", "Education"],
    icon: FiGlobe,
    accent: "from-cyan-400/20 to-blue-400/5",
  },
  {
    number: "04",
    title: "B-site Blog",
    category: "Publishing · Community",
    description:
      "A modern publishing experience with category discovery, topic tags, and a focus on making useful writing easy to find.",
    tags: ["Content platform", "Discovery", "Web design"],
    icon: FiMessageSquare,
    accent: "from-emerald-400/20 to-teal-400/5",
  },
];

export default function Projects() {
  return (
    <section id="projects-section" className="relative z-10 overflow-hidden px-5 py-24 sm:px-8 sm:py-32">
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-4/5 -translate-x-1/2 bg-gradient-to-r from-transparent via-orange-400/50 to-transparent" />
      <div className="pointer-events-none absolute -left-40 top-1/3 h-80 w-80 rounded-full bg-orange-500/[0.07] blur-[120px]" />
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mb-12 flex flex-col gap-5 md:mb-16 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-orange-300">Selected work</p>
            <h2 className="max-w-2xl text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
              Thoughtful work. <span className="text-white/45">Real outcomes.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-white/55 sm:text-base">
            A selection of digital products exploring AI, education, publishing, and interactive experiences. More project details and visuals will be added as they are ready.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
          {projects.map((project, index) => {
            const Icon = project.icon;
            return (
              <motion.div
                key={project.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: index * 0.07, duration: 0.45 }}
                className="h-full"
              >
                <TiltCard
                  intensity={6}
                  glareColor="rgba(255,255,255,0.08)"
                  className="group relative h-full min-h-[310px] overflow-hidden rounded-3xl border border-white/10 bg-[#0b0b0e] p-6 transition-colors duration-300 hover:border-white/20 sm:p-8"
                >
                  <div className={`pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-gradient-to-br ${project.accent} blur-3xl transition-opacity duration-500 group-hover:opacity-150`} />
                  <div className="relative flex h-full flex-col" style={{ transform: "translateZ(24px)" }}>
                    <div className="mb-10 flex items-start justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-orange-200 shadow-[0_12px_36px_rgba(0,0,0,0.25)]">
                        <Icon size={21} aria-hidden="true" />
                      </div>
                      <span className="font-mono text-xs tracking-widest text-white/35">{project.number}</span>
                    </div>
                    <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-200/75">{project.category}</p>
                    <div className="flex items-center gap-2">
                      <h3 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">{project.title}</h3>
                      <FiArrowUpRight className="text-white/25 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-orange-200" aria-hidden="true" />
                    </div>
                    <p className="mt-3 max-w-lg text-sm leading-7 text-white/55">{project.description}</p>
                    <div className="mt-auto flex flex-wrap gap-2 pt-7">
                      {project.tags.map((tag) => (
                        <span key={tag} className="rounded-full border border-white/[0.09] bg-white/[0.03] px-3 py-1.5 text-[10px] font-medium tracking-wide text-white/55 sm:text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
