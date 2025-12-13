'use client'
import { motion } from 'framer-motion'
import { Terminal } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function TerminalButton() {
    const pathname = usePathname()

    // Don't show the button if we are already in the terminal
    if (pathname === '/terminal') return null

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="fixed bottom-8 right-8 z-50 origin-center"
        >
            <Link href="/terminal">
                <motion.button
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    whileTap={{ scale: 0.9 }}
                    className="relative group flex items-center justify-center w-16 h-16 bg-black rounded-full border-2 border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.4)] overflow-hidden"
                >
                    <div className="absolute inset-0 bg-green-500/10 group-hover:bg-green-500/20 transition-colors" />
                    <Terminal size={32} className="text-green-500 group-hover:text-green-400 transition-colors relative z-10" />

                    {/* Tooltip */}
                    <div className="absolute right-full mr-4 px-3 py-1 bg-black border border-green-500 rounded text-green-500 text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-[0_0_10px_rgba(34,197,94,0.2)]">
                        open_terminal.exe
                    </div>
                </motion.button>
            </Link>
        </motion.div>
    )
}
