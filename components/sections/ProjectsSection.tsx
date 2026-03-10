'use client'
import { useRef } from 'react'
import { Github, ExternalLink } from 'lucide-react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SparklesText from '../ui/SparklesText'

gsap.registerPlugin(ScrollTrigger)

const projects = [
    {
        title: "AI Mock Interview System",
        description: "AI-powered platform using Next.js, Node.js, and LLM APIs to conduct automated interviews and generate structured feedback. Implemented real-time facial emotion analysis using MediaPipe.",
        tags: ["Next.js", "FastAPI", "MediaPipe", "PostgreSQL", "Firebase"],
        color: "#9d00ff", // Purple Glow
        bgSplash: `path("M 0 303.5 C 0 292.454 8.995 285.101 20 283.5 L 460 219.5 C 470.085 218.033 480 228.454 480 239.5 L 500 430 C 500 441.046 491.046 450 480 450 L 20 450 C 8.954 450 0 441.046 0 430 Z")`,
        gradient: "linear-gradient(306deg, #7c3aed, #4f46e5)", // Violet-Indigo
        githubUrl: "https://github.com",
        liveUrl: "https://vercel.com"
    },
    {
        title: "Cybersecurity Intrusion Detection",
        description: "Network threat detection system using Random Forest and other ML models for high-accuracy and explainable cybersecurity monitoring.",
        tags: ["Machine Learning", "Random Forest", "Python", "Cybersecurity"],
        color: "#00ff88", // Green Glow
        bgSplash: `path("M 0 303.5 C 0 292.454 8.995 285.101 20 283.5 L 460 219.5 C 470.085 218.033 480 228.454 480 239.5 L 500 430 C 500 441.046 491.046 450 480 450 L 20 450 C 8.954 450 0 441.046 0 430 Z")`,
        gradient: "linear-gradient(306deg, #10b981, #059669)", // Emerald
        githubUrl: "https://github.com",
        liveUrl: "https://vercel.com"
    },
    {
        title: "KrishiMart B2B",
        description: "Bulk trading platform for agricultural produce with real-time inventory management, location-based tracking, and scalable order logic.",
        tags: ["React", "Node.js", "MongoDB", "Logistics"],
        color: "#00ffff", // Cyan Glow
        bgSplash: `path("M 0 303.5 C 0 292.454 8.995 285.101 20 283.5 L 460 219.5 C 470.085 218.033 480 228.454 480 239.5 L 500 430 C 500 441.046 491.046 450 480 450 L 20 450 C 8.954 450 0 441.046 0 430 Z")`,
        gradient: "linear-gradient(306deg, #0ea5e9, #0284c7)", // Sky
        githubUrl: "https://github.com",
        liveUrl: "https://vercel.com"
    },
    {
        title: "Structured-to-Text Engine",
        description: "Built a highly efficient Structured-to-Text engine to translate complex network anomalies into readable, explainable reports.",
        tags: ["NLP", "LLM", "Phi-3-mini", "LoRA"],
        color: "#ff00ff", // Pink Glow
        bgSplash: `path("M 0 303.5 C 0 292.454 8.995 285.101 20 283.5 L 460 219.5 C 470.085 218.033 480 228.454 480 239.5 L 500 430 C 500 441.046 491.046 450 480 450 L 20 450 C 8.954 450 0 441.046 0 430 Z")`,
        gradient: "linear-gradient(306deg, #ec4899, #db2777)", // Pink
        githubUrl: "https://github.com",
        liveUrl: "https://vercel.com"
    }
]

// Single Project Card driven by native GSAP ScrollTrigger
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ProjectAnimationCard({ project, index }: { project: any, index: number }) {
    const cardRef = useRef<HTMLDivElement>(null)
    const isEven = index % 2 === 0;

    useGSAP(() => {
        gsap.from(cardRef.current, {
            scrollTrigger: {
                trigger: cardRef.current,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play reverse play reverse",
            },
            y: 300,
            opacity: 0,
            duration: 1,
            ease: "back.out(1.2)"
        })
    }, [])

    return (
        <div
            ref={cardRef}
            className="w-full flex justify-center items-center relative overflow-hidden py-10 my-[-40px] md:my-[-80px] lg:my-[-120px]"
        >
            {/* The SVG Splash Mask (Optional underlying graphic) */}
            <div
                className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                    background: project.gradient,
                    clipPath: project.bgSplash,
                }}
            />

            <div 
                className={`project-card-inner relative w-[90%] md:w-[600px] lg:w-[800px] min-h-[350px] flex flex-col justify-end rounded-3xl p-8 backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden group hover:scale-[1.02] transition-transform duration-500 will-change-transform`}
                style={{
                    rotate: isEven ? "-2deg" : "2deg",
                    transformOrigin: "center center"
                }}
            >
                {/* Beautiful dynamic hover glow based on project specific color */}
                <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-700 ease-in-out pointer-events-none"
                    style={{ background: `radial-gradient(circle at 50% 120%, ${project.color}, transparent 60%)` }}
                />

                <div className="relative z-10 flex flex-col gap-4">
                    <h3 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white to-gray-400">
                        {project.title}
                    </h3>
                    
                    <p className="text-gray-300 md:text-lg leading-relaxed max-w-2xl">
                        {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mt-4">
                        {project.tags.map((tag: string) => (
                            <span 
                                key={tag} 
                                className="text-xs md:text-sm px-3 md:px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-200 backdrop-blur-md"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    <div className="flex gap-4 mt-6">
                        {project.githubUrl && (
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors border border-white/10 group-hover:border-white/30">
                                <Github className="w-5 h-5 text-white" />
                            </a>
                        )}
                        {project.liveUrl && (
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors border border-white/10 group-hover:border-white/30">
                                <ExternalLink className="w-5 h-5 text-white" />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function ProjectsSection() {
    const containerRef = useRef<HTMLDivElement>(null)
    const headerRef = useRef<HTMLHeadingElement>(null)

    useGSAP(() => {
        // Fade out "PROJECTS" header slightly as we scroll deep into list via scrub
        gsap.to(headerRef.current, {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "30% top",
                scrub: true,
            },
            opacity: 0.2,
            ease: "none"
        })
    }, { scope: containerRef })

    return (
        <section id="projects" className="relative bg-transparent pt-32 pb-48 overflow-hidden min-h-screen">
            
            {/* Massive Parallax Header */}
            <div ref={containerRef} className="sticky top-20 w-full flex justify-center z-20 pointer-events-none select-none px-4 h-0 overflow-visible">
                <div ref={headerRef} className="flex justify-center w-full">
                    <SparklesText 
                        text="PROJECTS" 
                        className="text-5xl md:text-[10rem] font-bold text-center" 
                        textClassName="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary"
                        colors={{ first: "#a78bfa", second: "#f472b6" }}
                    />
                </div>
            </div>

            {/* Scroll-Triggered Card Stack */}
            <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col items-center mt-[180px] md:mt-[240px] px-4 md:px-0">
                {projects.map((project, index) => (
                    <ProjectAnimationCard key={project.title} project={project} index={index} />
                ))}
            </div>
        </section>
    )
}
