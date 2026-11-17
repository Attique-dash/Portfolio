"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { FiArrowRight, FiDownload } from "react-icons/fi";
import protfolio from "../../public/Images/PImage2.png";
import TiltCard from "./TiltCard";

const HeroScene = dynamic(() => import("./three/HeroScene"), { ssr: false });

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

export default function Hero() {
  return (
    <section id="home-section" className="relative min-h-screen flex items-center overflow-hidden pt-24 md:pt-0">
      {/* 3D WebGL Scene */}
      <div className="absolute inset-0 z-0">
        <HeroScene />
      </div>

      {/* Readability gradients */}
      <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-r from-[#050505] via-[#050505]/70 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 z-[1] pointer-events-none bg-gradient-to-t from-[#050505] to-transparent" />

      <div className="container mx-auto px-6 relative z-10 mt-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Left side - Content */}
          <div className="w-full md:w-3/5 text-center md:text-left">
            <motion.div
              {...fadeUp}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-orange-500/30 bg-orange-500/10 backdrop-blur-md"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-sm font-medium tracking-wider text-orange-300 uppercase">
                Available for Projects
              </span>
            </motion.div>

            <motion.h1
              {...fadeUp}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[1.05]"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-400 to-orange-500">
                Software
              </span>
              <br />
              <span className="text-white">Developer</span>
              <span className="text-gray-600"> & </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">
                AI Builder
              </span>
            </motion.h1>

            <motion.p
              {...fadeUp}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="mt-8 text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed font-light"
            >
              I&apos;m <span className="text-white font-medium">Attique</span>, a{" "}
              <span className="text-orange-400">Full Stack Developer</span> &{" "}
              <span className="text-red-400">Software Builder</span>. I craft
              high-performance web apps and integrate{" "}
              <span className="text-orange-300">AI solutions</span> that solve
              real problems and scale with your business.
            </motion.p>

            <motion.div
              {...fadeUp}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-10 flex flex-wrap justify-center md:justify-start gap-5"
            >
              <Link
                href="#contact-section"
                className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl font-bold flex items-center gap-2 overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(249,115,22,0.4)] active:scale-95"
              >
                <span>Hire Me</span>
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href="/M.Attique-CV.pdf"
                download="Muhammad-Attique-CV.pdf"
                className="group px-8 py-4 bg-white/5 border border-white/15 rounded-2xl font-bold backdrop-blur-md hover:bg-white/10 hover:border-white/30 transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
              >
                <FiDownload className="text-orange-400" />
                <span>Download CV</span>
              </a>
            </motion.div>

            {/* Tech ticker */}
            <motion.div
              {...fadeUp}
              transition={{ delay: 0.65, duration: 0.5 }}
              className="mt-12 flex flex-wrap justify-center md:justify-start gap-3"
            >
              {["React", "Next.js", "TypeScript", "Node.js", "AI/ML", "Three.js"].map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-1.5 text-xs font-mono tracking-wider text-gray-400 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm"
                >
                  {tech}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right side - 3D layered portrait cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            className="w-full md:w-2/5 relative flex justify-center items-center"
          >
            {/* Background tilted card - darker abstract */}
            <motion.div
              animate={{ rotate: [-5, -3, -5] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-[300px] md:w-[350px] h-[400px] md:h-[450px] bg-gradient-to-br from-orange-900/40 via-red-900/30 to-black rounded-[2rem] border border-orange-500/20 backdrop-blur-xl shadow-2xl"
              style={{ transform: "rotate(-5deg) translateX(-30px) translateY(20px)" }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <Link
                  href="#projects-section"
                  className="px-6 py-3 bg-white/10 border border-white/20 rounded-xl font-bold backdrop-blur-md hover:bg-white/20 transition-all"
                >
                  Explore My Work
                </Link>
              </div>
            </motion.div>

            {/* Front portrait card */}
            <TiltCard intensity={16} glareColor="rgba(249,115,22,0.2)" className="w-full max-w-[380px] z-10">
              <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/15 bg-white/[0.03] backdrop-blur-xl shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
                {/* Glow behind photo */}
                <div className="absolute inset-0 bg-gradient-to-tr from-orange-600/30 via-transparent to-red-500/20" />
                <Image
                  src={protfolio}
                  alt="Attique - Portfolio"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Bottom gradient + label */}
                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-white font-bold text-lg">Muhammad Attique</p>
                  <p className="text-orange-300 text-sm">Full Stack Developer</p>
                </div>
              </div>
            </TiltCard>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-2 md:right-4 px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/15 text-xs font-bold tracking-wider text-orange-300 shadow-xl"
            >
              4+ YRS EXP
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
