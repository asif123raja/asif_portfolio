'use client'
import { useRef } from 'react'
import { BookOpen, ShieldAlert } from 'lucide-react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SparklesText from '../ui/SparklesText'

gsap.registerPlugin(ScrollTrigger)

export default function PublicationsSection() {
    const containerRef = useRef<HTMLElement>(null)

    useGSAP(() => {
        gsap.from(".pub-title", {
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

        gsap.from(".pub-card", {
            scrollTrigger: {
                trigger: ".pub-card",
                start: "top 85%",
                end: "bottom 20%",
                toggleActions: "play reverse play reverse",
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            delay: 0.2,
            ease: "power2.out"
        })
    }, { scope: containerRef })

    return (
        <section ref={containerRef} id="publications" className="min-h-screen py-24 px-6 md:px-12 flex flex-col items-center justify-center relative bg-transparent overflow-hidden">
            {/* Background glow for the section */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] bg-blue-900/10 rounded-full blur-[128px] pointer-events-none" />

            <div className="pub-title mb-16 text-center">
                <SparklesText 
                    text="PUBLICATIONS" 
                    className="text-5xl md:text-7xl font-bold" 
                    textClassName="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600"
                    colors={{ first: "#60a5fa", second: "#818cf8" }}
                />
            </div>

            <div className="pub-card relative max-w-5xl w-full">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-3xl blur opacity-20"></div>
                <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-3xl shadow-2xl flex flex-col md:flex-row gap-8 items-start">
                    
                    <div className="hidden md:flex shrink-0 w-24 h-24 rounded-2xl bg-blue-500/10 border border-blue-500/20 items-center justify-center">
                        <BookOpen className="w-12 h-12 text-blue-400" />
                    </div>

                    <div className="flex-1 space-y-6">
                        <div className="space-y-2">
                            <div className="flex items-center gap-3 mb-2 md:hidden">
                                <BookOpen className="w-8 h-8 text-blue-400" />
                                <span className="text-sm font-semibold text-blue-400 tracking-wider uppercase">IEEE 2026</span>
                            </div>
                            <h3 className="text-2xl md:text-4xl font-bold text-white leading-tight">
                                Intrusion Detection System using AI & ML in Cybersecurity
                            </h3>
                            <p className="text-gray-400 font-medium text-lg">IEMENtech 2026, IEEE</p>
                        </div>

                        <ul className="space-y-4 text-gray-300">
                            <li className="flex items-start gap-3">
                                <ShieldAlert className="w-6 h-6 shrink-0 text-amber-400 mt-1" />
                                <span className="text-base md:text-lg leading-relaxed">
                                    Fine-tuned <strong>Phi-3-mini</strong> using LoRA and Adversarial Regularization to enhance threat detection capabilities.
                                </span>
                            </li>
                            <li className="flex items-start gap-3">
                                <ShieldAlert className="w-6 h-6 shrink-0 text-amber-400 mt-1" />
                                <span className="text-base md:text-lg leading-relaxed">
                                    Built a highly efficient Structured-to-Text engine designed specifically to provide explainable and high-accuracy network threat detection.
                                </span>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
        </section>
    )
}
