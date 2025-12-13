'use client'

import { useTheme, Theme } from './ThemeContext'
import { motion, AnimatePresence } from 'framer-motion'
import { Monitor, Sun, Moon, Laptop2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    const [isOpen, setIsOpen] = useState(false)

    const themes: { id: Theme; label: string; icon: React.ReactNode }[] = [
        { id: 'default', label: 'Default', icon: <Monitor size={20} /> },
        { id: 'dark', label: 'Dark', icon: <Laptop2 size={20} /> },
        { id: 'light', label: 'Light', icon: <Sun size={20} /> },
    ]

    const currentIcon = themes.find(t => t.id === theme)?.icon

    return (
        <div className="relative z-50">
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-full bg-foreground/5 hover:bg-foreground/10 text-foreground/60 hover:text-foreground transition-colors border border-foreground/10"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                {currentIcon}
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-2 w-32 rounded-lg bg-background border border-foreground/10 backdrop-blur-xl overflow-hidden shadow-xl"
                        onMouseLeave={() => setIsOpen(false)}
                    >
                        {themes.map((t) => (
                            <button
                                key={t.id}
                                onClick={() => {
                                    setTheme(t.id)
                                    setIsOpen(false)
                                }}
                                className={cn(
                                    "w-full flex items-center gap-2 px-3 py-2 text-sm transition-colors text-left",
                                    theme === t.id
                                        ? "bg-primary/20 text-foreground font-medium"
                                        : "text-foreground/60 hover:bg-foreground/5 hover:text-foreground"
                                )}
                            >
                                {t.icon}
                                <span>{t.label}</span>
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
