'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

export default function ProfileParallax() {
    const containerRef = useRef<HTMLDivElement>(null)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    })

    // Animation values
    // Opacity: Fade in quickly, stay visible, fade out at end
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

    // Image Y: Start from below (100vh), come to center, stay, then maybe leave?
    // We want it to "come above the upper layer". 
    // Starting at 0 scrolling to 0.5 brings it to view.
    const yImage = useTransform(scrollYProgress, [0, 0.4], ["100vh", "0vh"])
    const scaleImage = useTransform(scrollYProgress, [0.2, 0.6], [0.8, 1.1])

    // Text: Slide in from far sides
    const xLeft = useTransform(scrollYProgress, [0.1, 0.5], ["-100%", "0%"])
    const xRight = useTransform(scrollYProgress, [0.1, 0.5], ["100%", "0%"])

    return (
        // Overlap Hero by pulling margin-top negative. Tall height for pinning.
        <section ref={containerRef} className="relative z-30 h-[300vh] -mt-[100vh] pointer-events-none">
            <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">

                {/* 
                   Layout: Use a wide max-width container.
                   Use flex to space items: Text - Auto/Gap - Image - Auto/Gap - Text.
                */}
                <div className="w-full max-w-[90rem] px-4 md:px-10 flex items-center justify-between relative">

                    {/* LEFT TEXT (CODER) */}
                    <motion.h2
                        style={{ x: xLeft, opacity }}
                        className="text-3xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-500 hidden md:block z-20"
                    >
                        CODER
                    </motion.h2>

                    {/* IMAGE CONTAINER */}
                    {/* Centered absolutely or relatively in flex? Relatively works if we want consistent gap. 
                        But standard design often prefers image centered and text moving relative to it.
                    */}
                    <motion.div
                        style={{ y: yImage, scale: scaleImage, opacity }}
                        className="relative z-30 w-[300px] h-[400px] md:w-[450px] md:h-[600px] flex-shrink-0 mx-4"
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
                    </motion.div>

                    {/* RIGHT TEXT (DEVELOPER) */}
                    <motion.h2
                        style={{ x: xRight, opacity }}
                        className="text-3xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-l from-cyan-400 to-blue-600 hidden md:block z-20"
                    >
                        <span className="block text-right">DEVELOPER</span>
                        <span className="block text-right tracking-tighter"></span>
                    </motion.h2>
                </div>

                {/* Mobile Fallback */}
                <div className="md:hidden absolute w-full flex justify-between px-6 bottom-32 z-40">
                    <motion.h2 style={{ opacity }} className="text-3xl font-black text-purple-500">CODER</motion.h2>
                    <motion.h2 style={{ opacity }} className="text-3xl font-black text-blue-500">DEV</motion.h2>
                </div>

            </div>
        </section>
    )
}
