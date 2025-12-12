'use client'
import { motion, useSpring, useMotionValue } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function CursorAnimation() {
    const cursorX = useMotionValue(-100)
    const cursorY = useMotionValue(-100)

    const springConfig = { damping: 20, stiffness: 150, mass: 0.5 }
    const cursorXSpring = useSpring(cursorX, springConfig)
    const cursorYSpring = useSpring(cursorY, springConfig)

    const [isHovering, setIsHovering] = useState(false)

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX - (isHovering ? 32 : 16))
            cursorY.set(e.clientY - (isHovering ? 32 : 16))
        }

        // Add hover listeners for interactive elements
        const handleMouseOver = (e: MouseEvent) => {
            if ((e.target as HTMLElement).tagName === 'A' || (e.target as HTMLElement).tagName === 'BUTTON') {
                setIsHovering(true)
            }
        }
        const handleMouseOut = (e: MouseEvent) => {
            if ((e.target as HTMLElement).tagName === 'A' || (e.target as HTMLElement).tagName === 'BUTTON') {
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
    }, [cursorX, cursorY, isHovering])

    return (
        <>
            <motion.div
                className="fixed left-0 top-0 rounded-full border border-primary pointer-events-none z-[9999] mix-blend-difference"
                animate={{
                    width: isHovering ? 64 : 32,
                    height: isHovering ? 64 : 32,
                    backgroundColor: isHovering ? 'rgba(157, 0, 255, 0.1)' : 'transparent',
                }}
                style={{
                    translateX: cursorXSpring,
                    translateY: cursorYSpring
                }}
            />
            <motion.div
                className="fixed left-0 top-0 w-2 h-2 bg-secondary rounded-full pointer-events-none z-[9999]"
                style={{
                    translateX: cursorX,
                    translateY: cursorY,
                    marginLeft: isHovering ? 31 : 15,
                    marginTop: isHovering ? 31 : 15
                }}
            />
        </>
    )
}
