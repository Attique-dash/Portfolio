"use client";
import Image from "next/image";
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { FiMonitor, FiCode, FiLayers, FiImage } from 'react-icons/fi';
import { MdOutlineDesignServices } from 'react-icons/md';
import { FaMobileScreen } from 'react-icons/fa6';
import { TbCloudCog } from 'react-icons/tb';
import { IconType } from 'react-icons';
import { FaTabletAlt } from "react-icons/fa";
import { GrLocation } from "react-icons/gr";
import { HiOutlineMail } from "react-icons/hi";
import { FiPhoneCall } from "react-icons/fi";
import { FaGithub } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { TbBrandFiverr } from "react-icons/tb";
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { FaUser } from "react-icons/fa";
import { MdSubject } from "react-icons/md";
import { FaMessage } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { sendEmail } from '@/utils/emailService';
import { FaDownload } from "react-icons/fa";
import Chatbot from '@/components/Chatbot';
import portfolio1 from '../../public/Images/PImage2.png'
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error('Please fill in all fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    try {
      const result = await sendEmail(formData);
      if (result.success) {
        toast.success('Message sent successfully!');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        toast.error('Failed to send message. Please try again.');
      }
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };
  const fadeInLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7 } },
  };
  const fadeInRight = {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7 } },
  };

  const { ref: skillsRef, inView: skillsInView } = useInView({ triggerOnce: true, threshold: 0.3 });

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    const element = document.querySelector(target);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDownloadCV = (e: React.MouseEvent) => {
    router.push('/cv')
    e.preventDefault();
    const link = document.createElement('a');
    link.href = '/m.attique-cv.pdf';
    link.download = 'm.attique-cv.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Projects />
      <Chatbot />
      
      {/* Counter Section */}
      <motion.section className="bg-gray-100 py-20" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { value: 20, label: ' Plus Project Complete' },
              { value: 50, label: 'Plus Cups of coffee' },
              { value: 4, label: 'Years experienced' },
            ].map((item, idx) => (
              <motion.div key={idx} className="bg-white p-6 rounded-lg shadow-md text-center" variants={idx % 2 === 0 ? fadeInLeft : fadeInRight}>
                <div className="text-4xl font-bold text-blue-500 mb-2">
                  <CountUp end={item.value} duration={2} />
                </div>
                <div className="text-gray-600">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section 
        id="about-section" 
        className="scroll-mt-20" 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true }} 
        variants={fadeInUp}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div className="relative" variants={fadeInLeft}>
              <div className="relative w-full h-[500px] md:h-[600px]">
                <Image
                  src={portfolio1}
                  alt="About"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>
            <motion.div className="space-y-6" variants={fadeInRight}>
              <span className="text-blue-500 font-semibold tracking-widest uppercase">My Intro</span>
              <h2 className="text-3xl font-bold">About Me</h2>
              <p className="text-gray-500">
                I&apos;m a BS Computer Science student at Superior University with a passion for AI, web development, and creative UI/UX. I love building smart, user-friendly applications that solve real-world problems and help people in meaningful ways.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={handleDownloadCV}
                  className="inline-flex items-center cursor-pointer gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <FaDownload />
                  Download CV
                </button>
              </div>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span className="font-semibold">Name:</span>
                  <span className="text-blue-400">Muhammad Attique</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-semibold">Date of birth:</span>
                  <span className="text-blue-400">June 17, 2004</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-semibold">Address:</span>
                  <span className="text-blue-400">Education Town, Whadat Road Lahore, Pakistan</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-semibold">Email:</span>
                  <span className="text-blue-400">attiqueshafeeq246@gmail.com</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-semibold">Phone:</span>
                  <span className="text-blue-400">+92-3244771036</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Skills Section */}
      <motion.section
        ref={skillsRef}
        id="skills-section"
        className="bg-gray-100 py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-blue-500 font-semibold tracking-widest uppercase">Skills</span>
            <h2 className="text-4xl font-extrabold mt-2 mb-2 text-gray-900">My Skills</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
            Skilled in building full-stack web applications with a focus on clean UI/UX, performance, and real-world functionality.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              { name: 'React/React Native', percent: 85 },
              { name: 'Next JS', percent: 89 },
              { name: 'TypeScript', percent: 86 },
              { name: 'Node.js', percent: 82 },
              { name: 'Express.js', percent: 83 },
              { name: 'MongoDB', percent: 85 },
              { name: 'Python', percent: 81 },
              { name: 'Firebase', percent: 88 },
              { name: 'Tailwind', percent: 94 },
            ].map((skill, idx) => {
              const progress = skillsInView ? skill.percent : 0;
              return (
                <motion.div key={idx} className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center" variants={fadeInUp}>
                  <div className="relative mb-4 w-24 h-24 flex items-center justify-center">
                    <svg className="absolute top-0 left-0 w-24 h-24" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="45" stroke="#e5e7eb" strokeWidth="10" fill="none" />
                      <motion.circle
                        cx="50"
                        cy="50"
                        r="45"
                        stroke="#bfc2a8"
                        strokeWidth="10"
                        fill="none"
                        strokeDasharray={2 * Math.PI * 45}
                        strokeDashoffset={2 * Math.PI * 45 * (1 - progress / 100)}
                        strokeLinecap="round"
                        transition={{ duration: 1.5, delay: 0.2 * idx }}
                      />
                    </svg>
                    <span className="absolute text-2xl font-bold text-blue-500">
                      {skillsInView ? <CountUp end={skill.percent} duration={1.5} /> : 0}%
                    </span>
                  </div>
                  <div className="text-lg font-bold text-gray-900">{skill.name}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* Services Section */}
      <motion.section id="services-section" className="py-20" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-blue-500 font-semibold tracking-widest uppercase">I'm great at</span>
            <h2 className="text-4xl font-extrabold mt-2 mb-2 text-white">We do awesome services for our clients</h2>
            <p className="text-gray-400 max-w-xl mx-auto">
            Delivering awesome services including
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: 'Web Design', desc: 'Crafting clean, modern, and visually engaging website layouts tailored to your brand.', icon: 'FiMonitor' },
              { name: 'Web Application', desc: 'Building interactive, scalable web apps that solve real-world problems efficiently.', icon: 'FiCode' },
              { name: 'Web Development', desc: 'Full-stack development using the latest technologies to bring ideas to life online.', icon: 'FiLayers' },
              { name: 'Banner Design', desc: 'Creating impactful banner visuals that capture attention and enhance user engagement.', icon: 'FiImage' },
              { name: 'UI/UX Design', desc: 'Designing intuitive user interfaces and seamless experiences for maximum usability.', icon: 'MdOutlineDesignServices' },
              { name: 'Mobile App Development', desc: 'Developing responsive, cross-platform mobile apps that meet user needs on the go.', icon: 'FaMobileScreen' },
              { name: 'API Integration', desc: 'Connecting your app with third-party services for enhanced features and automation.', icon: 'TbCloudCog' },
              { name: 'Responsive Design', desc: 'Ensuring your website looks and performs great on all screen sizes and devices.', icon: 'FaTabletAlt' },
            ].map((service, idx) => {
              const Icon: IconType = {
                FiMonitor,
                FiCode,
                FiLayers,
                FiImage,
                MdOutlineDesignServices,
                FaMobileScreen,
                TbCloudCog,
                FaTabletAlt
              }[service.icon] as IconType;
              return (
                <motion.div key={idx} className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-start relative" variants={fadeInUp}>
                  <div className="absolute -top-6 -left-6 bg-[#bfc2a8] p-3 rounded-full shadow-md">
                    <Icon className="text-blue-500 text-2xl" />
                  </div>
                  <div className="text-lg font-bold text-blue-500 mb-2 mt-4">{service.name}</div>
                  <div className="text-gray-700 text-sm">{service.desc}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section id="contact-section" className="bg-gray-100 py-20" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-blue-500 font-semibold tracking-widest uppercase">Contact us</span>
            <h2 className="text-4xl font-extrabold mt-2 mb-2 text-gray-900">Have a Project?</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
            Got an idea? We build smart and creative websites or apps — email, call, or message us to get started!
</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md text-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="w-full px-4 py-3 border border-blue-500 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                  <span className="absolute left-2 top-3 text-blue-500 text-xl"><FaUser  /></span>
                </div>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    className="w-full pl-10 px-4 py-3 border border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                  <span className="absolute left-2 top-3 text-blue-500 text-2xl"><MdEmail  /> </span>
                </div>
              </div>
              <div className="relative mt-6">
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  className="w-full px-4 py-3 pl-10 border border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
                <span className="absolute left-2 top-3 text-blue-500 text-2xl"><MdSubject  /></span>
              </div>
              <div className="relative mt-6">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Message"
                  rows={7}
                  className="w-full border-blue-500 px-4 py-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                ></textarea>
                <span className="absolute left-2 top-3 text-blue-500 text-xl"><FaMessage  /></span>
              </div>
              <button 
                type="submit"
                className="w-full cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg mt-6 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
               Send Message
              </button>
            </form>
            <div className="space-y-6  p-8">
              <div className="flex items-center space-x-4">
                <span className="bg-[#bfc2a8] text-white p-3 text-xl rounded-full">
                <GrLocation />
                </span>
                <div>
                  <p className="font-semibold text-blue-500">Address:</p>
                  <p className="text-gray-600">ibarra street Education Town, Whadat Road Lahore, Pakistan</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="bg-[#bfc2a8] text-white p-3 text-xl rounded-full">
                <HiOutlineMail />
                </span>
                <div>
                  <p className="font-semibold text-blue-500">Email:</p>
                  <p className="text-gray-600">attiqueshafeeq246@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="bg-[#bfc2a8] text-white p-3 text-xl rounded-full">
                <FiPhoneCall />
                </span>
                <div>
                  <p className="font-semibold text-blue-500">Phone:</p>
                  <p className="text-gray-600">+92-3244771036</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 md:grid-cols-3 gap-8">
            <div className="content-center">
              <h3 className="text-xl font-bold mb-4 text-gray-400">Let's work together</h3>
            <p>Have an idea or project in mind? I'd love to help you build it — from websites to smart AI tools.
            </p>
            </div>
            <div className="text-center">
              <h2 className="text-xl font-bold mb-4 text-gray-400">Quick Links</h2>
              <a href="#home-section" onClick={(e) => handleScroll(e, 'home-section')} className="block mb-1 hover:text-blue-500 transition-colors duration-300">Home</a>
              <a href="#about-section" onClick={(e) => handleScroll(e, 'about-section')} className="block mb-1 hover:text-blue-500 transition-colors duration-300">About</a>
              <a href="#projects-section" onClick={(e) => handleScroll(e, 'projects-section')} className="block mb-1 hover:text-blue-500 transition-colors duration-300">Projects</a>
              <a href="#services-section" onClick={(e) => handleScroll(e, 'services-section')} className="block mb-1 hover:text-blue-500 transition-colors duration-300">Services</a>
              <a href="#contact-section" onClick={(e) => handleScroll(e, 'contact-section')} className="block mb-1 hover:text-blue-500 transition-colors duration-300">Contact</a>
            </div>
            <div className="text-center">
              <h2 className="text-xl font-bold mb-4 text-gray-400">Contact</h2>
              <p className="mb-2"><span className="font-semibold">Email : </span>attiqueshafeeq246@example.com</p>
              <p className="mb-2"><span className="font-semibold">Phone : </span>+92-3244771036</p>
              <p><span className="font-semibold">Location : </span>ibarra street Education Town, Whadat Road Lahore, Pakistan</p>
            </div>
          </div>
          <div className="mt-5 text-center">
            <h2 className="text-xl font-bold text-gray-400">Stay Connected</h2>
             <div className="flex justify-center mt-5">
                <a href="https://github.com/Attique-dash" target="_blank" rel="noopener noreferrer" className="px-3 justify-items-center cursor-pointer hover:text-blue-500 transition-colors duration-300">
                  <FaGithub className="text-xl" />
                  <h3 className="mt-2">GitHub</h3>
                </a>
                <a href="https://www.linkedin.com/in/attique-muhammad-attique-835474368/" target="_blank" rel="noopener noreferrer" className="px-3 justify-items-center cursor-pointer hover:text-blue-500 transition-colors duration-300">
                  <FaLinkedin className="text-xl" />
                  <h3 className="mt-2">LinkedIn</h3>
                </a>
                <a href="https://www.fiverr.com/attique110?public_mode=true" target="_blank" rel="noopener noreferrer" className="px-3 justify-items-center cursor-pointer hover:text-blue-500 transition-colors duration-300">
                  <TbBrandFiverr className="text-xl" />
                  <h3 className="mt-2">Fiverr</h3>
                </a>
             </div>
            </div>
          <div className="border-t border-gray-800 mt-6 text-center text-gray-400">
            <p className="mt-10">
               © {new Date().getFullYear()} Muhammad Attique. All rights reserved | Built with using Next.js, Tailwind CSS & OpenAI API.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
