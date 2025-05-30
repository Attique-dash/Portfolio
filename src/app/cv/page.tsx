'use client';

import { FaDownload, FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub } from 'react-icons/fa';
import { TbBrandFiverr } from "react-icons/tb";
import { useState } from 'react';
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
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 text-white p-8">
          <h1 className="text-3xl font-bold mb-2">Muhammad Attique</h1>
          <p className="text-xl">Full Stack Developer</p>
          <div className="mt-4 flex flex-wrap gap-4">
            <div className="flex items-center">
              <FaEnvelope className="mr-2" />
              <span>attiqueshafeeq246@gmail.com</span>
            </div>
            <div className="flex items-center">
              <FaPhone className="mr-2" />
              <span>+92-3244771036</span>
            </div>
            <div className="flex items-center">
              <FaMapMarkerAlt className="mr-2" />
              <span>Whadat Road Lahore, Pakistan</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-8">
          {/* Summary */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">About Me</h2>
            <p className="text-gray-600">
              Experienced Full Stack Developerwith hands-on experience in building modern web 
              applications using React, Node.js, and other cutting-edge technologies. Focused
              on delivering scalable, high-performance solutions with clean and maintainable code.
            </p>
          </section>

          {/* Experience */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Work Experience</h2>
            <div className="space-y-6">
              <div>
                <p className="text-blue-600"> 2021 - Present</p>
                <ul className="list-disc list-inside mt-2 text-gray-600">
                  <li>4+ years of experience specializing in full-stack development and advanced technical skills.</li>
                  <li>Successfully created and deployed 20+ real-world projects</li>
                  <li>Skilled in solving complex development challenges and delivering scalable solutions.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Skills */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Skills</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-gray-500 p-3 rounded-lg">
                <span className="font-semibold">Frontend:</span> React, Next.js, TypeScript
              </div>
              <div className="bg-gray-500 p-3 rounded-lg">
                <span className="font-semibold">Backend:</span> Node.js, Python,TypeScript  
              </div>
              <div className="bg-gray-500 p-3 rounded-lg">
                <span className="font-semibold">Database:</span> MongoDB, Firebase, SQL
              </div>
            </div>
          </section>

          {/* Education */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Education</h2>
            <div>
              <h3 className="text-xl font-semibold text-gray-700">Bachelor of Science in Computer Science</h3>
              <p className="text-blue-600">Superior University — 2023 – 2027</p>
              <h3 className="text-xl font-semibold text-gray-700">Intermediate in Computer Science (ICS)</h3>
              <p className="text-blue-600">Concordia College — 2021 – 2023</p>
            </div>
          </section>

          {/* Social Links */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Connect</h2>
            <div className="flex gap-4">
              <a href="https://www.linkedin.com/in/attique-muhammad-attique-835474368/" className="text-blue-600 hover:text-blue-800">
                <FaLinkedin size={24} />
              </a>
              <a href="https://github.com/Attique-dash" className="text-gray-800 hover:text-gray-600">
                <FaGithub size={24} />
              </a>
              <a href="https://www.fiverr.com/attique110?public_mode=true" className="w-6.5 h-6.5 bg-emerald-400 hover:bg-emerald-500 rounded-full ">
                <TbBrandFiverr size={20} className='justify-self-center relative top-[2px]' fill='white' />
              </a>
            </div>
          </section>
        </div>

        {/* Download Button */}
        <div className="p-8 bg-gray-50 border-t">
        <button
          onClick={handleDownloadCV}
          disabled={isLoading}
          className={`flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <FaDownload />
          {isLoading ? 'Preparing CV...' : 'Download CV'}
        </button>
        
        {error && (
          <div className="mt-4 p-3 bg-red-50 text-red-600 rounded">
            {error}
            <p className="text-sm mt-1">
              You can also <a href="mailto:attiqueshafeeq246@gmail.com" className="underline">email me</a> for a copy.
            </p>
          </div>
        )}
      </div>
    </div>
    </div>
  );
} 