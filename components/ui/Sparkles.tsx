'use client'
import React from 'react'

export const Asterisk = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 100 100" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M50 10 V90 M10 50 H90 M21.7 21.7 L78.3 78.3 M21.7 78.3 L78.3 21.7" stroke="currentColor" strokeWidth="8" strokeLinecap="round"/>
    </svg>
)

export const Flare = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 100 100" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
         <path d="M50 0 C50 0 55 35 100 50 C55 65 50 100 50 100 C50 100 45 65 0 50 C45 35 50 0 50 0Z" fill="currentColor"/>
    </svg>
)

export const Star = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 100 100" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M50 5 L61 39 H97 L68 60 L79 95 L50 74 L21 95 L32 60 L3 39 H39 Z" fill="currentColor"/>
    </svg>
)
