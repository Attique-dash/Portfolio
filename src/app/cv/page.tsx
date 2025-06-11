'use client';

import { FaDownload, FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub } from 'react-icons/fa';
import { TbBrandFiverr } from "react-icons/tb";
import { useState } from 'react';
// Assuming '@/lib/generatePdf' still exists and works for fallback
import { generateSimpleCV } from '@/lib/generatePdf';

export default function CVPage() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleDownloadCV = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Try fetching existing PDF first
      const response = await fetch('/m.attique-cv.pdf');

      if (!response.ok) {
        // If no PDF exists, generate a simple one
        console.log('Generating fallback PDF...');
        const pdfBytes = await generateSimpleCV();
        downloadPdf(pdfBytes, 'm.attique-cv.pdf');
        return;
      }

      const blob = await response.blob();
      downloadPdf(blob, 'm.attique-cv.pdf');

    } catch (err) {
      setError('Failed to download CV. Please try again or contact me.');
      console.error('Download error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadPdf = (data: Blob | Uint8Array, filename: string) => {
    const blob = data instanceof Blob ? data : new Blob([data], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();

    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-xl overflow-hidden transform hover:scale-[1.005] transition-transform duration-300">
        {/* Header - Enhanced Professional Look */}
        <div className="relative bg-gradient-to-r from-blue-700 to-indigo-700 text-white p-10 pb-20 rounded-t-xl">
          <div className="absolute inset-0 bg-pattern-dots opacity-10"></div> {/* Optional: Add a subtle pattern */}
          <h1 className="text-4xl md:text-5xl font-extrabold mb-2 relative z-10">Muhammad Attique</h1>
          <p className="text-xl md:text-2xl font-light opacity-90 relative z-10">Full Stack Developer | AI Integration</p>

          {/* Contact Info - Modernized Layout */}
          <div className="absolute bottom-0 left-0 right-0 p-6 pt-10 bg-white bg-opacity-95 backdrop-blur-sm rounded-b-xl shadow-lg -mb-6">
            <div className="flex flex-wrap justify-between gap-y-3 gap-x-6 text-gray-700 text-sm md:text-base">
              <div className="flex items-center">
                <FaEnvelope className="mr-2 text-blue-600" />
                <a href="mailto:attiqueshafeeq246@gmail.com" className="hover:underline">attiqueshafeeq246@gmail.com</a>
              </div>
              <div className="flex items-center">
                <FaPhone className="mr-2 text-blue-600" />
                <a href="tel:+923244771036" className="hover:underline">+92-3244771036</a>
              </div>
              <div className="flex items-center">
                <FaMapMarkerAlt className="mr-2 text-blue-600" />
                <span>Lahore, Pakistan</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - Structured Sections */}
        <div className="p-8 md:p-10 lg:p-12 mt-6"> {/* Added margin top to account for overlapping header */}

          {/* About Me */}
          <section className="mb-10">
            <h2 className="text-3xl font-bold mb-4 text-blue-800 border-b-2 border-blue-200 pb-2">About Me</h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              A highly motivated and experienced <span className='font-semibold'>Full Stack Developer</span> with over 4 years of hands-on experience
              in building robust, scalable, and user-friendly web applications. Specializing in <span className='font-semibold'>React, Next.js, Node.js, and Python</span>,
              I am passionate about crafting innovative solutions and committed to delivering high-quality, maintainable code.
              My expertise also extends to <span className='font-semibold'>AI Integration</span> and <span className='font-semibold'>software architecture</span>, constantly seeking to
              leverage cutting-edge technologies to solve complex challenges.
            </p>
          </section>

          {/* Work Experience */}
          <section className="mb-10">
            <h2 className="text-3xl font-bold mb-4 text-blue-800 border-b-2 border-blue-200 pb-2">Work Experience</h2>
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-gray-800 mb-1">Full Stack Developer</h3>
                <p className="text-blue-600 text-md font-medium mb-3">2021 - Present</p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 leading-relaxed">
                  <li>Leveraged <span className='font-semibold'>4+ years of experience</span> to specialize in comprehensive full-stack development and advanced technical solutions.</li>
                  <li>Successfully led the creation and deployment of <span className='font-semibold'>20+ real-world projects</span>, demonstrating strong project lifecycle management.</li>
                  <li>Consistently delivered scalable, efficient, and robust solutions, adept at solving <span className='font-semibold'>complex development challenges</span> through innovative approaches.</li>
                </ul>
              </div>
              {/* You can add more experience entries here following the same structure */}
            </div>
          </section>

          {/* Skills */}
          <section className="mb-10">
            <h2 className="text-3xl font-bold mb-4 text-blue-800 border-b-2 border-blue-200 pb-2">Technical Skills</h2>
            <div className="flex flex-wrap gap-3">
              <SkillTag category="Frontend" skills="React, Next.js, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS" />
              <SkillTag category="Backend" skills="Node.js, Python, Express.js" />
              <SkillTag category="Database" skills="MongoDB, Firebase, MySQL" />
              <SkillTag category="DevOps & Tools" skills="Git, GitHub, Vercel" />
              <SkillTag category="AI" skills="AI Integration" />
            </div>
          </section>

          {/* Education */}
          <section className="mb-10">
            <h2 className="text-3xl font-bold mb-4 text-blue-800 border-b-2 border-blue-200 pb-2">Education</h2>
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-gray-800">Bachelor of Science in Computer Science</h3>
                <p className="text-blue-600 font-medium">Superior University Lahore — 2023 – 2027 (Expected)</p>
                <p className="text-gray-700 mt-2">Focused on <span className='font-semibold'>Web Development & Advanced AI Integration</span>.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-gray-800">Intermediate in Computer Science (ICS)</h3>
                <p className="text-blue-600 font-medium">Concordia College — 2021 – 2023</p> {/* Adjusted dates to align with B.S. start */}
                <p className="text-gray-700 mt-2">Foundation in computer science principles and mathematics.</p>
              </div>
            </div>
          </section>

          {/* Social Links - Enhanced with Hover Effects */}
          <section>
            <h2 className="text-3xl font-bold mb-4 text-blue-800 border-b-2 border-blue-200 pb-2">Connect with Me</h2>
            <div className="flex gap-6 items-center">
              <a href="https://www.linkedin.com/in/attique-muhammad-attique-835474368/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 transition-colors transform hover:scale-110" title="LinkedIn Profile">
                <FaLinkedin size={32} />
              </a>
              <a href="https://github.com/Attique-dash" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-gray-600 transition-colors transform hover:scale-110" title="GitHub Profile">
                <FaGithub size={32} />
              </a>
              <a href="https://www.fiverr.com/attique110?public_mode=true" target="_blank" rel="noopener noreferrer" className="bg-emerald-500 hover:bg-emerald-600 p-2 rounded-full flex items-center justify-center transition-colors transform hover:scale-110" title="Fiverr Profile">
                <TbBrandFiverr size={24} fill='white' />
              </a>
            </div>
          </section>
        </div>

        {/* Download Button Section */}
        <div className="p-8 bg-gray-100 border-t border-gray-200 text-center rounded-b-xl">
          <button
            onClick={handleDownloadCV}
            disabled={isLoading}
            className={`inline-flex items-center cursor-pointer justify-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 ${
              isLoading ? 'opacity-60 cursor-not-allowed' : ''
            }`}
          >
            <FaDownload className={isLoading ? 'animate-bounce' : ''} />
            {isLoading ? 'Generating & Downloading...' : 'Download My CV (PDF)'}
          </button>

          {error && (
            <div className="mt-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200 text-left">
              <p className="font-medium">Error: {error}</p>
              <p className="text-sm mt-1">
                You can also <a href="mailto:attiqueshafeeq246@gmail.com" className="underline hover:text-red-900">email me directly</a> for a copy.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Helper component for Skill Tags
const SkillTag = ({ category, skills }: { category: string; skills: string }) => (
  <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium shadow-sm flex-shrink-0">
    <span className="font-semibold">{category}:</span> {skills}
  </div>
);

// Optional: Add a subtle background pattern for the header if you want
// Add this CSS somewhere if you want to use the .bg-pattern-dots class
// This could be in your global CSS file or a <style jsx> block if using Next.js <style>
/*
.bg-pattern-dots {
  background-image: radial-gradient(#ffffff33 1px, transparent 1px);
  background-size: 8px 8px;
}
*/