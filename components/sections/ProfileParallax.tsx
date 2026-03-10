'use client'
import { useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SparklesText from '../ui/SparklesText'

gsap.registerPlugin(ScrollTrigger)

export default function ProfileParallax() {
    const containerRef = useRef<HTMLDivElement>(null)
    const textLeftRef = useRef<HTMLHeadingElement>(null)
    const textRightRef = useRef<HTMLHeadingElement>(null)
    const mobileLeftRef = useRef<HTMLHeadingElement>(null)
    const mobileRightRef = useRef<HTMLHeadingElement>(null)
    const imageContainerRef = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        // Create a master timeline locked to scroll progress
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom bottom", 
                scrub: true,
            }
        });

        // Set initial states to match framer motion's 0 progress
        gsap.set([textLeftRef.current, textRightRef.current, imageContainerRef.current, mobileLeftRef.current, mobileRightRef.current], { opacity: 0 });
        gsap.set(imageContainerRef.current, { y: "100vh", scale: 0.8 });
        gsap.set(textLeftRef.current, { x: "-100%" });
        gsap.set(textRightRef.current, { x: "100%" });

        // Build the timeline equivalent (0 to 1 progress mapping)
        // 0.0 -> 0.2: Fade in all elements
        tl.to([textLeftRef.current, textRightRef.current, imageContainerRef.current, mobileLeftRef.current, mobileRightRef.current], {
            opacity: 1,
            ease: "none",
            duration: 0.2 // Represents 20% of scroll
        }, 0);

        // 0.0 -> 0.4: Image Y translation 100vh -> 0vh
        tl.to(imageContainerRef.current, {
            y: "0vh",
            ease: "none",
            duration: 0.4
        }, 0);

        // 0.1 -> 0.5: Text X translation
        tl.to(textLeftRef.current, {
            x: "0%",
            ease: "none",
            duration: 0.4
        }, 0.1);
        
        tl.to(textRightRef.current, {
            x: "0%",
            ease: "none",
            duration: 0.4
        }, 0.1);

        // 0.2 -> 0.6: Image Scale 0.8 -> 1.1
        tl.to(imageContainerRef.current, {
            scale: 1.1,
            ease: "none",
            duration: 0.4
        }, 0.2);

        // 0.8 -> 1.0: Fade out all elements
        tl.to([textLeftRef.current, textRightRef.current, imageContainerRef.current, mobileLeftRef.current, mobileRightRef.current], {
            opacity: 0,
            ease: "none",
            duration: 0.2
        }, 0.8);

    }, { scope: containerRef });

    return (
        // Overlap Hero by pulling margin-top negative. Tall height for pinning.
        <section ref={containerRef} className="relative z-30 h-[300vh] -mt-[100vh] pointer-events-none">
            <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">

                <div className="w-full max-w-[90rem] px-4 md:px-10 flex items-center justify-between relative">

                    {/* LEFT TEXT (CODER) */}
                    <h2
                        ref={textLeftRef}
                        className="hidden md:block z-20 will-change-transform"
                    >
                        <SparklesText 
                            text="CODER" 
                            className="text-3xl md:text-6xl font-black" 
                            textClassName="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-500" 
                        />
                    </h2>

                    {/* IMAGE CONTAINER */}
                    <div
                        ref={imageContainerRef}
                        className="relative z-30 w-[300px] h-[400px] md:w-[450px] md:h-[600px] flex-shrink-0 mx-4 will-change-transform"
                    >
                        {/* Image Wrapper */}
                        <div className="absolute inset-0 bg-transparent">
                            <Image
                                src="/asif_img.png"
                                alt="Asif"
                                fill
                                className="object-cover mix-blend-screen"
                                priority
                            />
                        </div>
                        {/* Glow */}
                        <div className="absolute inset-0 bg-indigo-500/30 blur-[120px] -z-10 rounded-full" />
                    </div>

                    {/* RIGHT TEXT (DEVELOPER) */}
                    <h2
                        ref={textRightRef}
                        className="hidden md:block z-20 will-change-transform"
                    >
                        <SparklesText 
                            text="DEVELOPER" 
                            className="text-3xl md:text-6xl font-black text-right block" 
                            textClassName="text-transparent bg-clip-text bg-gradient-to-l from-cyan-400 to-blue-600"
                            colors={{ first: "#06b6d4", second: "#3b82f6" }}
                        />
                    </h2>
                </div>

                {/* Mobile Fallback */}
                <div className="md:hidden absolute w-full flex justify-between px-6 bottom-32 z-40">
                    <h2 ref={mobileLeftRef} className="text-3xl font-black text-purple-500 will-change-transform">CODER</h2>
                    <h2 ref={mobileRightRef} className="text-3xl font-black text-blue-500 will-change-transform">DEV</h2>
                </div>

            </div>
        </section>
    )
}
