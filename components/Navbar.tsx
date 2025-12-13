'use client'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import ThemeToggle from './ThemeToggle'

const navItems = [
    { name: 'Home', link: '/' },
    { name: 'Skills', link: '/#skills' },
    { name: 'Projects', link: '/#projects' },
    { name: 'Interests', link: '/#interests' },
]

import { usePathname } from 'next/navigation'

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Hide navbar in terminal
    if (pathname === '/terminal') return null

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className={cn(
                "fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 transition-all duration-300 pointer-events-none", // pointer-events-none to let click through around
                scrolled ? "pt-4" : "pt-6"
            )}
        >
            <div className={cn(
                "flex items-center gap-8 px-8 py-4 rounded-full border border-foreground/10 backdrop-blur-md transition-all duration-300 pointer-events-auto", // enable events on nav
                scrolled ? "bg-background/80 shadow-lg shadow-primary/10" : "bg-foreground/5"
            )}>
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

            <div className="absolute right-8 top-6 pointer-events-auto">
                <ThemeToggle />
            </div>
        </motion.nav>
    )
}
