import Image from 'next/image';
import Link from "next/link";
import { FaDownload } from 'react-icons/fa';
import protfolio from '../../public/Images/PImage.png'

export default function Hero() {
  return (
    <section id="home-section" className="relative min-h-screen flex items-center">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left side - Text content */}
        <div className="w-full md:w-1/2 text-white">
          <span className="text-lg font-light">Hello! This is Attique</span>
          <h1 className="text-4xl md:text-6xl font-bold mt-4">
            Creative <span className="text-blue-500">UI/UX</span> & Software Developer
          </h1>
          <div className="mt-8 space-x-4">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded transition-colors">
              Contact me
            </button>
            <Link
              href="/cv"
              className="inline-flex items-center gap-2 bg-white text-blue-500 font-semibold px-6 py-3 rounded hover:border-blue-500 transition-colors"
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