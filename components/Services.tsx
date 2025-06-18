
import { motion } from 'framer-motion';
import { FiMonitor, FiCode, FiLayers, FiImage } from 'react-icons/fi';
import { MdOutlineDesignServices } from 'react-icons/md';
import { FaMobileScreen } from 'react-icons/fa6';
import { TbCloudCog } from 'react-icons/tb';
import { IconType } from 'react-icons';
import { FaTabletAlt } from "react-icons/fa";

export default function Hero() {

    // Animation variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
    };
   
    return (
        <div>
            <motion.section id="services-section" className="py-12 sm:py-16 lg:py-20 overflow-x-hidden bg-white dark:bg-gray-900" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <span className="text-yellow-500 dark:text-white font-semibold tracking-widest uppercase text-sm sm:text-base">I&apos;m great at</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mt-2 mb-2 text-gray-900 dark:text-yellow-500">We do awesome services for our clients</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto text-sm sm:text-base px-4">
            Delivering awesome services including
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              { name: 'Web Design', desc: 'Crafting clean, modern, and visually engaging website layouts tailored to your brand.', icon: 'FiMonitor' },
              { name: 'Web Application', desc: 'Building interactive, scalable web apps that solve real-world problems efficiently.', icon: 'FiCode' },
              { name: 'Web Development', desc: 'Full-stack development using the latest technologies to bring ideas to life online.', icon: 'FiLayers' },
              { name: 'Banner Design', desc: 'Creating impactful banner visuals that capture attention and enhance user engagement.', icon: 'FiImage' },
              { name: 'UI/UX Design', desc: 'Designing intuitive user interfaces and seamless experiences for maximum usability.', icon: 'MdOutlineDesignServices' },
              { name: 'Mobile App Development', desc: 'Developing responsive, cross-platform mobile apps that meet user needs on the go.', icon: 'FaMobileScreen' },
              { name: 'API Integration', desc: 'Connecting your app with third-party services for enhanced features and automation.', icon: 'TbCloudCog' },
              { name: 'Responsive Design', desc: 'Ensuring your website looks and performs great on all screen sizes and devices.', icon: 'FaTabletAlt' },
            ].map((service, idx) => {
              const Icon: IconType = {
                FiMonitor,
                FiCode,
                FiLayers,
                FiImage,
                MdOutlineDesignServices,
                FaMobileScreen,
                TbCloudCog,
                FaTabletAlt
              }[service.icon] as IconType;
              return (
                <motion.div key={idx} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 flex flex-col items-start relative" variants={fadeInUp}>
                  <div className="absolute -top-6 -left-6 bg-gray-500 dark:bg-white p-3 rounded-full shadow-md">
                    <Icon className="text-white text-2xl dark:text-black" />
                  </div>
                  <div className="text-lg font-bold text-black dark:text-yellow-500 mb-2 mt-4">{service.name}</div>
                  <div className="text-gray-600 dark:text-gray-300 text-sm">{service.desc}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>
        </div>
    );
}
