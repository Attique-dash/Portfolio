import Image from 'next/image';
import Link from 'next/link';
import protfolio from '../public/PImage2.png';
import { MdWavingHand } from "react-icons/md";


export default function Hero() {
  return (
    <section
      id="home-section"
      className="relative md:mt-[60px] lg:mt-[40px] min-h-screen flex items-center bg-white dark:bg-gray-900"
    >
      <div className="container mt-[100px] md:mt-0 mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-12">
        
        {/* Left Content */}
        <div className="w-full md:w-1/2 text-gray-900 dark:text-white text-center md:text-left">
        <span className="text-lg font-medium tracking-wide text-gray-600 dark:text-gray-200">👋 Hello! I’m</span> <span className="text-lg font-medium tracking-wide text-yellow-500">Attique</span>
          <h1 className="text-4xl md:text-6xl font-extrabold mt-4 leading-tight">
            Software <span className="text-gray-500 dark:text-yellow-500">Developer</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            I&apos;m a BS Computer Science student at Superior University with a passion for AI,
            web development, and creative UI/UX. I build smart, user-friendly applications that solve
            real-world problems in meaningful ways.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
            <button className="bg-gray-500 hover:bg-gray-600 dark:bg-yellow-500 dark:hover:bg-yellow-600 text-white px-6 py-3 rounded-lg shadow-md transition-all duration-300 hover:scale-105">
              Contact me
            </button>
            <Link
              href="/cv"
              className="flex items-center gap-2 border border-gray-300 dark:border-gray-600 px-6 py-3 rounded-lg text-gray-900 text-white bg-black dark:bg-white dark:text-black transition-all duration-300"
            >
              📄 View CV
            </Link>
          </div>
        </div>

        {/* Right Content - Responsive Image */}
        <div className="w-full md:w-1/2 flex justify-center items-center">
          {/* Small screen: circular with border | Large screen: normal image */}
          <div className="relative w-64 h-64 md:w-[400px] md:h-[400px] overflow-hidden 
              rounded-full md:rounded-none 
              border-4 dark:border-yellow-500 border-black shadow-lg shadow-gray-600 md:shadow-none md:border-none 
              transition-all duration-500">
            <Image
              src={protfolio}
              alt="Hero Image"
              layout="fill"
              objectFit="cover"
              className="rounded-full md:rounded-none"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
