'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import ThemeToggle from './ThemeToggle'
import { Menu, X } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

const navItems = [
    { name: 'Projects', link: '/#projects' },
    { name: 'Publications', link: '/#publications' },
    { name: 'Activities', link: '/#extra-curricular' },
    { name: 'Interests', link: '/#interests' },
]

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const pathname = usePathname()
    
    const navRef = useRef<HTMLElement>(null)
    const mobileMenuRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useGSAP(() => {
        // Initial navbar slide down on page load
        gsap.from(navRef.current, {
            y: -100,
            duration: 0.8,
            ease: "power3.out"
        })
    }, [])

    useGSAP(() => {
        // Handle mobile menu opening and closing elegantly
        if (mobileMenuOpen) {
            gsap.to(mobileMenuRef.current, { 
                autoAlpha: 1, 
                duration: 0.3, 
                ease: "power2.out" 
            })
            // Stagger nav links flying in
            gsap.fromTo(".mobile-link", 
                { y: 30, opacity: 0 }, 
                { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, delay: 0.1, ease: "back.out(1.2)" }
            )
        } else {
            gsap.to(mobileMenuRef.current, { 
                autoAlpha: 0, 
                duration: 0.3, 
                ease: "power2.in" 
            })
        }
    }, [mobileMenuOpen])

    // Hide navbar in terminal
    if (pathname === '/terminal') return null

    return (
        <>
            <nav
                ref={navRef}
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 transition-all duration-300 pointer-events-none px-4 md:px-0",
                    scrolled ? "pt-4" : "pt-6"
                )}
            >
                {/* Desktop and Mobile Container */}
                <div className={cn(
                    "flex items-center justify-between md:justify-center w-full md:w-auto md:gap-8 px-6 md:px-8 py-4 rounded-full border border-foreground/10 backdrop-blur-md transition-all duration-300 pointer-events-auto",
                    scrolled ? "bg-background/80 shadow-lg shadow-primary/10" : "bg-foreground/5"
                )}>
                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.link}
                                className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors relative group"
                            >
                                {item.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Branding / Menu Button */}
                    <div className="flex md:hidden items-center justify-between w-full">
                        <span className="font-bold text-foreground">MENU</span>
                        <div className="flex items-center gap-3">
                            <ThemeToggle />
                            <button 
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="p-1 text-foreground/80 hover:text-foreground transition-colors"
                                aria-label="Toggle menu"
                            >
                                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                            </button>
                        </div>
                    </div>

                    {/* Desktop Theme Toggle */}
                    <div className="hidden md:block">
                        <ThemeToggle />
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div
                ref={mobileMenuRef}
                className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl pt-32 px-6 md:hidden flex flex-col pointer-events-auto invisible opacity-0"
            >
                <div className="flex flex-col gap-8 items-center mt-10">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.link}
                            onClick={() => setMobileMenuOpen(false)}
                            className="mobile-link text-3xl font-light text-foreground/80 hover:text-primary transition-colors tracking-widest"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            </div>
        </>
    )
}
