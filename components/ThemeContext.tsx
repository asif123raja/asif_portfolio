'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

export type Theme = 'dark' | 'light'

interface ThemeContextType {
    theme: Theme
    setTheme: (theme: Theme) => void
    toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>('dark')
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as Theme
        if (savedTheme === 'light' || savedTheme === 'dark') {
            setTheme(savedTheme)
        }
        setMounted(true)
    }, [])

    useEffect(() => {
        if (!mounted) return
        document.documentElement.setAttribute('data-theme', theme)
        localStorage.setItem('theme', theme)
    }, [theme, mounted])

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark')
    }

    if (!mounted) {
        return null
    }

    return (
        <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    const context = useContext(ThemeContext)
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }
    return context
}
