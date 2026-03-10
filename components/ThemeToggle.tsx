'use client'

import { useTheme } from './ThemeContext'
import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme()
    const buttonRef = useRef<HTMLButtonElement>(null)
    const sunRef = useRef<SVGSVGElement>(null)
    const moonRef = useRef<SVGSVGElement>(null)

    const isDark = theme === 'dark'

    // Animate icon swap on theme change
    useEffect(() => {
        if (!sunRef.current || !moonRef.current) return

        if (isDark) {
            // Show moon, hide sun
            gsap.to(sunRef.current, { scale: 0, rotation: -90, opacity: 0, duration: 0.4, ease: "back.in(2)" })
            gsap.to(moonRef.current, { scale: 1, rotation: 0, opacity: 1, duration: 0.4, ease: "back.out(2)", delay: 0.15 })
        } else {
            // Show sun, hide moon
            gsap.to(moonRef.current, { scale: 0, rotation: 90, opacity: 0, duration: 0.4, ease: "back.in(2)" })
            gsap.to(sunRef.current, { scale: 1, rotation: 0, opacity: 1, duration: 0.4, ease: "back.out(2)", delay: 0.15 })
        }
    }, [isDark])

    // Button hover/tap
    useEffect(() => {
        const btn = buttonRef.current
        if (!btn) return

        const enter = () => gsap.to(btn, { scale: 1.15, duration: 0.2, ease: "power2.out" })
        const leave = () => gsap.to(btn, { scale: 1, duration: 0.2, ease: "power2.inOut" })
        const down = () => gsap.to(btn, { scale: 0.9, duration: 0.1, ease: "power2.out" })
        const up = () => gsap.to(btn, { scale: 1.15, duration: 0.1, ease: "power2.inOut" })

        btn.addEventListener('mouseenter', enter)
        btn.addEventListener('mouseleave', leave)
        btn.addEventListener('mousedown', down)
        btn.addEventListener('mouseup', up)

        return () => {
            btn.removeEventListener('mouseenter', enter)
            btn.removeEventListener('mouseleave', leave)
            btn.removeEventListener('mousedown', down)
            btn.removeEventListener('mouseup', up)
        }
    }, [])

    return (
        <button
            ref={buttonRef}
            onClick={toggleTheme}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            className="relative p-2.5 rounded-full bg-foreground/5 hover:bg-foreground/10 text-foreground/70 hover:text-foreground transition-colors border border-foreground/10 will-change-transform w-10 h-10 flex items-center justify-center overflow-hidden"
        >
            {/* Sun Icon */}
            <svg
                ref={sunRef}
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="absolute"
                style={{ opacity: isDark ? 0 : 1, transform: isDark ? 'scale(0) rotate(-90deg)' : 'scale(1) rotate(0deg)' }}
            >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2" />
                <path d="M12 20v2" />
                <path d="m4.93 4.93 1.41 1.41" />
                <path d="m17.66 17.66 1.41 1.41" />
                <path d="M2 12h2" />
                <path d="M20 12h2" />
                <path d="m6.34 17.66-1.41 1.41" />
                <path d="m19.07 4.93-1.41 1.41" />
            </svg>

            {/* Moon Icon */}
            <svg
                ref={moonRef}
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="absolute"
                style={{ opacity: isDark ? 1 : 0, transform: isDark ? 'scale(1) rotate(0deg)' : 'scale(0) rotate(90deg)' }}
            >
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
            </svg>
        </button>
    )
}
