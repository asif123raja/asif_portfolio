'use client'

import { useRef } from 'react'
import { FileText, ArrowRight, Wrench } from 'lucide-react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const utilities = [
    {
        title: "PDF Tools",
        description: "Convert PDF to Word, Word to PDF, and more.",
        icon: FileText,
        href: "/utilities/pdf-tools",
        color: "text-red-400",
        bgColor: "bg-red-400/10"
    },
    // Future utilities can be added here
]

export default function UtilitiesSection() {
    const containerRef = useRef<HTMLElement>(null)

    useGSAP(() => {
        // Main container reveal
        gsap.from(".util-header", {
            scrollTrigger: {
                trigger: ".util-header",
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play reverse play reverse",
            },
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        })

        // Grid items reveal
        gsap.from(".util-card", {
            scrollTrigger: {
                trigger: ".util-grid",
                start: "top 85%",
                end: "bottom 20%",
                toggleActions: "play reverse play reverse",
            },
            y: 20,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out"
        })
    }, { scope: containerRef })

    return (
        <section ref={containerRef} className="py-20 relative z-10">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto space-y-12">
                    <div className="util-header text-center space-y-4">
                        <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                            Utilities
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            A collection of helpful tools and utilities for everyday tasks.
                        </p>
                    </div>

                    <div className="util-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {utilities.map((item, index) => (
                            <Link key={index} href={item.href}>
                                <div className="util-card group relative h-full will-change-transform">
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl blur-xl transition-all duration-300 group-hover:blur-2xl opacity-0 group-hover:opacity-100" />

                                    <div className="relative h-full bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all duration-300">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className={`p-3 rounded-lg ${item.bgColor}`}>
                                                <item.icon className={`w-6 h-6 ${item.color}`} />
                                            </div>
                                            <Wrench className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" />
                                        </div>

                                        <h3 className="text-xl font-bold text-gray-100 mb-2 group-hover:text-blue-400 transition-colors">
                                            {item.title}
                                        </h3>

                                        <p className="text-gray-400 mb-4 line-clamp-2">
                                            {item.description}
                                        </p>

                                        <div className="flex items-center text-sm font-medium text-gray-500 group-hover:text-white transition-colors mt-auto">
                                            Open Tool
                                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
