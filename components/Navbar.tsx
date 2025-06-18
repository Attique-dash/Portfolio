'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useActiveSection } from '@/hooks/useActiveSection';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeSection = useActiveSection();

  // Hide border on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'border-none shadow-md' : 'border-b-2'
      } text-white bg-white dark:bg-gray-900 border-gray-900 dark:border-yellow-500 shadow-md shadow-gray-500 dark:shadow-yellow-500`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="text-2xl font-extrabold text-gray-900 dark:text-white">
            M <span className="text-yellow-500">.</span> Attique
          </Link>

          {/* Hamburger */}
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="space-y-1 dark:text-white text-black">
              <span className="block w-6 h-0.5 bg-current"></span>
              <span className="block w-6 h-0.5 bg-current"></span>
              <span className="block w-6 h-0.5 bg-current"></span>
            </div>
          </button>

          {/* Links */}
          <div
            className={`${
              isMenuOpen
                ? 'max-h-screen border-b-2 border-black dark:border-white mt-1'
                : 'max-h-0'
            } 
            md:max-h-none overflow-hidden md:flex md:space-x-8 absolute md:relative top-full left-0 w-full md:w-auto 
            bg-white dark:bg-gray-900 transition-all duration-500 ease-in-out md:transition-none md:p-0`}
            
          >
            {[
              { id: 'home-section', label: 'Home' },
              { id: 'skills-section', label: 'Skills' },
              { id: 'services-section', label: 'Services' },
              { id: 'projects-section', label: 'Projects' },
              { id: 'contact-section', label: 'Contact' },
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleScrollTo(e, item.id)}
                className={`block md:inline-block dark:hover:text-white dark:text-yellow-400 text-gray-800 hover:text-gray-900 py-2 px-2 md:py-0 transition-all duration-300 rounded-lg ${
                  activeSection === item.id
                    ? 'text-yellow-500 dark:text-white border-b-2 dark:border-white border-yellow-500 font-semibold'
                    : ''
                }`}
              >
                {item.label}
              </a>
            ))}

            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
