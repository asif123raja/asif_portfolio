'use client'
import { motion } from 'framer-motion'
import { Monitor, Music, Gamepad, Globe, Cpu, Plane } from 'lucide-react'

const interests = [
    { name: "Gaming", icon: Gamepad },
    { name: "Music Production", icon: Music },
    { name: "Tech Trends", icon: Monitor },
    { name: "Travel", icon: Plane },
    { name: "AI Research", icon: Cpu },
    { name: "Open Source", icon: Globe },
]

export default function InterestsSection() {
    return (
        <section id="interests" className="min-h-screen py-20 px-8 flex flex-col items-center justify-center relative bg-transparent">
            <motion.h2
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="text-5xl md:text-7xl font-bold mb-20 bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary"
            >
                INTERESTS
            </motion.h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
                {interests.map((item, index) => (
                    <motion.div
                        key={item.name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex flex-col items-center gap-4 group cursor-pointer"
                    >
                        <div className="w-24 h-24 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/50 transition-all duration-300 relative overflow-hidden">
                            <div className="absolute inset-0 bg-primary/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <item.icon className="w-10 h-10 text-gray-400 group-hover:text-white transition-colors relative z-10" />
                        </div>
                        <span className="text-gray-400 font-medium group-hover:text-primary transition-colors">{item.name}</span>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
