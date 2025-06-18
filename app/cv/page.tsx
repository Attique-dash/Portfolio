'use client';

import Head from 'next/head';
import Image from 'next/image';
import { useRef } from 'react';
import Profile from '@/public/PImage3.png';

// This would ideally come from an API call or a data file
const cvData = {
  fullName: "Muhammad Attique",
  profession: "Software Developer",
  contactNumber: "+92 324 4771036",
  emailAddress: "attiqueshafeeq246@gmail.com",
  languageProficiencies: [{
    lang: "English",
    level: "Intermediate"
  }],
  skills: [
    "React/React Native",
    "Next JS",
    "TypeScript",
    "Node.js",
    "Express.js",
    "MongoDB",
    "Python",
    "Firebase",
    "Tailwind"
  ],
  hobbies: ["Programming", "Cricket"],
  profileSummary: "I'm a BS Computer Science student from Superior University with a passion for AI, web development, and creative UI/UX. I build smart, user-friendly applications that solve real-world problems in meaningful ways.",
  educationHistory: [{
    degree: "Masters in Computer Science",
    institution: "Superior University Lahore"
  }, {
    degree: "Introduction of Computer Science",
    institution: "Concordia College Lahore"
  }],
  professionalExperience: [{
    title: "Full Stack Developer",
    years: "2021 - Present",
    description: [
      "Leveraged 4+ years of experience to specialize in comprehensive full-stack development and advanced technical solutions.",
      "Successfully led the creation and deployment of 20+ real-world projects, demonstrating strong project lifecycle management.",
      "Consistently delivered scalable, efficient, and robust solutions, adept at solving complex development challenges through innovative approaches."
    ]
  }],
  profilePictureUrl: Profile,
};

export default function CvPage() {
  const cvRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = () => {
    // Create a link element
    const link = document.createElement('a');
    // Set the href to the CV.pdf file in the public folder
    link.href = '/CV.pdf';
    // Set the download attribute with the desired filename
    link.download = `${cvData.fullName}-CV.pdf`;
    // Append to the document
    document.body.appendChild(link);
    // Trigger the click event
    link.click();
    // Clean up by removing the link
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Head>
        <title>{cvData.fullName} - CV</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div ref={cvRef} className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden md:flex">
        <div className="md:w-1/3 bg-gray-800 text-white p-6 flex flex-col items-center justify-center">
          {cvData.profilePictureUrl && (
            <div className="mb-4 w-[200px] h-[200px] bg-white shadow-md shadow-white relative overflow-hidden rounded-full border-4 border-gray-600">
              <Image
                src={cvData.profilePictureUrl}
                alt={cvData.fullName}
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-full"
                priority
              />
            </div>
          )}
          <h1 className="text-3xl font-bold mb-2 text-center">{cvData.fullName}</h1>
          <p className="text-xl text-gray-300 text-center">{cvData.profession}</p>

          <div className="mt-6 text-sm w-full">
            <h2 className="text-lg font-semibold mb-2 border-b border-gray-700 pb-1">Contact</h2>
            <p className="flex items-center mb-1">
              <span className="mr-2">📞</span> {cvData.contactNumber}
            </p>
            <p className="flex items-center">
              <span className="mr-2">✉️</span> {cvData.emailAddress}
            </p>
          </div>

          <div className="mt-6 text-sm w-full">
            <h2 className="text-lg font-semibold mb-2 border-b border-gray-700 pb-1">Languages</h2>
            {cvData.languageProficiencies.map((lang, index) => (
              <p key={index}>{lang.lang} ({lang.level})</p>
            ))}
          </div>

          <div className="mt-6 text-sm w-full">
            <h2 className="text-lg font-semibold mb-2 border-b border-gray-700 pb-1">Hobbies</h2>
            <p>{cvData.hobbies.join(', ')}</p>
          </div>
        </div>

        <div className="md:w-2/3 p-6">
          <section className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-3 border-b-2 pb-2">Profile Summary</h2>
            <p className="text-gray-700 leading-relaxed">{cvData.profileSummary}</p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-3 border-b-2 pb-2">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {cvData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-3 border-b-2 pb-2">Professional Experience</h2>
            {cvData.professionalExperience.map((exp, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-xl font-semibold text-gray-800">{exp.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{exp.years}</p>
                <ul className="list-disc list-inside text-gray-700">
                  {exp.description.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-3 border-b-2 pb-2">Education</h2>
            {cvData.educationHistory.map((edu, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-xl font-semibold text-gray-800">{edu.degree}</h3>
                <p className="text-gray-600 text-sm">{edu.institution}</p>
              </div>
            ))}
          </section>
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-4 flex justify-center">
        <button
          onClick={handleDownloadPDF}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          Download CV
        </button>
      </div>
    </div>
  );
}