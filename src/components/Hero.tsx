"use client";

import Image from 'next/image';
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight, FiDownload } from "react-icons/fi";
import protfolio from '../../public/Images/PImage2.png';

export default function Hero() {
  return (
    <section id="home-section" className="relative min-h-screen flex items-center overflow-hidden pt-20 md:pt-0">
      {/* Decorative Background Elements */}
      <div className="absolute top-1/4 -left-10 w-64 h-64 bg-blue-600/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 -right-10 w-64 h-64 bg-purple-600/20 rounded-full blur-[120px] animate-pulse delay-700" />

      <div className="container mx-auto px-6 relative z-10 mt-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          
          {/* Left side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full md:w-3/5 text-center md:text-left will-change-transform"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="inline-block px-4 py-1.5 mb-6 rounded-full border border-white/10 bg-white/5 backdrop-blur-md will-change-transform"
            >
              <span className="text-sm font-medium tracking-wider text-blue-400 uppercase">
                Available for Projects
              </span>
            </motion.div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.1]">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">Software Developer</span>
              <br /> <span className="text-gray-500">& AI Builder</span>
            </h1>

            <p className="mt-8 text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed font-light">
              I&apos;m <span className="text-white font-medium">Attique</span>, a <span className="text-blue-400">Full Stack Developer</span> & <span className="text-purple-400">Software Builder</span>.
              I craft high-performance web apps and integrate <span className="text-pink-400">AI solutions</span> that solve real problems and scale with your business.
            </p>

            <motion.div
              className="mt-10 flex flex-wrap justify-center md:justify-start gap-5 will-change-opacity"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <Link
                href="#contact-section"
                className="group relative px-8 py-4 bg-blue-600 rounded-2xl font-bold flex items-center gap-2 overflow-hidden transition-all hover:bg-blue-700 active:scale-95"
              >
                <span>Hire Me</span>
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href="/m.attique-cv.pdf"
                download="Muhammad-Attique-CV.pdf"
                className="group px-8 py-4 bg-white/5 border border-white/10 rounded-2xl font-bold backdrop-blur-md hover:bg-white/10 transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
              >
                <FiDownload className="text-blue-400" />
                <span>Download CV</span>
              </a>
            </motion.div>
          </motion.div>

          {/* Right side - Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full md:w-2/5 relative flex justify-center items-center will-change-transform"
          >
            {/* Animated Ring behind image - GPU accelerated */}
            <div className="absolute w-[300px] h-[300px] md:w-[450px] md:h-[450px] border border-blue-500/20 rounded-full animate-[spin_10s_linear_infinite] will-change-transform" />
            <div className="absolute w-[350px] h-[350px] md:w-[500px] md:h-[500px] border border-purple-500/10 rounded-full animate-[spin_15s_linear_infinite_reverse] will-change-transform" />
            
            <div className="relative w-full max-w-[400px] aspect-square group">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-purple-600/20 rounded-[3rem] blur-2xl group-hover:blur-3xl transition-all duration-700" />
              <div className="relative overflow-hidden rounded-[3rem] border border-white/10 bg-white/5 backdrop-blur-sm">
                <Image
                  src={protfolio}
                  alt="Attique - Portfolio"
                  width={600}
                  height={600}
                  className="object-contain transform group-hover:scale-105 transition-transform duration-700"
                  priority
                />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}