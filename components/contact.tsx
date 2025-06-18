import { motion } from 'framer-motion';
import { GrLocation } from "react-icons/gr";
import { HiOutlineMail } from "react-icons/hi";
import { FiPhoneCall } from "react-icons/fi";
import { toast, Toaster } from 'react-hot-toast';
import { FaUser } from "react-icons/fa";
import { MdSubject } from "react-icons/md";
import { FaMessage } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { sendEmail } from '@/utils/emailService';
import { useState } from 'react';

export default function Hero() {

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
        } catch {
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


    return (
        <div>
     {/* Contact Section */}
     <motion.section id="contact-section" className="bg-white dark:bg-gray-900 py-20" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
     <Toaster position="top-center" />
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="dark:text-white text-yellow-500 font-semibold tracking-widest uppercase">Contact us</span>
            <h2 className="text-4xl font-extrabold mt-2 mb-2 text-gray-900 dark:text-yellow-500">Have a Project?</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
            Got an idea? We build smart and creative websites or apps — email, call, or message us to get started!
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md text-gray-700 dark:text-gray-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="w-full px-4 py-3 border text-gray-600 dark:border-black pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300 dark:bg-gray-700 dark:text-gray-300"
                  />
                  <span className="absolute left-2 top-3 text-black dark:text-white text-xl"><FaUser /></span>
                </div>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    className="w-full pl-10 px-4 py-3 text-gray-600 border dark:border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300 dark:bg-gray-700 dark:text-gray-300"
                  />
                  <span className="absolute left-2 top-3 text-black dark:text-white text-2xl"><MdEmail /></span>
                </div>
              </div>
              <div className="relative mt-6">
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  className="w-full px-4 py-3 pl-10 text-gray-600 border dark:border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300 dark:bg-gray-700 dark:text-gray-300"
                />
                <span className="absolute left-2 top-3 text-black dark:text-white text-2xl"><MdSubject /></span>
              </div>
              <div className="relative mt-6">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Message"
                  rows={7}
                  className="w-full dark:border-black text-gray-600 px-4 py-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300 dark:bg-gray-700 dark:text-gray-300"
                ></textarea>
                <span className="absolute left-2 top-3 text-black dark:text-white text-xl"><FaMessage /></span>
              </div>
              <button 
                type="submit"
                className="w-full cursor-pointer bg-gray-500 text-white dark:bg-white dark:text-black text-white px-8 py-3 rounded-lg mt-6 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
               Send Message
              </button>
            </form>
            <div className="space-y-6 p-8">
              <div className="flex items-center space-x-4">
                <span className="dark:bg-white text-white bg-gray-500 dark:text-black text-white p-3 text-xl rounded-full">
                  <GrLocation />
                </span>
                <div>
                  <p className="font-semibold dark:text-yellow-500">Address:</p>
                  <p className="text-gray-600 dark:text-gray-300">Education Town, Whadat Road Lahore, Pakistan</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="dark:bg-white text-white bg-gray-500 dark:text-black text-white p-3 text-xl rounded-full">
                  <HiOutlineMail />
                </span>
                <div>
                  <p className="font-semibold dark:text-yellow-500">Email:</p>
                  <p className="text-gray-600 dark:text-gray-300">attiqueshafeeq246@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="dark:bg-white text-white bg-gray-500 dark:text-black text-white p-3 text-xl rounded-full">
                  <FiPhoneCall />
                </span>
                <div>
                  <p className="font-semibold dark:text-yellow-500">Phone:</p>
                  <p className="text-gray-600 dark:text-gray-300">+92-3244771036</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
        </div>
    );
}
