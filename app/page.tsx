"use client"
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero"
import Projects from "@/components/Projects"
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { fadeInUp, staggerContainer } from "@/lib/animations";
import Skill from "@/components/skills";
import Servies from "@/components/Services";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import Chat from "@/components/Chatbot";

export default function Home() {
  return (
    <div className="overflow-x-hidden bg-white dark:bg-gray-900">
      <Navbar />
      <Hero />
      <Chat />
      <Projects />
      <motion.section className="bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 overflow-x-hidden" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
        <div className="container mx-auto px-4">
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            variants={staggerContainer}
          >
            {[
              { value: 20, label: ' Plus Project Complete' },
              { value: 50, label: 'Plus Cups of coffee' },
              { value: 4, label: 'Years experienced' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md text-center transform hover:scale-105 transition-transform duration-300"
              >
                <div className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-2">
                  <CountUp end={item.value} duration={2} />
                </div>
                <div className="text-sm sm:text-base text-gray-600 dark:text-gray-300">{item.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>
      <Skill />
      <Servies />
      <Contact />
      <Footer />
    </div>
  );
}
