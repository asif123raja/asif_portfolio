'use client'
import React, { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Flare, Asterisk, Star } from './Sparkles'

gsap.registerPlugin(ScrollTrigger)

interface SparklesTextProps {
    text: string
    className?: string
    textClassName?: string
    colors?: { first: string, second: string }
}

export default function SparklesText({ text, className = "", textClassName = "", colors = { first: "#A855F7", second: "#EC4899" } }: SparklesTextProps) {
    const containerRef = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        if (!containerRef.current) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 85%",
                end: "bottom 15%",
                toggleActions: "play reverse play reverse",
            }
        });

        // 1. Text drop in
        tl.from(".sparkle-char", {
            y: 40,
            opacity: 0,
            rotationX: -90,
            stagger: 0.05,
            duration: 0.8,
            ease: "back.out(1.5)"
        });

        // 2. Letters jiggle / float continuously
        tl.add(() => {
            gsap.to(".sparkle-char", {
                y: "random(-4, 4)",
                rotationZ: "random(-3, 3)",
                rotationY: "random(-5, 5)",
                duration: "random(1.5, 3)",
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        }, "-=0.2");

        // 3. Sparkles pop in
        tl.from(".sparkle-svg", {
            scale: 0,
            opacity: 0,
            rotation: -180,
            stagger: 0.1,
            duration: 0.6,
            ease: "back.out(2)"
        }, "-=0.8");

        // 4. Sparkles continuous rotation/pulse
        tl.add(() => {
            gsap.to(".sparkle-svg.flare", {
                rotation: "+=360",
                duration: 8,
                repeat: -1,
                ease: "none"
            });
            gsap.to(".sparkle-svg.asterisk", {
                rotation: "-=360",
                duration: 10,
                repeat: -1,
                ease: "none"
            });
            gsap.to(".sparkle-svg", {
                scale: 1.2,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        });

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className={`relative inline-block ${className}`}>
            {/* Sparkles */}
            <div className="sparkle-svg flare absolute -top-8 -left-8 w-12 h-12 opacity-80 mix-blend-screen pointer-events-none" style={{ color: colors.first }}>
                <Flare className="w-full h-full" />
            </div>
            <div className="sparkle-svg asterisk absolute -bottom-6 -right-6 w-10 h-10 opacity-80 mix-blend-screen pointer-events-none" style={{ color: colors.second }}>
                <Asterisk className="w-full h-full" />
            </div>
            <div className="sparkle-svg star absolute -top-4 -right-12 w-6 h-6 opacity-60 mix-blend-screen pointer-events-none text-white">
                <Star className="w-full h-full drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
            </div>
            
            {/* Text Characters */}
            <span className="relative z-10 font-bold flex flex-wrap justify-center overflow-visible">
                {text.split("").map((char, i) => (
                    <span 
                        key={i} 
                        className={`sparkle-char inline-block will-change-transform perspective-1000 ${textClassName}`}
                    >
                        {char === " " ? "\u00A0" : char}
                    </span>
                ))}
            </span>
        </div>
    )
}
