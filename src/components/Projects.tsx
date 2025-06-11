import Image from 'next/image';
import Link from 'next/link';
import project1 from '../../public/Images/AI Project.png';
import project2 from '../../public/Images/Game Project.png';
import project3 from '../../public/Images/Erp Project.png';
import project4 from '../../public/Images/Stock Project.jpg';
import project5 from '../../public/Images/Salt Project.png';
import project6 from '../../public/Images/Blog Project.png';

const projects = [
  { id: 1, image: project1, title: 'AutoPost AI', discription: 'AutoPost AI automatically generates a new post every minute based on a user-defined topic and related content, with the ability to pause and restart using a stop button.', link: 'https://daily-drafits-ai-git-main-muhammad-attiques-projects.vercel.app/', tags: ['AI Integration', 'Next.js', 'Typescript', 'Firebase'] },
  { id: 2, image: project2, title: 'IQ Play Game', discription: 'IQPLAY Game is a 2-player quiz challenge with 6 games, 3 difficulty levels, random MCQs, progress tracking, rewards, and daily play—free trial for new users.', link: 'http://iqplay-2baf-git-master-muhammad-attiques-projects.vercel.app', tags: ['Next.js', 'Stripe', 'Typescript', 'Firebase'] },
  { id: 3, image: project3, title: 'UniSys Erp', discription: 'UniSys ERP is a role-based system for managing users(teachers, CRs, students), roles, and assign tasks in an academic environment with email-based login access.', link: 'https://uni-sys-muhammad-attiques-projects.vercel.app/', tags: ['React', 'Tailwind', 'Firebase', 'Node.js'] },
  { id: 4, image: project6, title: 'B-site Blog', discription: 'B-site Blog is a user-driven platform where people can publish blogs, explore trending posts, and easily discover content through tag-based search and category filters', link: 'https://bloging-website-frontend-krghv0e2l-muhammadumar248s-projects.vercel.app/', tags: ['Next.js', 'Typescript', 'MongoDB', 'Tailwind'] },
  { id: 5, image: project5, title: 'Faychem Salt', discription: 'Faychem Salt exports premium-quality Pakistani salt worldwide, offering tailored solutions for culinary, industrial, and custom product purchases through contact.', link: 'https://faychem.vercel.app/', tags: ['Next.js', 'Typescript', 'Firebase', 'Nodemailer'] },
  { id: 6, image: project4, title: 'Stock Management System', discription: 'A Stock Management System that allows users to add, update, and search stock items with real-time tracking of quantity, price, and availability.', link: 'https://stock-management-system-psi.vercel.app/', tags: ['HTML', 'CSS', 'Javascript', 'MongoDB'] },
];

export default function Projects() {
  return (
    <section id="projects-section" className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12">
          <span className="text-blue-500 font-semibold tracking-widest uppercase text-sm sm:text-base">What I&apos;ve Built</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold mt-2 mb-3 text-gray-900">My Projects</h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm sm:text-base px-4">
            Each project here represents a step in my journey as a developer — from learning the basics to building creative UI/UX experiences and solving real challenges through code.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((project) => (
            <Link href={project.link} key={project.id} target="_blank" rel="noopener noreferrer">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition duration-300 hover:-translate-y-2 hover:shadow-2xl group cursor-pointer">
                <div className="relative w-full h-48 sm:h-56 md:h-64">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-contain p-2 border border-gray-200 rounded-t-2xl"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-4 sm:p-6 text-center">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-500 transition-colors duration-300">{project.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 line-clamp-3">{project.discription}</p>
                  <div className="flex flex-wrap justify-center gap-2 mt-3">
                    {project.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs sm:text-sm font-medium bg-blue-500 text-white px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}