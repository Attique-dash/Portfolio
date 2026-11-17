"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import project1 from "../../public/Images/AI Project.png";
import project2 from "../../public/Images/Game Project.png";
import project3 from "../../public/Images/Erp Project.png";
import project6 from "../../public/Images/Blog Project.png";
import TiltCard from "./TiltCard";

const projects = [
  { id: 1, image: project1, title: "AutoPost AI", description: "AutoPost AI automatically generates a new post every minute based on user-defined topics with pause/restart functionality.", link: "https://daily-drafits-ai-git-main-muhammad-attiques-projects.vercel.app/", tags: ["AI Integration", "Next.js", "Firebase"] },
  { id: 2, image: project2, title: "IQ Play Game", description: "A 2-player quiz challenge featuring 6 games across 3 difficulty levels with progress tracking and rewards.", link: "http://iqplay-2baf-git-master-muhammad-attiques-projects.vercel.app", tags: ["Next.js", "Stripe", "Firebase"] },
  { id: 3, image: project3, title: "UniSys ERP", description: "Role-based management system for academic environments, handling tasks for teachers, CRs, and students.", link: "https://uni-sys-muhammad-attiques-projects.vercel.app/", tags: ["React", "Node.js", "Firebase"] },
  { id: 4, image: project6, title: "B-site Blog", description: "User-driven publishing platform with trending posts discovery and category-based tag filtering.", link: "https://bloging-website-frontend-krghv0e2l-muhammadumar248s-projects.vercel.app/", tags: ["Next.js", "MongoDB", "Tailwind"] },
];

export default function Projects() {
  return (
    <section id="projects-section" className="py-28 relative z-10 bg-[#07070f]">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />
      <div className="absolute top-40 -left-40 w-96 h-96 bg-orange-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-40 -right-40 w-96 h-96 bg-red-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-orange-400 font-mono text-sm tracking-[0.3em] uppercase"
            >
              Selected Work
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05, duration: 0.4 }}
              className="text-4xl md:text-6xl font-black mt-4 tracking-tighter"
            >
              Building Digital <br />{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">
                Solutions.
              </span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="text-gray-500 max-w-xs text-sm leading-relaxed"
          >
            A collection of projects spanning AI integration, ERP systems, and
            high-performance web applications.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(idx * 0.08, 0.24), duration: 0.5 }}
              viewport={{ once: true, margin: "-50px" }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <Link href={project.link} target="_blank">
                <TiltCard
                  intensity={10}
                  glareColor="rgba(249,115,22,0.15)"
                  className="rounded-[2rem] bg-white/[0.03] border border-white/10 hover:border-orange-500/40 transition-colors duration-500 overflow-hidden"
                >
                  {/* Image Container */}
                  <div className="relative h-60 w-full overflow-hidden p-4">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#07070f] via-transparent to-transparent z-10 opacity-70" />
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-contain transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Floating Link Icon */}
                    <div className="absolute top-6 right-6 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                      <div className="p-3 rounded-full bg-orange-500 text-white shadow-xl shadow-orange-500/30">
                        <FiExternalLink size={18} />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 relative z-20">
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-orange-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 mb-6">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-lg bg-white/5 border border-white/5 text-gray-400 group-hover:border-orange-500/30 group-hover:text-orange-300 transition-all"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </Link>
            </motion.div>
          ))}

          {/* GitHub CTA card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <TiltCard
              intensity={10}
              glareColor="rgba(249,115,22,0.15)"
              className="h-full min-h-[320px] rounded-[2rem] bg-gradient-to-br from-orange-600/20 via-red-600/10 to-orange-500/10 border border-orange-500/20 flex flex-col items-center justify-center text-center p-8"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
                <FiGithub size={28} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">More on GitHub</h3>
              <p className="text-gray-400 text-sm mb-6">
                Explore repositories, experiments and open-source work.
              </p>
              <Link
                href="https://github.com/Attique-dash"
                target="_blank"
                className="px-6 py-3 rounded-xl bg-white text-black text-sm font-bold hover:bg-orange-500 hover:text-white transition-all active:scale-95"
              >
                View Profile
              </Link>
            </TiltCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
