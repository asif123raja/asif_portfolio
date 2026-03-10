'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

export default function CursorAnimation() {
    const cursorOutlineRef = useRef<HTMLDivElement>(null)
    const cursorDotRef = useRef<HTMLDivElement>(null)
    const [isHovering, setIsHovering] = useState(false)

    // Set up quickTo for high-performance following
    const xToOutline = useRef<gsap.QuickToFunc | null>(null);
    const yToOutline = useRef<gsap.QuickToFunc | null>(null);
    const xToDot = useRef<gsap.QuickToFunc | null>(null);
    const yToDot = useRef<gsap.QuickToFunc | null>(null);

    useGSAP(() => {
        // Center the origins so clientX/Y map exactly to the exact center of the cursor divs
        gsap.set(cursorOutlineRef.current, { xPercent: -50, yPercent: -50 });
        gsap.set(cursorDotRef.current, { xPercent: -50, yPercent: -50 });

        xToOutline.current = gsap.quickTo(cursorOutlineRef.current, "x", { duration: 0.2, ease: "power3.out" })
        yToOutline.current = gsap.quickTo(cursorOutlineRef.current, "y", { duration: 0.2, ease: "power3.out" })
        xToDot.current = gsap.quickTo(cursorDotRef.current, "x", { duration: 0.05, ease: "power1.out" })
        yToDot.current = gsap.quickTo(cursorDotRef.current, "y", { duration: 0.05, ease: "power1.out" })
    });

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            xToOutline.current?.(e.clientX)
            yToOutline.current?.(e.clientY)
            xToDot.current?.(e.clientX)
            yToDot.current?.(e.clientY)
        }

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest('a, button')) {
                setIsHovering(true)
            }
        }
        const handleMouseOut = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest('a, button')) {
                setIsHovering(false)
            }
        }

        window.addEventListener('mousemove', moveCursor)
        window.addEventListener('mouseover', handleMouseOver)
        window.addEventListener('mouseout', handleMouseOut)

        return () => {
            window.removeEventListener('mousemove', moveCursor)
            window.removeEventListener('mouseover', handleMouseOver)
            window.removeEventListener('mouseout', handleMouseOut)
        }
    }, [])

    // Animate width/height and color when hovering over buttons
    useGSAP(() => {
        gsap.to(cursorOutlineRef.current, {
            width: isHovering ? 64 : 32,
            height: isHovering ? 64 : 32,
            backgroundColor: isHovering ? 'rgba(157, 0, 255, 0.1)' : 'transparent',
            duration: 0.3,
            ease: "power2.out"
        })
    }, [isHovering])

    return (
        <>
            <div
                ref={cursorOutlineRef}
                className="fixed left-0 top-0 rounded-full border border-primary pointer-events-none z-[9999] mix-blend-difference hidden md:block"
                style={{ width: 32, height: 32 }}
            />
            <div
                ref={cursorDotRef}
                className="fixed left-0 top-0 w-2 h-2 bg-secondary rounded-full pointer-events-none z-[9999] hidden md:block"
            />
        </>
    )
}
