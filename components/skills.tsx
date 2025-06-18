import Image from 'next/image';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';

export default function Hero() {

    // Animation variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
    };

    const { ref: skillsRef, inView: skillsInView } = useInView({ triggerOnce: true, threshold: 0.3 });

    return (
        <div>
            <motion.section
                ref={skillsRef}
                id="skills-section"
                className="bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 overflow-x-hidden"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
            >
                <div className="container mx-auto px-4">
                    <div className="text-center mb-8 sm:mb-12">
                        <span className="dark:text-white text-yellow-500 font-semibold tracking-widest uppercase text-sm sm:text-base">Skills</span>
                        <h2 className="text-3xl sm:text-4xl font-extrabold mt-2 mb-2 text-gray-900 dark:text-yellow-500">My Skills</h2>
                        <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto text-sm sm:text-base px-4">
                            Skilled in building full-stack web applications with a focus on clean UI/UX, performance, and real-world functionality.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {[
                            { name: 'React/React Native', percent: 85 },
                            { name: 'Next JS', percent: 89 },
                            { name: 'TypeScript', percent: 86 },
                            { name: 'Node.js', percent: 82 },
                            { name: 'Express.js', percent: 83 },
                            { name: 'MongoDB', percent: 85 },
                            { name: 'Python', percent: 81 },
                            { name: 'Firebase', percent: 88 },
                            { name: 'Tailwind', percent: 84 },
                        ].map((skill, idx) => {
                            const progress = skillsInView ? skill.percent : 0;
                            return (
                                <motion.div key={idx} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 flex flex-col items-center" variants={fadeInUp}>
                                    <div className="relative mb-4 w-24 h-24 flex items-center justify-center">
                                        <svg className="absolute top-0 left-0 w-24 h-24" viewBox="0 0 100 100">
                                            <circle cx="50" cy="50" r="45" stroke="#e5e7eb" strokeWidth="10" fill="none" />
                                            <motion.circle
                                                cx="50"
                                                cy="50"
                                                r="45"
                                                stroke="#000000"
                                                strokeWidth="10"
                                                fill="none"
                                                strokeDasharray={2 * Math.PI * 45}
                                                strokeDashoffset={2 * Math.PI * 45 * (1 - progress / 100)}
                                                strokeLinecap="round"
                                                transition={{ duration: 1.5, delay: 0.2 * idx }}
                                            />
                                        </svg>
                                        <span className="absolute text-2xl font-bold dark:text-yellow-500 text-gray-700">
                                            {skillsInView ? <CountUp end={skill.percent} duration={1.5} /> : 0}%
                                        </span>
                                    </div>
                                    <div className="text-lg font-bold text-gray-600 dark:text-white">{skill.name}</div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </motion.section>
        </div>
    );
}
