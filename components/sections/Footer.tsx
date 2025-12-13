'use client'
import { motion } from 'framer-motion'
import { Github, Linkedin, Instagram, Mail, Phone, ExternalLink } from 'lucide-react'

const socialLinks = [
    { name: 'GitHub', icon: Github, href: 'https://github.com/asif123raja' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/in/asiful-ameen-244695255' },
    { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/iam_asif_001' },
]

export default function Footer() {
    return (
        <footer className="relative bg-background pt-20 pb-10 px-4 md:px-20 border-t border-foreground/10 overflow-hidden text-foreground">
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[500px] h-[500px] bg-primary/20 blur-[100px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10 relative z-10">
                {/* Brand / Contact */}
                <div className="text-center md:text-left">
                    <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-4">
                        Let's Connect
                    </h3>
                    <div className="flex flex-col gap-2 text-foreground/60">
                        <a href="mailto:asifulameen208@gmail.com" className="hover:text-foreground transition-colors flex items-center gap-2 justify-center md:justify-start">
                            <Mail size={18} /> asifulameen208@gmail.com
                        </a>
                        <a href="tel:+919800783055" className="hover:text-foreground transition-colors flex items-center gap-2 justify-center md:justify-start">
                            <Phone size={18} /> +91 9800783055
                        </a>
                    </div>
                </div>

                {/* Resume Button */}
                <div className="flex flex-col items-center md:items-end gap-4">
                    <motion.a
                        href="/ASIF_resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 bg-foreground/10 hover:bg-foreground/20 border border-foreground/10 rounded-full text-foreground font-medium backdrop-blur-sm transition-all flex items-center gap-2 group"
                    >
                        <span>View Resume</span>
                        <ExternalLink size={18} className="text-foreground/60 group-hover:text-foreground transition-colors" />
                    </motion.a>
                    <a href="/ASIF_resume.pdf" download className="text-sm text-foreground/60 hover:text-primary transition-colors flex items-center gap-1">
                        Download PDF
                    </a>
                </div>

                {/* Social Links */}
                <div className="flex gap-6">
                    {socialLinks.map((link) => (
                        <motion.a
                            key={link.name}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ y: -5, scale: 1.1 }}
                            className="p-3 rounded-full bg-foreground/5 border border-foreground/10 hover:bg-foreground/20 hover:border-primary/50 transition-all group"
                        >
                            <link.icon className="w-6 h-6 text-foreground/60 group-hover:text-foreground transition-colors" />
                        </motion.a>
                    ))}
                </div>
            </div>

            {/* Copyright */}
            <div className="mt-20 text-center text-gray-600 text-sm">
                <p>© {new Date().getFullYear()} Asif. All rights reserved.</p>
            </div>
        </footer>
    )
}
