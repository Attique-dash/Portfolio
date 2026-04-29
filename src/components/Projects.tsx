"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import project1 from '../../public/Images/AI Project.png';
import project2 from '../../public/Images/Game Project.png';
import project3 from '../../public/Images/Erp Project.png';
import project4 from '../../public/Images/Stock Project.jpg';
import project5 from '../../public/Images/Salt Project.png';
import project6 from '../../public/Images/Blog Project.png';

const projects = [
  { id: 1, image: project1, title: 'AutoPost AI', description: 'AutoPost AI automatically generates a new post every minute based on user-defined topics with pause/restart functionality.', link: 'https://daily-drafits-ai-git-main-muhammad-attiques-projects.vercel.app/', tags: ['AI Integration', 'Next.js', 'Firebase'] },
  { id: 2, image: project2, title: 'IQ Play Game', description: 'A 2-player quiz challenge featuring 6 games across 3 difficulty levels with progress tracking and rewards.', link: 'http://iqplay-2baf-git-master-muhammad-attiques-projects.vercel.app', tags: ['Next.js', 'Stripe', 'Firebase'] },
  { id: 3, image: project3, title: 'UniSys ERP', description: 'Role-based management system for academic environments, handling tasks for teachers, CRs, and students.', link: 'https://uni-sys-muhammad-attiques-projects.vercel.app/', tags: ['React', 'Node.js', 'Firebase'] },
  { id: 4, image: project6, title: 'B-site Blog', description: 'User-driven publishing platform with trending posts discovery and category-based tag filtering.', link: 'https://bloging-website-frontend-krghv0e2l-muhammadumar248s-projects.vercel.app/', tags: ['Next.js', 'MongoDB', 'Tailwind'] },
  { id: 5, image: project5, title: 'Faychem Salt', description: 'Global export platform for premium Pakistani salt solutions, tailored for industrial and culinary sectors.', link: 'https://faychem.vercel.app/', tags: ['Next.js', 'Firebase', 'Nodemailer'] },
  { id: 6, image: project4, title: 'Stock Pro', description: 'Real-time stock tracking system allowing users to manage inventory quantities, pricing, and availability.', link: 'https://stock-management-system-psi.vercel.app/', tags: ['Javascript', 'MongoDB', 'CSS'] },
];

export default function Projects() {
  return (
    <section id="projects-section" className="py-24 relative z-10 bg-[#030303]">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-blue-500 font-mono text-sm tracking-[0.3em] uppercase"
            >
              Selected Work
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold mt-4 tracking-tighter"
            >
              Building Digital <br /> <span className="text-gray-500">Solutions.</span>
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-gray-500 max-w-xs text-sm leading-relaxed"
          >
            A collection of projects spanning AI integration, ERP systems, and high-performance web applications.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <Link href={project.link} target="_blank">
                <div className="relative overflow-hidden rounded-[2rem] bg-white/[0.03] border border-white/10 transition-all duration-500 hover:border-blue-500/50 hover:bg-white/[0.06]">
                  {/* Image Container */}
                  <div className="relative h-64 w-full overflow-hidden p-4">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#030303] to-transparent z-10 opacity-60" />
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-contain transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Floating Link Icon */}
                    <div className="absolute top-6 right-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="p-3 rounded-full bg-blue-500 text-white shadow-xl shadow-blue-500/20">
                        <FiExternalLink size={20} />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 relative z-20">
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-400 transition-colors">
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
                          className="text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-lg bg-white/5 border border-white/5 text-gray-400 group-hover:border-blue-500/30 group-hover:text-blue-300 transition-all"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View More Call to Action */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 py-12 border-t border-white/5 flex flex-col items-center text-center"
        >
          <h3 className="text-xl text-gray-400 mb-6">Want to see more technical breakdowns?</h3>
          <Link 
            href="https://github.com/Attique-dash" 
            target="_blank"
            className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-white text-black font-bold hover:bg-blue-500 hover:text-white transition-all active:scale-95"
          >
            <FiGithub size={20} />
            Explore GitHub
          </Link>
        </motion.div>
      </div>
    </section>
  );
}