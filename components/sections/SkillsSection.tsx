'use client'
import { motion } from 'framer-motion'

const softSkills = [
    "Team Work", "Team Management", "Leadership",
    "Communications", "Management"
]

const technicalSkills = {
    languages: ["C", "C++", "Java", "Python", "Javascript"],
    frameworks: [
        "React", "NextJs", "NestJs", "MongoDB", "Postgres",
        "Hugging face", "Git and Github", "N8n"
    ],
    domains: ["Web Development", "ML", "AI Agents", "Cloud Azure"]
}

export default function SkillsSection() {
    return (
        <section id="skills" className="min-h-screen py-20 px-8 flex flex-col items-center justify-center relative">
            {/* Background elements */}
            <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-[128px] pointer-events-none" />
            <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary/20 rounded-full blur-[128px] pointer-events-none" />

            <motion.h2
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-5xl md:text-7xl font-bold mb-20 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
            >
                SKILLS
            </motion.h2>

            <div className="w-full max-w-6xl space-y-16">
                {/* Soft Skills */}
                <div className="space-y-8">
                    <motion.h3
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="text-3xl font-bold text-center md:text-left text-gray-100 border-b border-white/10 pb-4"
                    >
                        Soft Skills
                    </motion.h3>
                    <div className="flex flex-wrap justify-center md:justify-start gap-4">
                        {softSkills.map((skill, index) => (
                            <SkillItem key={skill} skill={skill} index={index} />
                        ))}
                    </div>
                </div>

                {/* Technical Skills */}
                <div className="space-y-12">
                    <motion.h3
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="text-3xl font-bold text-center md:text-left text-gray-100 border-b border-white/10 pb-4"
                    >
                        Technical Skills
                    </motion.h3>

                    {/* Languages */}
                    <div className="space-y-4">
                        <h4 className="text-xl text-gray-400 font-semibold mb-4 text-center md:text-left">Languages</h4>
                        <div className="flex flex-wrap justify-center md:justify-start gap-4">
                            {technicalSkills.languages.map((skill, index) => (
                                <SkillItem key={skill} skill={skill} index={index} />
                            ))}
                        </div>
                    </div>

                    {/* Frameworks */}
                    <div className="space-y-4">
                        <h4 className="text-xl text-gray-400 font-semibold mb-4 text-center md:text-left">Frameworks, Libraries & Tools</h4>
                        <div className="flex flex-wrap justify-center md:justify-start gap-4">
                            {technicalSkills.frameworks.map((skill, index) => (
                                <SkillItem key={skill} skill={skill} index={index} />
                            ))}
                        </div>
                    </div>

                    {/* Domains */}
                    <div className="space-y-4">
                        <h4 className="text-xl text-gray-400 font-semibold mb-4 text-center md:text-left">Domains</h4>
                        <div className="flex flex-wrap justify-center md:justify-start gap-4">
                            {technicalSkills.domains.map((skill, index) => (
                                <SkillItem key={skill} skill={skill} index={index} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

function SkillItem({ skill, index }: { skill: string; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            whileHover={{ scale: 1.1, backgroundColor: "rgba(157, 0, 255, 0.2)", borderColor: "#9d00ff" }}
            className="px-6 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm cursor-default transition-colors duration-300 relative overflow-hidden group"
        >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700 ease-in-out" />
            <span className="text-lg text-gray-200">{skill}</span>
        </motion.div>
    )
}
