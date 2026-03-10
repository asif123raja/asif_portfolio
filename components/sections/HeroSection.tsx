'use client'
import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { TextPlugin } from 'gsap/TextPlugin'
import { SlowMo, ExpoScaleEase, RoughEase } from 'gsap/EasePack'
import { CustomEase } from 'gsap/CustomEase'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Flare, Asterisk, Star } from '../ui/Sparkles'

gsap.registerPlugin(useGSAP, TextPlugin, SlowMo, ExpoScaleEase, RoughEase, CustomEase, ScrollTrigger)

export default function HeroSection() {
    const ref = useRef<HTMLDivElement>(null)
    const textContainerRef = useRef<HTMLDivElement>(null)
    const profileRef = useRef<HTMLDivElement>(null)
    const scrollIndicatorRef = useRef<HTMLDivElement>(null)

    // Advanced GSAP Intro Animation
    useGSAP(() => {
        // Create a beautiful master timeline
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        // Hide initially without using strict CSS classes to avoid SSR/invisibility bugs
        gsap.set(".hero-letter", { y: 100, opacity: 0, rotationX: -90 });
        gsap.set(".hero-subtitle", { opacity: 0, filter: "blur(10px)", scale: 0.8 });
        gsap.set(".hero-cursor", { opacity: 0 });

        // Profile Intro
        gsap.from(profileRef.current, { scale: 0.9, opacity: 0, duration: 1, ease: "power2.out" })

        // 1. Reveal "ASIF" with a dynamic 3D flip + stagger
        tl.to(".hero-letter", {
            y: 0,
            opacity: 1,
            rotationX: 0,
            duration: 1.2,
            stagger: 0.15,
            ease: "back.out(1.7)", // Beautiful springy back ease
            delay: 0.2
        });

        // Sparkle floaty continuous movement for ASIF Letters
        tl.add(() => {
            gsap.to(".hero-letter", {
                y: "random(-8, 8)",
                rotationZ: "random(-4, 4)",
                rotationY: "random(-10, 10)",
                duration: "random(2, 4)",
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        }, "-=0.2");

        // Reveal the floating sparkles
        tl.from(".hero-sparkle", {
            scale: 0,
            opacity: 0,
            rotation: -180,
            duration: 0.8,
            stagger: 0.2,
            ease: "back.out(2)"
        }, "-=1.0");

        // Continuous spin/pulse for sparkles
        tl.add(() => {
            gsap.to(".hero-sparkle.flare", {
                rotation: "+=360",
                duration: 15,
                repeat: -1,
                ease: "none"
            });
            gsap.to(".hero-sparkle.asterisk", {
                rotation: "-=360",
                duration: 12,
                repeat: -1,
                ease: "none"
            });
            gsap.to(".hero-sparkle", {
                scale: 1.1,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        });

        // 2. Cinematic Subtitle blur reveal 
        tl.to(".hero-subtitle", {
            opacity: 1,
            filter: "blur(0px)",
            scale: 1,
            duration: 1.5,
            ease: SlowMo.ease.config(0.1, 0.7, false) // Cinematic SlowMo ease
        }, "-=0.5");

        // 3. Text Scramble/Typewriter Effect using TextPlugin
        tl.to(".hero-role-text", {
            duration: 2,
            text: {
                value: "Software Engineer", 
                delimiter: ""
            },
            ease: "none"
        }, "-=1.0");

        // 4. Blinking cursor effect
        tl.to(".hero-cursor", {
            opacity: 1,
            duration: 0.1,
            repeat: -1,
            yoyo: true,
            ease: "steps(1)"
        });

        // Scroll Indicator bobbing
        gsap.to(scrollIndicatorRef.current, {
            y: 10,
            duration: 1,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut"
        });

        // Parallax fading on scroll
        gsap.to(textContainerRef.current, {
            scrollTrigger: {
                trigger: ref.current,
                start: "top top",
                end: "bottom top",
                scrub: true
            },
            yPercent: 50,
            opacity: 0,
            ease: "none"
        });

    }, { scope: ref })

    return (
        <section ref={ref} className="h-screen w-full relative flex items-center justify-center overflow-hidden">
            {/* Background Gradient/Mesh */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-background/50 to-transparent z-0" />
            <div className="absolute top-0 left-0 w-full h-full opacity-30 z-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />

            {/* Content (Handled by GSAP on mount and scroll) */}
            <div
                className="relative z-10 text-center flex flex-col items-center justify-center p-8 will-change-transform"
                ref={textContainerRef}
            >
                {/* Profile Placeholder */}
                <div
                    ref={profileRef}
                    className="mb-8 relative will-change-transform"
                >
                    <div className="absolute -inset-1 rounded-full blur-xl bg-primary/30 animate-pulse"></div>
                    <div className="relative w-40 h-40 rounded-full border-2 border-primary/50 flex items-center justify-center bg-background/50 backdrop-blur-sm overflow-hidden shadow-[0_0_40px_rgba(157,0,255,0.4)]">
                        <span className="text-4xl hover:scale-110 transition-transform duration-300 cursor-pointer">👨‍💻</span>
                    </div>
                </div>

                {/* GSAP Animated Title Wrapper */}
                <div className="relative">
                    {/* Floating Sparkles for Hero */}
                    <div className="hero-sparkle flare absolute -top-12 -left-12 md:-left-24 w-16 h-16 md:w-32 md:h-32 opacity-80 mix-blend-screen pointer-events-none text-violet-500">
                        <Flare className="w-full h-full" />
                    </div>
                    <div className="hero-sparkle asterisk absolute -bottom-8 -right-8 md:-right-16 w-12 h-12 md:w-20 md:h-20 opacity-80 mix-blend-screen pointer-events-none text-pink-500">
                        <Asterisk className="w-full h-full" />
                    </div>
                    <div className="hero-sparkle star absolute -top-4 -right-4 w-6 h-6 md:w-10 md:h-10 opacity-60 mix-blend-screen pointer-events-none text-white">
                        <Star className="w-full h-full drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                    </div>

                    <h1 className="text-5xl md:text-8xl lg:text-9xl font-bold tracking-tighter overflow-visible flex flex-wrap justify-center gap-1 md:gap-3 perspective-1000 relative z-10">
                        <span className="hero-letter inline-block bg-clip-text text-transparent bg-gradient-to-br from-white to-gray-400 opacity-0 transform-gpu origin-bottom will-change-transform">A</span>
                        <span className="hero-letter inline-block bg-clip-text text-transparent bg-gradient-to-br from-white to-gray-400 opacity-0 transform-gpu origin-bottom will-change-transform">S</span>
                        <span className="hero-letter inline-block bg-clip-text text-transparent bg-gradient-to-br from-white to-gray-400 opacity-0 transform-gpu origin-bottom will-change-transform">I</span>
                        <span className="hero-letter inline-block bg-clip-text text-transparent bg-gradient-to-br from-white to-gray-400 opacity-0 transform-gpu origin-bottom will-change-transform">F</span>
                    </h1>
                </div>
                
                {/* GSAP Animated Subtitle with TextPlugin typing effect */}
                <div className="hero-subtitle opacity-0 flex items-center mt-6 text-primary font-light tracking-[0.3em] uppercase">
                    <span className="text-lg md:text-2xl hero-role-text min-h-[32px]"></span>
                    <span className="hero-cursor md:text-2xl font-bold ml-1 text-white">_</span>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div
                ref={scrollIndicatorRef}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 will-change-transform"
            >
                <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
                    <div className="w-1 h-2 bg-primary rounded-full" />
                </div>
            </div>
        </section>
    )
}
