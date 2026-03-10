'use client'
import { useRef } from 'react'
import { Github, Linkedin, Instagram, Mail, Phone, ExternalLink } from 'lucide-react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

const socialLinks = [
    { name: 'GitHub', icon: Github, href: 'https://github.com/asif123raja' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/in/asiful-ameen-244695255' },
    { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/iam_asif_001' },
]

export default function Footer() {
    const resumeBtnRef = useRef<HTMLAnchorElement>(null)
    const socialRefs = useRef<(HTMLAnchorElement | null)[]>([])

    useGSAP(() => {
        // Resume button hover logic
        const btn = resumeBtnRef.current
        if (btn) {
            btn.addEventListener('mouseenter', () => gsap.to(btn, { scale: 1.05, duration: 0.2, ease: "power2.out" }))
            btn.addEventListener('mouseleave', () => gsap.to(btn, { scale: 1, duration: 0.2, ease: "power2.inOut" }))
            btn.addEventListener('mousedown', () => gsap.to(btn, { scale: 0.95, duration: 0.1, ease: "power2.out" }))
            btn.addEventListener('mouseup', () => gsap.to(btn, { scale: 1.05, duration: 0.1, ease: "power2.inOut" }))
        }

        // Social links hover logic
        socialRefs.current.forEach((el) => {
            if (el) {
                el.addEventListener('mouseenter', () => gsap.to(el, { y: -5, scale: 1.1, duration: 0.2, ease: "power2.out" }))
                el.addEventListener('mouseleave', () => gsap.to(el, { y: 0, scale: 1, duration: 0.2, ease: "power2.inOut" }))
            }
        })
    }, [])

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
                    <a
                        ref={resumeBtnRef}
                        href="/ASIF_resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-foreground/10 hover:bg-foreground/20 border border-foreground/10 rounded-full text-foreground font-medium backdrop-blur-sm transition-colors flex items-center gap-2 group will-change-transform"
                    >
                        <span>View Resume</span>
                        <ExternalLink size={18} className="text-foreground/60 group-hover:text-foreground transition-colors" />
                    </a>
                    <a href="/ASIF_resume.pdf" download className="text-sm text-foreground/60 hover:text-primary transition-colors flex items-center gap-1">
                        Download PDF
                    </a>
                </div>

                {/* Social Links */}
                <div className="flex gap-6">
                    {socialLinks.map((link, i) => (
                        <a
                            key={link.name}
                            ref={(el) => { socialRefs.current[i] = el }}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 rounded-full bg-foreground/5 border border-foreground/10 hover:bg-foreground/20 hover:border-primary/50 transition-colors group will-change-transform"
                        >
                            <link.icon className="w-6 h-6 text-foreground/60 group-hover:text-foreground transition-colors" />
                        </a>
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
