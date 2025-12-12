'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import ProjectCarousel from '../3d/ProjectCarousel'

const projects = [
    {
        title: "Project Alpha",
        description: "A futuristic dashboard with real-time data visualization.",
        tags: ["Next.js", "D3.js", "Tailwind"],
        color: "#00ffff", // Single color for glow
        githubUrl: "https://github.com",
        liveUrl: "https://vercel.com"
    },
    {
        title: "Neon Commerce",
        description: "E-commerce platform with immersive 3D product previews.",
        tags: ["React", "Three.js", "Stripe"],
        color: "#ff00ff",
        githubUrl: "https://github.com",
        liveUrl: "https://vercel.com"
    },
    {
        title: "AI Chat Interface",
        description: "Minimalist chat interface powered by generative AI.",
        tags: ["OpenAI", "Node.js", "Socket.io"],
        color: "#00ff88",
        githubUrl: "https://github.com",
        liveUrl: "https://vercel.com"
    },
    {
        title: "Cyber Portfolio",
        description: "Personal portfolio website with high-end animations.",
        tags: ["Framer Motion", "Lenis", "GSAP"],
        color: "#ff8800",
        githubUrl: "https://github.com",
        liveUrl: "https://vercel.com"
    }
]

// Single Project Card Component
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ProjectCard({ project, index }: { project: any, index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group relative w-full h-[400px] rounded-3xl overflow-hidden cursor-pointer border border-white/5 bg-white/5"
        >
            <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />

            <div className="absolute inset-0 p-8 flex flex-col justify-end z-10 transition-all duration-500">
                <h3 className="text-3xl font-bold mb-2 translate-y-8 group-hover:translate-y-0 transition-transform duration-500 text-white">{project.title}</h3>
                <p className="text-gray-300 mb-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">{project.description}</p>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-200">
                    {project.tags.map((tag: string) => (
                        <span key={tag} className="text-xs px-2 py-1 rounded bg-white/20 backdrop-blur-md text-white">{tag}</span>
                    ))}
                </div>
            </div>

            {/* Hover shimmer */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out" />
        </motion.div>
    )
}

export default function ProjectsSection() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end']
    })

    return (
        <section ref={containerRef} id="projects" className="relative h-[500vh] bg-transparent">
            <div className="sticky top-0 h-screen flex flex-col justify-center items-center overflow-hidden">
                <motion.h2
                    initial={{ opacity: 0, y: -50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute top-20 text-5xl md:text-8xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-600 z-10 pointer-events-none"
                    style={{
                        opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0])
                    }}
                >
                    PROJECTS
                </motion.h2>

                <div className="w-full h-full">
                    <Canvas camera={{ position: [0, 0, 14], fov: 45 }} gl={{ alpha: true, antialias: true }}>
                        {/* Adjusted fog to start further back so back cards are visible */}
                        <fog attach="fog" args={['#000', 18, 40]} />
                        <ambientLight intensity={0.8} />
                        <pointLight position={[10, 10, 10]} intensity={1} />
                        <ProjectCarousel projects={projects} scrollYProgress={scrollYProgress} />
                    </Canvas>
                </div>

                <div className="absolute bottom-10 text-white/50 animate-bounce pointer-events-none">
                    Scroll to Rotate
                </div>
            </div>
        </section>
    )
}
