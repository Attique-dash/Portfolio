'use client';

import { FaDownload, FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub } from 'react-icons/fa';
import { TbBrandFiverr } from "react-icons/tb";
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
// Assuming '@/lib/generatePdf' still exists and works for fallback
import { generateSimpleCV } from '@/lib/generatePdf';

export default function CVPage() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleDownloadCV = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/m.attique-cv.pdf');
      if (!response.ok) {
        const pdfBytes = await generateSimpleCV();
        downloadPdf(pdfBytes, 'm.attique-cv.pdf');
        return;
      }
      const blob = await response.blob();
      downloadPdf(blob, 'm.attique-cv.pdf');
    } catch {
      setError('Failed to download CV. Please try again or contact me.');
    } finally {
      setIsLoading(false);
    }
  };

  const downloadPdf = (data: Blob | Uint8Array, filename: string) => {
    const blob = data instanceof Blob ? data : new Blob([new Uint8Array(data)], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 100);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white py-20 px-4 sm:px-6 lg:px-8 selection:bg-purple-500/30">
      {/* Decorative background glow */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Navigation Back */}
        <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-white mb-8 transition-colors group">
          <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Portfolio
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl"
        >
          {/* Header Section */}
          <div className="relative bg-gradient-to-br from-blue-600/20 to-purple-600/20 p-8 md:p-12 border-b border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-2">
                  Muhammad <span className="text-blue-500">Attique</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-400 font-light tracking-wide">
                  Full Stack Developer & AI Integration Specialist
                </p>
              </div>
              <button
                onClick={handleDownloadCV}
                disabled={isLoading}
                className="flex items-center gap-3 bg-white text-black px-8 py-4 rounded-2xl font-bold hover:bg-blue-500 hover:text-white transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
              >
                <FaDownload className={isLoading ? 'animate-bounce' : ''} />
                {isLoading ? 'Processing...' : 'Download PDF'}
              </button>
            </div>

            {/* Quick Contact Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 p-6 bg-white/5 rounded-3xl border border-white/5 backdrop-blur-md">
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <FaEnvelope className="text-blue-400" />
                <a href="mailto:attiqueshafeeq246@gmail.com" className="hover:text-white transition-colors">attiqueshafeeq246@gmail.com</a>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <FaPhone className="text-blue-400" />
                <a href="tel:+923244771036" className="hover:text-white transition-colors">+92-3244771036</a>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <FaMapMarkerAlt className="text-blue-400" />
                <span>Lahore, Pakistan</span>
              </div>
            </div>
          </div>

          {/* CV Content */}
          <div className="p-8 md:p-12 space-y-16">
            
            {/* Professional Summary */}
            <section>
              <h2 className="text-xs uppercase tracking-[0.3em] text-blue-500 font-bold mb-6">Summary</h2>
              <p className="text-gray-400 leading-relaxed text-lg font-light">
                Highly motivated <span className="text-white font-medium">Full Stack Developer</span> with 4+ years of expertise. 
                Proven track right record in delivering 20+ projects using <span className="text-white font-medium">React, Next.js, and Node.js</span>. 
                Expert in bridging complex backend logic with intuitive UI/UX and integrating AI solutions for modern business needs.
              </p>
            </section>

            {/* Experience */}
            <section>
              <h2 className="text-xs uppercase tracking-[0.3em] text-blue-500 font-bold mb-8">Experience</h2>
              <div className="space-y-10">
                <div className="relative pl-8 border-l border-white/10 group">
                  <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_10px_#3b82f6]" />
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">Senior Full Stack Developer</h3>
                    <span className="text-xs font-mono text-gray-500 uppercase">2021 — Present</span>
                  </div>
                  <p className="text-blue-400 text-sm font-medium mb-4">Freelance & Contractual</p>
                  <ul className="space-y-3 text-gray-400 text-sm">
                    <li>• Developed and deployed <span className="text-gray-200">20+ full-stack applications</span> for global clients on platforms like Fiverr.</li>
                    <li>• Specialized in <span className="text-gray-200">Next.js 14+</span>, optimizing for SEO and sub-second load times.</li>
                    <li>• Solved high-complexity architectural bottlenecks in ERP and Stock Management systems.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Technical Skills - Grid Style */}
            <section>
              <h2 className="text-xs uppercase tracking-[0.3em] text-blue-500 font-bold mb-8">Expertise</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { cat: "Frontend", skills: "React, Next.js, TS, Tailwind, Framer Motion" },
                  { cat: "Backend", skills: "Node.js, Express, Python, API Design" },
                  { cat: "Database", skills: "MongoDB, Firebase, MySQL, PostgreSQL" },
                  { cat: "AI & Tools", skills: "AI Integration, Git, Vercel, Docker" }
                ].map((s, i) => (
                  <div key={i} className="p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-all group">
                    <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1 group-hover:text-blue-400 transition-colors">{s.cat}</p>
                    <p className="text-sm text-gray-200">{s.skills}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Education */}
            <section>
              <h2 className="text-xs uppercase tracking-[0.3em] text-blue-500 font-bold mb-8">Education</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-1">
                  <h3 className="text-lg font-bold">BS Computer Science</h3>
                  <p className="text-blue-400 text-sm">Superior University Lahore</p>
                  <p className="text-gray-500 text-xs">2023 — 2027 (Ongoing)</p>
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold">Intermediate (ICS)</h3>
                  <p className="text-blue-400 text-sm">Concordia College</p>
                  <p className="text-gray-500 text-xs">2021 — 2023</p>
                </div>
              </div>
            </section>

            {/* Social Connect */}
            <section className="pt-8 border-t border-white/5">
              <div className="flex flex-wrap gap-8 justify-center items-center opacity-60 hover:opacity-100 transition-opacity">
                <a href="https://github.com/Attique-dash" target="_blank" className="hover:text-white transition-colors flex items-center gap-2">
                  <FaGithub size={20} /> <span className="text-xs font-mono uppercase tracking-tighter">GitHub</span>
                </a>
                <a href="https://www.linkedin.com/in/attique-muhammad-attique-835474368/" target="_blank" className="hover:text-blue-400 transition-colors flex items-center gap-2">
                  <FaLinkedin size={20} /> <span className="text-xs font-mono uppercase tracking-tighter">LinkedIn</span>
                </a>
                <a href="https://www.fiverr.com/attique110" target="_blank" className="hover:text-green-400 transition-colors flex items-center gap-2">
                  <TbBrandFiverr size={22} /> <span className="text-xs font-mono uppercase tracking-tighter">Fiverr</span>
                </a>
              </div>
            </section>
          </div>
          
          {error && (
            <div className="m-8 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl text-sm text-center">
              {error} - Please contact attiqueshafeeq246@gmail.com
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}