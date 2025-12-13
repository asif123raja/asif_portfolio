'use client'
import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

interface CommandHistory {
    command: string
    output: string | React.JSX.Element
}

const FILESYSTEM = {
    'about.txt': "I am a Full Stack Developer passionate about building futuristic web applications. I love React, Next.js, and AI.",
    'skills.txt': "Soft Skills: Leadership, Communication\nTechnical: React, Next.js, Node.js, Python, C++, Java",
    'contact.txt': "Email: asif@example.com\nGitHub: asif123raja",
    'projects': {
        'portfolio': "This website! Built with Next.js and Framer Motion.",
        'ai-agent': "An autonomous agent built with Python and LangChain.",
    }
}

export default function TerminalInterface() {
    const [history, setHistory] = useState<CommandHistory[]>([
        { command: '', output: 'Welcome to AsifOS v1.0.0. Type "help" to get started.' }
    ])
    const [currentInput, setCurrentInput] = useState('')
    const [currentPath, setCurrentPath] = useState('~')
    const inputRef = useRef<HTMLInputElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const router = useRouter()

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus()
        }
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight
        }
    }, [history])

    const handleCommand = (cmd: string) => {
        const trimmedCmd = cmd.trim()
        const [command, ...args] = trimmedCmd.split(' ')
        let output: string | React.JSX.Element = ''

        switch (command.toLowerCase()) {
            case 'help':
                output = (
                    <div className="text-foreground/80">
                        <p className="mb-2">Available commands:</p>
                        <div className="grid grid-cols-[100px_1fr] gap-2">
                            <span className="text-primary">help</span> <span>Show this help message</span>
                            <span className="text-primary">ls</span> <span>List directory contents</span>
                            <span className="text-primary">cat</span> <span>[file] Read file content</span>
                            <span className="text-primary">clear</span> <span>Clear terminal screen</span>
                            <span className="text-primary">whoami</span> <span>Print current user</span>
                            <span className="text-primary">date</span> <span>Print current date</span>
                            <span className="text-primary">exit</span> <span>Return to GUI mode</span>
                        </div>
                    </div>
                )
                break
            case 'ls':
                output = (
                    <div className="flex gap-4 text-secondary font-bold">
                        {Object.keys(FILESYSTEM).map(key => (
                            <span key={key} className={key.includes('.') ? 'text-foreground/60' : 'text-secondary'}>
                                {key}
                            </span>
                        ))}
                    </div>
                )
                break
            case 'cat':
                if (args.length === 0) {
                    output = "Usage: cat [filename]"
                } else {
                    const filename = args[0]
                    const content = (FILESYSTEM as any)[filename]
                    if (content) {
                        if (typeof content === 'string') {
                            output = <pre className="whitespace-pre-wrap font-mono text-gray-300">{content}</pre>
                        } else {
                            output = "Is a directory"
                        }
                    } else {
                        output = `cat: ${filename}: No such file or directory`
                    }
                }
                break
            case 'clear':
                setHistory([])
                return
            case 'whoami':
                output = "guest_user"
                break
            case 'date':
                output = new Date().toString()
                break
            case 'exit':
                router.push('/')
                output = "Logging out..."
                break
            case '':
                output = ''
                break
            default:
                output = `Command not found: ${command}. Type "help" for available commands.`
        }

        setHistory(prev => [...prev, { command: trimmedCmd, output }])
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleCommand(currentInput)
            setCurrentInput('')
        }
    }

    return (
        <div
            className="font-mono text-sm md:text-base min-h-screen bg-background text-primary p-4 md:p-8 overflow-hidden"
            onClick={() => inputRef.current?.focus()}
        >
            <div ref={containerRef} className="max-w-4xl mx-auto h-[90vh] overflow-y-auto scrollbar-hide">
                {/* Header */}
                <div className="mb-8 text-foreground/60">
                    <p>ASIF CLI 2024.4 (CLI-rolling)</p>
                    <p>Last login: {new Date().toLocaleString()} from 192.168.1.1</p>
                    <br />
                </div>

                {/* History */}
                {history.map((item, index) => (
                    <div key={index} className="mb-2">
                        {item.command && (
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                                <span className="text-secondary font-bold">┌──(guest㉿asif-portfolio)-[{currentPath}]</span>
                                <div className="w-full md:w-auto flex items-center gap-2">
                                    <span className="text-secondary font-bold">└─$</span>
                                    <span className="text-foreground">{item.command}</span>
                                </div>
                            </div>
                        )}
                        <div className="ml-0 md:ml-4 text-foreground/80">{item.output}</div>
                    </div>
                ))}

                {/* Input Area */}
                <div className="flex flex-col md:flex-row md:items-center gap-2 mt-4">
                    <span className="text-secondary font-bold">┌──(guest㉿asif-portfolio)-[{currentPath}]</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-secondary font-bold">└─$</span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={currentInput}
                        onChange={(e) => setCurrentInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="bg-transparent border-none outline-none text-foreground w-full caret-primary"
                        autoFocus
                        autoComplete="off"
                        spellCheck="false"
                    />
                </div>
                <div className="h-20" /> {/* Spacer */}
            </div>
        </div>
    )
}
