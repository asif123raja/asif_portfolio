'use client'
import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SparklesText from '../ui/SparklesText'

gsap.registerPlugin(ScrollTrigger)

const softSkills = [
    "Team Work", "Team Management", "Leadership",
    "Communications", "Management"
]

const technicalSkills = {
    languages: ["C", "C++", "Java", "Python", "Javascript"],
    frameworks: [
        "React", "NextJs", "NestJs", "Tailwind", "Bootstrap", "MongoDB", "Postgres",
        "Hugging face", "Git and Github", "N8n"
    ],
    domains: ["DSA", "Web Development", "ML", "AI Agents", "Cloud Azure"]
}

export default function SkillsSection() {
    const containerRef = useRef<HTMLElement>(null)

    useGSAP(() => {
        // Main title animation
        gsap.from(".skills-title", {
            scrollTrigger: {
                trigger: ".skills-title",
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play reverse play reverse",
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        })

        // Category headers (Soft Skills, Technical Skills)
        gsap.utils.toArray<HTMLElement>('.skills-category').forEach((category) => {
            gsap.from(category, {
                scrollTrigger: {
                    trigger: category,
                    start: "top 85%",
                    end: "bottom 20%",
                    toggleActions: "play reverse play reverse",
                },
                x: -20,
                opacity: 0,
                duration: 0.6,
                ease: "power2.out"
            })
        })
        
        // Skill pills staggering internally per group
        gsap.utils.toArray<HTMLElement>('.skills-group').forEach((group) => {
            gsap.from(group.querySelectorAll('.skill-pill'), {
                scrollTrigger: {
                    trigger: group,
                    start: "top 90%",
                    end: "bottom 20%",
                    toggleActions: "play reverse play reverse",
                },
                scale: 0.8,
                opacity: 0,
                duration: 0.4,
                stagger: 0.05,
                ease: "back.out(1.5)"
            })
        })
        
        // Pill hover interactions
        gsap.utils.toArray<HTMLElement>('.skill-pill').forEach((pill) => {
            pill.addEventListener('mouseenter', () => {
                gsap.to(pill, { scale: 1.1, backgroundColor: "rgba(157, 0, 255, 0.2)", borderColor: "rgba(157, 0, 255, 0.5)", duration: 0.2, ease: "power2.out" })
            })
            pill.addEventListener('mouseleave', () => {
                gsap.to(pill, { scale: 1, backgroundColor: "rgba(255, 255, 255, 0.05)", borderColor: "rgba(255, 255, 255, 0.1)", duration: 0.2, ease: "power2.inOut" })
            })
        })

    }, { scope: containerRef })

    return (
        <section ref={containerRef} id="skills" className="min-h-screen py-20 px-8 flex flex-col items-center justify-center relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-[128px] pointer-events-none" />
            <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary/20 rounded-full blur-[128px] pointer-events-none" />

            <div className="skills-title mb-20 text-center">
                <SparklesText 
                    text="SKILLS" 
                    className="text-5xl md:text-7xl font-bold" 
                    textClassName="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary"
                />
            </div>

            <div className="w-full max-w-6xl space-y-16">
                {/* Soft Skills */}
                <div className="space-y-8">
                    <h3 className="skills-category text-3xl font-bold text-center md:text-left text-gray-100 border-b border-white/10 pb-4">
                        Soft Skills
                    </h3>
                    <div className="skills-group flex flex-wrap justify-center md:justify-start gap-4">
                        {softSkills.map((skill) => (
                            <SkillItem key={skill} skill={skill} />
                        ))}
                    </div>
                </div>

                {/* Technical Skills */}
                <div className="space-y-12">
                    <h3 className="skills-category text-3xl font-bold text-center md:text-left text-gray-100 border-b border-white/10 pb-4">
                        Technical Skills
                    </h3>

                    {/* Languages */}
                    <div className="space-y-4">
                        <h4 className="text-xl text-gray-400 font-semibold mb-4 text-center md:text-left">Languages</h4>
                        <div className="skills-group flex flex-wrap justify-center md:justify-start gap-4">
                            {technicalSkills.languages.map((skill) => (
                                <SkillItem key={skill} skill={skill} />
                            ))}
                        </div>
                    </div>

                    {/* Frameworks */}
                    <div className="space-y-4">
                        <h4 className="text-xl text-gray-400 font-semibold mb-4 text-center md:text-left">Frameworks, Libraries & Tools</h4>
                        <div className="skills-group flex flex-wrap justify-center md:justify-start gap-4">
                            {technicalSkills.frameworks.map((skill) => (
                                <SkillItem key={skill} skill={skill} />
                            ))}
                        </div>
                    </div>

                    {/* Domains */}
                    <div className="space-y-4">
                        <h4 className="text-xl text-gray-400 font-semibold mb-4 text-center md:text-left">Domains</h4>
                        <div className="skills-group flex flex-wrap justify-center md:justify-start gap-4">
                            {technicalSkills.domains.map((skill) => (
                                <SkillItem key={skill} skill={skill} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

function SkillItem({ skill }: { skill: string }) {
    return (
        <div className="skill-pill px-6 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm cursor-default will-change-transform relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700 ease-in-out" />
            <span className="text-lg text-gray-200">{skill}</span>
        </div>
    )
}
