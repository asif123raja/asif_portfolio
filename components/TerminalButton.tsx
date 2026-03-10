'use client'
import { useRef } from 'react'
import { Terminal } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

export default function TerminalButton() {
    const pathname = usePathname()
    const containerRef = useRef<HTMLDivElement>(null)
    const buttonRef = useRef<HTMLButtonElement>(null)

    // Initial scale-in animation
    useGSAP(() => {
        gsap.from(containerRef.current, {
            opacity: 0,
            scale: 0,
            duration: 0.5,
            delay: 1,
            ease: "back.out(1.5)"
        })
    }, [])

    // Hover effect
    useGSAP(() => {
        const btn = buttonRef.current;
        if (!btn) return;

        const handleMouseEnter = () => gsap.to(btn, { scale: 1.1, rotation: 10, duration: 0.3, ease: "power2.out" })
        const handleMouseLeave = () => gsap.to(btn, { scale: 1, rotation: 0, duration: 0.3, ease: "power2.inOut" })
        const handleMouseDown = () => gsap.to(btn, { scale: 0.9, duration: 0.1, ease: "power2.out" })
        const handleMouseUp = () => gsap.to(btn, { scale: 1.1, duration: 0.1, ease: "power2.inOut" })

        btn.addEventListener('mouseenter', handleMouseEnter)
        btn.addEventListener('mouseleave', handleMouseLeave)
        btn.addEventListener('mousedown', handleMouseDown)
        btn.addEventListener('mouseup', handleMouseUp)

        return () => {
            btn.removeEventListener('mouseenter', handleMouseEnter)
            btn.removeEventListener('mouseleave', handleMouseLeave)
            btn.removeEventListener('mousedown', handleMouseDown)
            btn.removeEventListener('mouseup', handleMouseUp)
        }
    }, [])

    // Don't show the button if we are already in the terminal
    if (pathname === '/terminal') return null

    return (
        <div ref={containerRef} className="fixed bottom-8 right-8 z-50 origin-center">
            <Link href="/terminal">
                <button
                    ref={buttonRef}
                    className="relative group flex items-center justify-center w-16 h-16 bg-black rounded-full border-2 border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.4)] overflow-hidden will-change-transform"
                >
                    <div className="absolute inset-0 bg-green-500/10 group-hover:bg-green-500/20 transition-colors" />
                    <Terminal size={32} className="text-green-500 group-hover:text-green-400 transition-colors relative z-10" />

                    {/* Tooltip */}
                    <div className="absolute right-full mr-4 px-3 py-1 bg-black border border-green-500 rounded text-green-500 text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-[0_0_10px_rgba(34,197,94,0.2)]">
                        open_terminal.exe
                    </div>
                </button>
            </Link>
        </div>
    )
}
