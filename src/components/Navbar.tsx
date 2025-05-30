"use client";
import Link from 'next/link';
import { useState } from 'react';
import { useActiveSection } from '@/hooks/useActiveSection';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const activeSection = useActiveSection();

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="fixed w-full z-50 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-2xl font-bold">
            M <span className="text-blue-500">.</span> Attique
          </Link>
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="block w-6 h-0.5 bg-white mb-1"></span>
            <span className="block w-6 h-0.5 bg-white mb-1"></span>
            <span className="block w-6 h-0.5 bg-white"></span>
          </button>
          <div className={`${isMenuOpen ? 'block' : 'hidden'} md:flex md:space-x-8 absolute md:relative top-full left-0 w-full md:w-auto bg-gray-900 md:bg-transparent p-4 md:p-0`}>
            <a href="#home-section" onClick={(e) => handleScroll(e, 'home-section')} className={`block md:inline-block py-2 md:py-0 transition-all duration-300 ${activeSection === 'home-section' ? 'border-b-2 border-blue-500 text-blue-500' : 'hover:text-blue-500'}`}>Home</a>
            <a href="#about-section" onClick={(e) => handleScroll(e, 'about-section')} className={`block md:inline-block py-2 md:py-0 transition-all duration-300 ${activeSection === 'about-section' ? 'border-b-2 border-blue-500 text-blue-500' : 'hover:text-blue-500'}`}>About</a>
            <a href="#skills-section" onClick={(e) => handleScroll(e, 'skills-section')} className={`block md:inline-block py-2 md:py-0 transition-all duration-300 ${activeSection === 'skills-section' ? 'border-b-2 border-blue-500 text-blue-500' : 'hover:text-blue-500'}`}>Skills</a>
            <a href="#services-section" onClick={(e) => handleScroll(e, 'services-section')} className={`block md:inline-block py-2 md:py-0 transition-all duration-300 ${activeSection === 'services-section' ? 'border-b-2 border-blue-500 text-blue-500' : 'hover:text-blue-500'}`}>Services</a>
            <a href="#projects-section" onClick={(e) => handleScroll(e, 'projects-section')} className={`block md:inline-block py-2 md:py-0 transition-all duration-300 ${activeSection === 'projects-section' ? 'border-b-2 border-blue-500 text-blue-500' : 'hover:text-blue-500'}`}>Projects</a>
            <a href="#contact-section" onClick={(e) => handleScroll(e, 'contact-section')} className={`block md:inline-block py-2 md:py-0 transition-all duration-300 ${activeSection === 'contact-section' ? 'border-b-2 border-blue-500 text-blue-500' : 'hover:text-blue-500'}`}>Contact</a>
          </div>
        </div>
      </div>
    </nav>
  );
} 