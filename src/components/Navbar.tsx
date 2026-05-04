"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useActiveSection } from '@/hooks/useActiveSection';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeSection = useActiveSection();

  // Handle background change on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80; // Account for fixed navbar height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsMenuOpen(false);
    }
  };

  const navLinks = [
    { name: 'Home', id: 'home-section' },
    { name: 'Projects', id: 'projects-section' },
    { name: 'Skills', id: 'skills-section' },
    { name: 'Services', id: 'services-section' },
    { name: 'Contact', id: 'contact-section' },
  ];

  return (
    <nav 
      className={`fixed w-full z-[100] transition-all duration-500 px-6 py-4 ${
        scrolled ? 'top-4' : 'top-0'
      }`}
    >
      <div 
        className={`container mx-auto max-w-6xl transition-all duration-500 rounded-2xl border ${
          scrolled 
          ? 'bg-black/60 backdrop-blur-xl border-white/10 shadow-2xl py-3 px-8' 
          : 'bg-transparent border-transparent py-5 px-4'
        }`}
      >
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2">
            <span className="text-2xl font-black tracking-tighter text-white">
              M<span className="text-blue-500 group-hover:text-purple-500 transition-colors">.</span>ATTIQUE
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleScrollTo(e, link.id)}
                className={`relative px-4 py-2 text-sm font-medium tracking-wide transition-all duration-300 rounded-lg hover:bg-white/5 ${
                  activeSection === link.id ? 'text-blue-400' : 'text-gray-400 hover:text-white'
                }`}
              >
                {link.name}
                {activeSection === link.id && (
                  <motion.div 
                    layoutId="activeNav"
                    className="absolute bottom-0 left-4 right-4 h-0.5 bg-blue-500 rounded-full"
                  />
                )}
              </a>
            ))}
            <a 
              href="#contact-section" 
              onClick={(e) => handleScrollTo(e, 'contact-section')}
              className="ml-4 px-5 py-2 bg-white text-black text-sm font-bold rounded-xl hover:bg-blue-500 hover:text-white transition-all active:scale-95"
            >
              Let&apos;s Talk
            </a>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden p-2 text-white bg-white/5 rounded-lg border border-white/10"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-24 left-6 right-6 p-6 bg-[#0a0a0a] border border-white/10 rounded-3xl md:hidden z-[101] shadow-2xl"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleScrollTo(e, link.id)}
                  className={`text-lg font-semibold p-2 rounded-xl transition-colors ${
                    activeSection === link.id ? 'bg-blue-500/10 text-blue-400' : 'text-gray-400'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}