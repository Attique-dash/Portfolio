"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import { motion, useScroll, useTransform } from "framer-motion";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import {
  FiMonitor, FiCode, FiLayers, FiImage, FiGithub, FiLinkedin,
  FiMail, FiPhoneCall, FiMapPin, FiSend, FiAward, FiCoffee, FiBriefcase
} from "react-icons/fi";
import { MdOutlineDesignServices } from "react-icons/md";
import { FaMobileScreen, FaTablet } from "react-icons/fa6";
import { TbCloudCog, TbBrandFiverr } from "react-icons/tb";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { sendEmail } from "@/utils/emailService";
import Chatbot from "@/components/Chatbot";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error("Please fill in all fields");
      return;
    }
    setIsSubmitting(true);
    try {
      const result = await sendEmail(formData);
      if (result.success) {
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        toast.error("Failed to send message.");
      }
    } catch {
      toast.error("An error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const { ref: counterRef, inView: counterInView } = useInView({ triggerOnce: true });
  const { ref: skillsRef } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-purple-500/30 overflow-x-hidden">
      <Toaster position="top-right" toastOptions={{ style: { background: "#111", color: "#fff", border: "1px solid #333" } }} />
      
      {/* Premium Background Ambience */}
      <motion.div style={{ y: backgroundY }} className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-purple-900/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-900/10 rounded-full blur-[140px]" />
      </motion.div>

      <Navbar />
      <Hero />

      {/* Modern Stats Section (Removed Happy Clients) */}
      <section ref={counterRef} className="py-20 relative z-10 border-y border-white/5 bg-white/[0.01]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { value: 25, label: "Projects Completed", icon: FiBriefcase, suffix: "+" },
              { value: 4, label: "Years Experience", icon: FiAward, suffix: "+" },
              { value: 650, label: "Cups of Coffee", icon: FiCoffee, suffix: "" },
              { value: 200, label: "K+ Lines of Code", icon: FiCode, suffix: "" },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center group">
                <div className="mb-4 p-3 rounded-2xl bg-white/5 group-hover:bg-purple-500/20 transition-colors">
                  <item.icon className="text-2xl text-purple-500" />
                </div>
                <div className="text-4xl font-bold tracking-tight">
                  {counterInView ? <CountUp end={item.value} duration={3} /> : 0}{item.suffix}
                </div>
                <div className="text-gray-500 text-xs uppercase tracking-[0.2em] mt-2 font-medium">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Projects />

      {/* Professional Experience Section (New Integration) */}
      <section className="py-32 relative z-10">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 tracking-tighter">Career <span className="text-purple-500">Timeline</span></h2>
          <div className="max-w-4xl space-y-12">
            {[
              { role: "Full Stack Developer", company: "Freelance / Fiverr", date: "2022 - Present", desc: "Building scalable web & mobile apps for global clients using Next.js and React Native." },
              { role: "UI/UX Designer", company: "Medical Web Solutions", date: "2021 - 2022", desc: "Designed intuitive healthcare dashboards, focusing on patient-doctor interactions." },
              { role: "Frontend Developer Intern", company: "Tech Pioneers", date: "2020 - 2021", desc: "Collaborated on responsive design implementations and cross-browser optimization." }
            ].map((exp, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="relative pl-10 border-l border-white/10 group"
              >
                <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-purple-500 shadow-[0_0_10px_#a855f7]" />
                <span className="text-purple-400 font-mono text-sm">{exp.date}</span>
                <h3 className="text-2xl font-semibold mt-1 group-hover:text-purple-400 transition-colors">{exp.role}</h3>
                <p className="text-gray-400 font-medium">{exp.company}</p>
                <p className="text-gray-500 mt-4 leading-relaxed max-w-2xl">{exp.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Bento Grid (All Original Skills Included) */}
      <section ref={skillsRef} id="skills-section" className="py-32 bg-white/[0.02]">
        <div className="container mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">Technical <span className="text-purple-500">Expertise</span></h2>
            <p className="text-gray-400 mt-4">A comprehensive look at my development stack.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { name: "React / Native", percent: 85, color: "bg-cyan-400", span: "md:col-span-2" },
              { name: "Next JS", percent: 89, color: "bg-white", span: "col-span-1" },
              { name: "TypeScript", percent: 86, color: "bg-blue-600", span: "col-span-1" },
              { name: "Node.js", percent: 82, color: "bg-green-500", span: "col-span-1" },
              { name: "MongoDB", percent: 85, color: "bg-emerald-600", span: "col-span-1" },
              { name: "Tailwind", percent: 94, color: "bg-sky-400", span: "md:col-span-2" },
              { name: "Python", percent: 81, color: "bg-yellow-500", span: "col-span-1" },
              { name: "Firebase", percent: 88, color: "bg-orange-500", span: "col-span-1" },
              { name: "Express.js", percent: 83, color: "bg-gray-400", span: "col-span-1" },
            ].map((skill, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className={`${skill.span} p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-purple-500/40 transition-all group`}
              >
                <div className="flex justify-between items-end mb-6">
                  <span className="text-lg font-semibold">{skill.name}</span>
                  <span className="text-gray-500 font-mono">{skill.percent}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.percent}%` }}
                    transition={{ duration: 1.5, ease: "circOut" }}
                    className={`h-full ${skill.color}`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section (All 8 Original Services Included) */}
      <section id="services-section" className="py-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold tracking-tight">Services</h2>
            <p className="text-gray-500 mt-4">Full-cycle digital product development.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Web Design", icon: FiMonitor, desc: "Modern, responsive, and visually stunning website designs." },
              { name: "Web Application", icon: FiCode, desc: "Scalable full-stack web applications with clean architecture." },
              { name: "Web Development", icon: FiLayers, desc: "High-performance frontend and backend development." },
              { name: "Banner Design", icon: FiImage, desc: "Eye-catching banners that boost engagement." },
              { name: "UI/UX Design", icon: MdOutlineDesignServices, desc: "Intuitive interfaces that users love." },
              { name: "Mobile App", icon: FaMobileScreen, desc: "Cross-platform mobile apps for iOS and Android." },
              { name: "API Integration", icon: TbCloudCog, desc: "Seamless third-party service integration." },
              { name: "Responsive Design", icon: FaTablet, desc: "Flawless experience on all devices." },
            ].map((service, i) => (
              <div key={i} className="group p-8 rounded-[2rem] bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 hover:border-purple-500/30 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6 group-hover:bg-purple-500 group-hover:text-white transition-all">
                  <service.icon className="text-xl" />
                </div>
                <h3 className="text-xl font-bold mb-3">{service.name}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Contact Section */}
      <section id="contact-section" className="py-32">
        <div className="container mx-auto px-6">
          <div className="bg-[#0a0a0a] border border-white/10 rounded-[3rem] overflow-hidden grid lg:grid-cols-2">
            <div className="p-12 lg:p-20 bg-gradient-to-br from-purple-900/20 to-transparent">
              <h2 className="text-5xl font-bold tracking-tighter mb-8 leading-tight">Let&apos;s build the <br/><span className="text-purple-500">Next Big Thing.</span></h2>
              <div className="space-y-8">
                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-xl group-hover:bg-purple-500 transition-all"><FiMail /></div>
                  <div>
                    <p className="text-gray-500 text-xs uppercase tracking-widest">Email Me</p>
                    <p className="text-lg">attiqueshafeeq246@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-xl group-hover:bg-blue-500 transition-all"><FiPhoneCall /></div>
                  <div>
                    <p className="text-gray-500 text-xs uppercase tracking-widest">Call Me</p>
                    <p className="text-lg">+92-3244771036</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-xl group-hover:bg-green-500 transition-all"><FiMapPin /></div>
                  <div>
                    <p className="text-gray-500 text-xs uppercase tracking-widest">Location</p>
                    <p className="text-lg">Lahore, Pakistan</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-12 lg:p-20 border-l border-white/10">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-gray-500 ml-1">Name</label>
                    <input name="name" onChange={handleChange} value={formData.name} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-purple-500 transition" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-gray-500 ml-1">Email</label>
                    <input name="email" onChange={handleChange} value={formData.email} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-purple-500 transition" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-gray-500 ml-1">Subject</label>
                  <input name="subject" onChange={handleChange} value={formData.subject} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-purple-500 transition" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-gray-500 ml-1">Message</label>
                  <textarea name="message" onChange={handleChange} value={formData.message} rows={4} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-purple-500 transition resize-none" />
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full bg-white text-black font-bold py-5 rounded-2xl hover:bg-purple-600 hover:text-white transition-all flex items-center justify-center gap-3">
                  {isSubmitting ? "Sending..." : "Send Message"} <FiSend />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Chatbot />
      
      <footer className="py-12 border-t border-white/5 text-center">
        <div className="container mx-auto px-6">
          <div className="flex justify-center gap-6 mb-8">
            <a href="https://github.com/Attique-dash" target="_blank" className="p-3 bg-white/5 rounded-full hover:text-purple-500 transition"><FiGithub size={20}/></a>
            <a href="https://www.linkedin.com/in/attique-muhammad-attique-835474368/" target="_blank" className="p-3 bg-white/5 rounded-full hover:text-blue-500 transition"><FiLinkedin size={20}/></a>
            <a href="https://www.fiverr.com/attique110" target="_blank" className="p-3 bg-white/5 rounded-full hover:text-green-500 transition"><TbBrandFiverr size={22}/></a>
          </div>
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Muhammad Attique. Built with Next.js & Framer Motion.</p>
        </div>
      </footer>
    </div>
  );
}