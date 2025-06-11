import Image from 'next/image';
import Link from "next/link";
import protfolio from '../../public/Images/PImage2.png'

export default function Hero() {
  return (
    <section id="home-section" className="relative min-h-screen flex items-center">
      <div className="container mt-[100px] md:mt-[0px] mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left side - Text content */}
        <div className="w-full md:w-1/2 text-white text-center md:text-left">
          <span className="text-lg font-light">Hello! This is Attique</span>
          <h1 className="text-4xl md:text-6xl font-bold mt-4">
        Software <span className="text-blue-500">Developer</span> 
          </h1>
          <p className='mt-4 text-lg font-light text-gray-300 text-center md:text-left'>I'm a BS Computer Science student at Superior University with a passion for AI, web development, and creative UI/UX. I love building smart, user-friendly applications that solve real-world problems and help people in meaningful ways.</p>
          <div className="mt-8 space-x-4">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded transition-colors">
              Contact me
            </button>
            <Link
              href="/cv"
              className="inline-flex customaus:mt-0 customaus:mr-0 mt-[20px] mr-[16px] items-center gap-2 bg-white text-blue-500 font-semibold px-6 py-3 rounded hover:border-blue-500 transition-colors"
            >
              View CV
            </Link>
          </div>
        </div>

        {/* Right side - Image */}
        <div className="w-full md:w-1/2 relative h-[500px] md:h-[600px]">
          <Image
            src={protfolio}
            alt="Hero Background"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
}