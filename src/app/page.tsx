"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import TiltCard from "@/components/TiltCard";
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
import { MdOutlineDesignServices } from "react-icons/md";
import { FaMobileScreen, FaTablet } from "react-icons/fa6";
import { TbCloudCog, TbBrandFiverr } from "react-icons/tb";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { sendEmail } from "@/utils/emailService";
import Chatbot from "@/components/Chatbot";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

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
    <div className="min-h-screen bg-[#050505] text-white selection:bg-orange-500/40 overflow-x-hidden">
      <Toaster position="top-right" toastOptions={{ style: { background: "#111", color: "#fff", border: "1px solid #333" } }} />

      {/* Ambient background */}
      <motion.div style={{ y: backgroundY }} className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-orange-900/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-red-900/10 rounded-full blur-[140px]" />
      </motion.div>

      <Navbar />
      <Hero />

      {/* ===== LIGHT SECTION: Stats ===== */}
      <section ref={counterRef} className="py-20 relative z-10 bg-[#f4f4f8] text-gray-900">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: 25, label: "Projects Completed", icon: FiBriefcase, suffix: "+" },
              { value: 4, label: "Years Experience", icon: FiAward, suffix: "+" },
              { value: 650, label: "Cups of Coffee", icon: FiCoffee, suffix: "" },
              { value: 200, label: "K+ Lines of Code", icon: FiCode, suffix: "" },
            ].map((item, idx) => (
              <TiltCard key={idx} intensity={12} glare={true} glareColor="rgba(249,115,22,0.15)" className="rounded-3xl bg-white border border-gray-200 shadow-sm p-8 text-center">
                <div className="mb-4 inline-flex p-3 rounded-2xl bg-orange-50 text-orange-600">
                  <item.icon className="text-2xl" />
                </div>
                <div className="text-4xl font-black tracking-tight">
                  {counterInView ? <CountUp end={item.value} duration={3} /> : 0}{item.suffix}
                </div>
                <div className="text-gray-400 text-xs uppercase tracking-[0.2em] mt-2 font-semibold">{item.label}</div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      <Projects />

      {/* ===== LIGHT SECTION: Experience ===== */}
      <section className="py-32 relative z-10 bg-[#f4f4f8] text-gray-900">
        <div className="container mx-auto px-6">
          <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="mb-16">
            <span className="text-orange-600 font-mono text-sm tracking-[0.3em] uppercase">Career Path</span>
            <h2 className="text-4xl md:text-6xl font-black mt-4 tracking-tighter">
              Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">Timeline</span>
            </h2>
          </motion.div>

          <div className="max-w-4xl space-y-10">
            {[
              { role: "Full Stack Developer", company: "Freelance / Fiverr", date: "2022 - Present", desc: "Building scalable web & mobile apps for global clients using Next.js and React Native." },
              { role: "UI/UX Designer", company: "Medical Web Solutions", date: "2021 - 2022", desc: "Designed intuitive healthcare dashboards, focusing on patient-doctor interactions." },
              { role: "Frontend Developer Intern", company: "Tech Pioneers", date: "2020 - 2021", desc: "Collaborated on responsive design implementations and cross-browser optimization." }
            ].map((exp, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="relative pl-10 border-l-2 border-orange-200"
              >
                <div className="absolute left-[-7px] top-1 w-3 h-3 rounded-full bg-orange-600 shadow-[0_0_12px_rgba(249,115,22,0.5)]" />
                <span className="text-orange-600 font-mono text-sm font-semibold">{exp.date}</span>
                <h3 className="text-2xl font-bold mt-1">{exp.role}</h3>
                <p className="text-orange-500 font-medium">{exp.company}</p>
                <p className="text-gray-500 mt-3 leading-relaxed max-w-2xl">{exp.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== DARK SECTION: Skills Bento ===== */}
      <section ref={skillsRef} id="skills-section" className="py-32 relative z-10 bg-[#07070f]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />
        <div className="container mx-auto px-6">
          <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="mb-16">
            <span className="text-orange-400 font-mono text-sm tracking-[0.3em] uppercase">Tech Stack</span>
            <h2 className="text-4xl md:text-6xl font-black mt-4 tracking-tighter">
              Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">Expertise</span>
            </h2>
            <p className="text-gray-500 mt-4">A comprehensive look at my development stack.</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { name: "React / Native", percent: 85, color: "bg-orange-400", span: "md:col-span-2" },
              { name: "Next.js", percent: 89, color: "bg-white", span: "col-span-1" },
              { name: "TypeScript", percent: 86, color: "bg-blue-500", span: "col-span-1" },
              { name: "Node.js", percent: 82, color: "bg-green-500", span: "col-span-1" },
              { name: "MongoDB", percent: 85, color: "bg-emerald-500", span: "col-span-1" },
              { name: "Tailwind", percent: 94, color: "bg-orange-300", span: "md:col-span-2" },
              { name: "Python", percent: 81, color: "bg-yellow-400", span: "col-span-1" },
              { name: "Firebase", percent: 88, color: "bg-orange-400", span: "col-span-1" },
              { name: "Express.js", percent: 83, color: "bg-gray-400", span: "col-span-1" },
            ].map((skill, idx) => (
              <motion.div
                key={idx}
                {...fadeUp}
                transition={{ delay: Math.min(idx * 0.05, 0.2), duration: 0.4 }}
                className={`${skill.span}`}
              >
                <TiltCard
                  intensity={8}
                  glareColor="rgba(249,115,22,0.12)"
                  className="h-full p-7 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-orange-500/30 transition-colors duration-300"
                >
                  <div className="flex justify-between items-end mb-6">
                    <span className="text-lg font-semibold">{skill.name}</span>
                    <span className="text-gray-500 font-mono text-sm">{skill.percent}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.percent}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: "circOut", delay: 0.2 }}
                      className={`h-full ${skill.color} rounded-full`}
                    />
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== LIGHT SECTION: Services ===== */}
      <section id="services-section" className="py-32 relative z-10 bg-[#f4f4f8] text-gray-900">
        <div className="container mx-auto px-6">
          <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="text-center mb-20">
            <span className="text-orange-600 font-mono text-sm tracking-[0.3em] uppercase">What I Do</span>
            <h2 className="text-5xl md:text-6xl font-black tracking-tight mt-4">Services</h2>
            <p className="text-gray-500 mt-4">Full-cycle digital product development.</p>
          </motion.div>

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
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ delay: Math.min(i * 0.05, 0.3), duration: 0.45 }}
              >
                <TiltCard
                  intensity={10}
                  glareColor="rgba(249,115,22,0.15)"
                  className="h-full p-8 rounded-[2rem] bg-white border border-gray-200 shadow-sm hover:shadow-xl hover:border-orange-300 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center mb-6 text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-all">
                    <service.icon className="text-xl" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{service.name}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{service.desc}</p>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== DARK SECTION: Contact ===== */}
      <section id="contact-section" className="py-32 relative z-10 bg-[#050505]">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />
        <div className="container mx-auto px-6">
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6 }}
            className="relative rounded-[3rem] overflow-hidden border border-white/10 bg-gradient-to-br from-orange-950/60 via-[#0a0a14] to-[#050505]"
          >
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-orange-600/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-red-500/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="grid lg:grid-cols-2 relative z-10">
              <div className="p-12 lg:p-20">
                <span className="text-orange-400 font-mono text-sm tracking-[0.3em] uppercase">Get In Touch</span>
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter mt-4 mb-10 leading-tight">
                  Let&apos;s build the <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">
                    Next Big Thing.
                  </span>
                </h2>

                <div className="space-y-6">
                  {[
                    { icon: FiMail, label: "Email Me", value: "attiqueshafeeq246@gmail.com", hover: "hover:bg-orange-500" },
                    { icon: FiPhoneCall, label: "Call Me", value: "+92-3244771036", hover: "hover:bg-red-500" },
                    { icon: FiMapPin, label: "Location", value: "Lahore, Pakistan", hover: "hover:bg-orange-600" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-5 group">
                      <div className={`w-[52px] h-[52px] rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-xl ${item.hover} transition-all`}>
                        <item.icon />
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs uppercase tracking-widest">{item.label}</p>
                        <p className="text-lg">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-12 lg:p-20 lg:border-l border-white/10">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-gray-500 ml-1">Name</label>
                      <input name="name" onChange={handleChange} value={formData.name} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-orange-500 transition" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-gray-500 ml-1">Email</label>
                      <input name="email" onChange={handleChange} value={formData.email} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-orange-500 transition" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-gray-500 ml-1">Subject</label>
                    <input name="subject" onChange={handleChange} value={formData.subject} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-orange-500 transition" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-gray-500 ml-1">Message</label>
                    <textarea name="message" onChange={handleChange} value={formData.message} rows={4} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-orange-500 transition resize-none" />
                  </div>
                  <button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold py-5 rounded-2xl hover:shadow-[0_0_40px_rgba(249,115,22,0.4)] transition-all flex items-center justify-center gap-3 disabled:opacity-60">
                    {isSubmitting ? "Sending..." : "Send Message"} <FiSend />
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Chatbot />

      {/* ===== Footer ===== */}
      <footer className="py-12 border-t border-white/5 bg-[#030303] text-center relative z-10">
        <div className="container mx-auto px-6">
          <div className="flex justify-center gap-6 mb-8">
            <a href="https://github.com/Attique-dash" target="_blank" className="p-3 bg-white/5 rounded-full hover:text-orange-400 hover:bg-orange-500/10 transition"><FiGithub size={20}/></a>
            <a href="https://www.linkedin.com/in/attique-muhammad-attique-835474368/" target="_blank" className="p-3 bg-white/5 rounded-full hover:text-red-400 hover:bg-red-500/10 transition"><FiLinkedin size={20}/></a>
            <a href="https://www.fiverr.com/attique110" target="_blank" className="p-3 bg-white/5 rounded-full hover:text-orange-300 hover:bg-orange-500/10 transition"><TbBrandFiverr size={22}/></a>
          </div>
          <p className="text-gray-600 text-sm">© {new Date().getFullYear()} Muhammad Attique. Built with Next.js, Three.js & Framer Motion.</p>
        </div>
      </footer>
    </div>
  );
}
