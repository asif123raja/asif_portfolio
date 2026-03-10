'use client'
import { useRef } from 'react'
import { Trophy, Medal, Palette } from 'lucide-react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SparklesText from '../ui/SparklesText'

gsap.registerPlugin(ScrollTrigger)

const activities = [
    {
        title: "Football Tournament Champion",
        description: "Won the Inter-Section Football Tournament at Institute of Engineering and Management.",
        icon: Trophy,
        color: "text-emerald-400",
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/20"
    },
    {
        title: "Badminton Semi-Finalist",
        description: "Reached Semi-Finals in Badminton Doubles Tournament, demonstrating strong teamwork and agility.",
        icon: Medal,
        color: "text-sky-400",
        bg: "bg-sky-500/10",
        border: "border-sky-500/20"
    },
    {
        title: "Art Exhibition Showcase",
        description: "Organized and showcased personal artwork in the Art Exhibition at IEMPACT College Fest.",
        icon: Palette,
        color: "text-pink-400",
        bg: "bg-pink-500/10",
        border: "border-pink-500/20"
    }
]

export default function ExtraCurricularSection() {
    const containerRef = useRef<HTMLElement>(null)

    useGSAP(() => {
        gsap.from(".ec-title", {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play reverse play reverse",
            },
            y: -30,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        })

        gsap.from(".ec-card", {
            scrollTrigger: {
                trigger: ".ec-card-container",
                start: "top 85%",
                end: "bottom 20%",
                toggleActions: "play reverse play reverse",
            },
            y: 30,
            opacity: 0,
            duration: 0.5,
            stagger: 0.15,
            ease: "power2.out"
        })

        // Hover interactions
        gsap.utils.toArray<HTMLElement>('.ec-card').forEach((card) => {
            card.addEventListener('mouseenter', () => gsap.to(card, { y: -10, duration: 0.3, ease: "power2.out" }))
            card.addEventListener('mouseleave', () => gsap.to(card, { y: 0, duration: 0.3, ease: "power2.inOut" }))
        })

    }, { scope: containerRef })

    return (
        <section ref={containerRef} id="extra-curricular" className="min-h-screen py-24 px-6 md:px-12 flex flex-col items-center justify-center relative bg-transparent overflow-hidden">
            <div className="ec-title mb-16 text-center w-full">
                <SparklesText 
                    text="Extra-Curricular" 
                    className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight" 
                    textClassName="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-600"
                    colors={{ first: "#34d399", second: "#0d9488" }}
                />
            </div>

            <div className="ec-card-container grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl w-full">
                {activities.map((item, index) => (
                    <div
                        key={index}
                        className={`ec-card p-8 rounded-3xl border ${item.border} ${item.bg} backdrop-blur-sm flex flex-col items-start gap-6 relative group overflow-hidden will-change-transform`}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        <div className={`p-4 rounded-2xl bg-black/50 border ${item.border} backdrop-blur-md`}>
                            <item.icon className={`w-8 h-8 ${item.color}`} />
                        </div>
                        
                        <div className="space-y-3 z-10">
                            <h3 className="text-xl font-bold text-white">{item.title}</h3>
                            <p className="text-gray-400 leading-relaxed">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
