'use client'
import { motion } from 'framer-motion'

const skills = [
    "JavaScript", "TypeScript", "React", "Next.js",
    "Node.js", "Python", "Three.js", "Tailwind CSS",
    "PostgreSQL", "GraphQL", "Framer Motion", "Git",
    "AWS", "Docker", "Figma", "Blender"
]

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

            <div className="flex flex-wrap justify-center gap-4 max-w-5xl">
                {skills.map((skill, index) => (
                    <motion.div
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                        whileHover={{ scale: 1.1, backgroundColor: "rgba(157, 0, 255, 0.2)", borderColor: "#9d00ff" }}
                        className="px-6 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm cursor-default transition-colors duration-300 relative overflow-hidden group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700 ease-in-out" />
                        <span className="text-lg text-gray-200">{skill}</span>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
