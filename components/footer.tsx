import Link from 'next/link';
import { FaGithub } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { TbBrandFiverr } from "react-icons/tb";

export default function Footer() {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    const element = document.querySelector(target);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-white dark:bg-gray-900 pt-10">
      <div className="container mx-auto px-4 border-t-4 border-gray-500 dark:border-yellow-500 shadow-md shadow-gray-300 dark:shadow-yellow-500 rounded-t-xl">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 py-10">
          {/* Column 1 */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-black dark:text-white">Let's work together</h3>
            <p className="text-gray-500 dark:text-gray-300">
              Have an idea or project in mind? I’d love to help you build it — from websites to smart AI tools.
            </p>
          </div>

          {/* Column 2 */}
          <div className="text-center md:text-left">
            <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">Quick Links</h2>
            {[
              { name: "Home", id: "home-section" },
              { name: "About", id: "about-section" },
              { name: "Projects", id: "projects-section" },
              { name: "Services", id: "services-section" },
              { name: "Contact", id: "contact-section" },
            ].map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleScroll(e, `#${link.id}`)}
                className="block mb-1 text-gray-500 hover:text-gray-800 dark:text-gray-300 dark:hover:text-yellow-400 transition-colors duration-300"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Column 3 */}
          <div className="text-center md:text-left">
            <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">Contact</h2>
            <p className="mb-2 text-gray-500 dark:text-gray-300">
              <span className="font-semibold">Email:</span> attiqueshafeeq246@gmail.com
            </p>
            <p className="mb-2 text-gray-500 dark:text-gray-300">
              <span className="font-semibold">Phone:</span> +92-3244771036
            </p>
            <p className="text-gray-500 dark:text-gray-300">
              <span className="font-semibold">Location:</span> Ibarra St, Education Town, Wapda Town, Lahore
            </p>
          </div>
        </div>

        {/* Social Links */}
        <div className="border-t border-gray-300 dark:border-gray-700 pt-6 text-center">
          <h2 className="text-xl font-semibold text-black dark:text-white">Stay Connected</h2>
          <div className="flex justify-center gap-6 mt-4">
            <a href="https://github.com/Attique-dash" target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-300 hover:text-gray-800 dark:hover:text-yellow-400 transition-colors duration-300 text-center">
              <FaGithub className="mx-auto text-2xl" />
              <p className="text-sm mt-1">GitHub</p>
            </a>
            <a href="https://www.linkedin.com/in/attique-muhammad-attique-835474368/" target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-300 hover:text-gray-800 dark:hover:text-yellow-400 transition-colors duration-300 text-center">
              <FaLinkedin className="mx-auto text-2xl" />
              <p className="text-sm mt-1">LinkedIn</p>
            </a>
            <a href="https://www.fiverr.com/attique110?public_mode=true" target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-300 hover:text-gray-800 dark:hover:text-yellow-400 transition-colors duration-300 text-center">
              <TbBrandFiverr className="mx-auto text-2xl" />
              <p className="text-sm mt-1">Fiverr</p>
            </a>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 text-center text-sm  text-black dark:text-white">
          <p>
            © {new Date().getFullYear()} Muhammad Attique. All rights reserved | Built with Next.js, Tailwind CSS & OpenAI API.
          </p>
        </div>
      </div>
    </footer>
  );
}
