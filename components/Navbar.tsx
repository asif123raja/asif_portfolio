'use client'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const navItems = [
    { name: 'Home', link: '#' },
    { name: 'Skills', link: '#skills' },
    { name: 'Projects', link: '#projects' },
    { name: 'Interests', link: '#interests' },
]

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

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
                "flex items-center gap-8 px-8 py-4 rounded-full border border-white/10 backdrop-blur-md transition-all duration-300 pointer-events-auto", // enable events on nav
                scrolled ? "bg-black/50 shadow-lg shadow-purple-500/10" : "bg-white/5"
            )}>
                {navItems.map((item) => (
                    <Link
                        key={item.name}
                        href={item.link}
                        className="text-sm font-medium text-gray-300 hover:text-white transition-colors relative group"
                    >
                        {item.name}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                    </Link>
                ))}
            </div>
        </motion.nav>
    )
}
