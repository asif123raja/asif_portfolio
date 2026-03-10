'use client'
import { useRef } from 'react'
import { Palette, Trophy, Target, Grid3X3, Dumbbell, PlaySquare, Film } from 'lucide-react'
import PathMorphing from '../ui/PathMorphing'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SparklesText from '../ui/SparklesText'

gsap.registerPlugin(ScrollTrigger)

const interests = [
    { name: "Drawing", icon: Palette },
    { name: "Football", icon: Trophy },
    { name: "Cricket", icon: Target },
    { name: "Chess", icon: Grid3X3 },
    { name: "Workout", icon: Dumbbell },
    { name: "Webseries", icon: PlaySquare },
    { name: "Movies", icon: Film },
]

export default function InterestsSection() {
    const containerRef = useRef<HTMLElement>(null)

    useGSAP(() => {
        // Title reveal
        gsap.from(".interests-header", {
            scrollTrigger: {
                trigger: ".interests-header",
                start: "top 85%",
                end: "bottom 20%",
                toggleActions: "play reverse play reverse",
            },
            scale: 0.5,
            opacity: 0,
            duration: 0.8,
            ease: "back.out(1.5)"
        })

        // Grid items reveal
        gsap.from(".interest-item", {
            scrollTrigger: {
                trigger: ".interests-grid",
                start: "top 85%",
                end: "bottom 20%",
                toggleActions: "play reverse play reverse",
            },
            y: 20,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out"
        })
    }, { scope: containerRef })

    return (
        <section ref={containerRef} id="interests" className="min-h-screen py-20 px-8 flex flex-col items-center justify-center relative bg-transparent">
            
            <PathMorphing />

            <div className="interests-header mb-20 text-center will-change-transform">
                <SparklesText 
                    text="INTERESTS" 
                    className="text-5xl md:text-7xl font-bold" 
                    textClassName="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary"
                    colors={{ first: "#f472b6", second: "#c084fc" }}
                />
            </div>

            <div className="interests-grid grid grid-cols-2 md:grid-cols-3 gap-12">
                {interests.map((item, index) => (
                    <div
                        key={item.name}
                        className="interest-item flex flex-col items-center gap-4 group cursor-pointer will-change-transform"
                    >
                        <div className="w-24 h-24 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/50 transition-all duration-300 relative overflow-hidden">
                            <div className="absolute inset-0 bg-primary/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <item.icon className="w-10 h-10 text-foreground/40 group-hover:text-foreground transition-colors relative z-10" />
                        </div>
                        <span className="text-gray-400 font-medium group-hover:text-primary transition-colors">{item.name}</span>
                    </div>
                ))}
            </div>
        </section>
    )
}
