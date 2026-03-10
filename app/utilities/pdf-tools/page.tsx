'use client'

import { useState, useRef, useEffect } from 'react'
import { FileText, FileType, Upload, ArrowRight, Check, X, Loader2, Download } from 'lucide-react'
import Link from 'next/link'
import { gsap } from 'gsap'

type ConversionType = 'pdf-to-word' | 'word-to-pdf'

export default function PdfToolsPage() {
    const [conversionType, setConversionType] = useState<ConversionType>('pdf-to-word')
    const [dragActive, setDragActive] = useState(false)
    const [file, setFile] = useState<File | null>(null)
    const [isProcessing, setIsProcessing] = useState(false)
    const [progress, setProgress] = useState(0)
    const [isComplete, setIsComplete] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // Animate content mount when file changes
        if (contentRef.current) {
            gsap.fromTo(contentRef.current, 
                { opacity: 0, scale: 0.95 },
                { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" }
            )
        }
    }, [file, isComplete])

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true)
        } else if (e.type === "dragleave") {
            setDragActive(false)
        }
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            validateAndSetFile(e.dataTransfer.files[0])
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        if (e.target.files && e.target.files[0]) {
            validateAndSetFile(e.target.files[0])
        }
    }

    const validateAndSetFile = (file: File) => {
        const validTypes = conversionType === 'pdf-to-word'
            ? ['application/pdf']
            : ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword']

        if (validTypes.includes(file.type)) {
            setFile(file)
            setIsComplete(false)
            setProgress(0)
        } else {
            alert(`Please upload a valid ${conversionType === 'pdf-to-word' ? 'PDF' : 'Word'} file`)
        }
    }

    const handleConversion = async () => {
        if (!file) return

        setIsProcessing(true)
        setProgress(10) // Start progress

        try {
            const formData = new FormData()
            formData.append('file', file)
            // --- FRONTEND FIX: Pass the type variable ---
            formData.append('type', conversionType) // 'pdf-to-word' or 'word-to-pdf'

            // Simulated progress for UX while waiting
            const progressInterval = setInterval(() => {
                setProgress(prev => Math.min(prev + 5, 90))
            }, 500)

            const response = await fetch('/api/convert', {
                method: 'POST',
                body: formData,
            })

            clearInterval(progressInterval)

            if (!response.ok) {
                const errorText = await response.text();
                let errorMessage = "Conversion failed";
                try {
                    const errorData = JSON.parse(errorText);
                    errorMessage = errorData.details || errorData.error || errorMessage;
                } catch {
                    errorMessage = errorText;
                }
                throw new Error(errorMessage)
            }

            const blob = await response.blob()
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url

            const originalName = file.name.substring(0, file.name.lastIndexOf('.'))
            // --- FRONTEND FIX: Use .docx for better compatibility ---
            const ext = conversionType === 'pdf-to-word' ? '.docx' : '.pdf'
            a.download = `${originalName}_converted${ext}`

            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
            window.URL.revokeObjectURL(url)

            setProgress(100)
            setIsComplete(true)
        } catch (error) {
            console.error("Conversion Error:", error)
            alert("Conversion failed! " + (error as Error).message)
        } finally {
            setIsProcessing(false)
            if (!isComplete) {
                setProgress(0); // Reset progress if there was an error
            }
        }
    }

    const handleDownload = () => {
        if (!file) return

        // Create a dummy file for the demo
        const content = "This is a converted file content for demonstration purposes."
        const blob = new Blob([content], { type: conversionType === 'pdf-to-word' ? 'application/msword' : 'application/pdf' })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url

        // Generate new filename
        const originalName = file.name.substring(0, file.name.lastIndexOf('.'))
        const ext = conversionType === 'pdf-to-word' ? '.doc' : '.pdf'
        a.download = `${originalName}_converted${ext}`

        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        window.URL.revokeObjectURL(url)
    }

    const reset = () => {
        setFile(null)
        setIsComplete(false)
        setProgress(0)
        if (inputRef.current) inputRef.current.value = ''
    }

    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-12 px-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-4xl mx-auto relative z-10">
                {/* Header */}
                <div className="flex items-center space-x-2 mb-8 text-gray-400 hover:text-white transition-colors w-fit">
                    <Link href="/" className="flex items-center">
                        <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                        Back to Home
                    </Link>
                </div>

                <div className="text-center mb-12 space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                        PDF Magic Tools
                    </h1>
                    <p className="text-gray-400">
                        Fast, secure, and futuristic document conversion.
                    </p>
                </div>

                {/* Main Card */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-12 relative overflow-hidden">
                    {/* Tool Switcher */}
                    <div className="flex justify-center mb-12">
                        <div className="bg-black/40 p-1 rounded-xl border border-white/10 flex">
                            <button
                                onClick={() => { setConversionType('pdf-to-word'); reset(); }}
                                className={`px-6 py-3 rounded-lg flex items-center space-x-2 transition-all ${conversionType === 'pdf-to-word' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25' : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                <FileText className="w-4 h-4" />
                                <span>PDF to Word</span>
                            </button>
                            <button
                                onClick={() => { setConversionType('word-to-pdf'); reset(); }}
                                className={`px-6 py-3 rounded-lg flex items-center space-x-2 transition-all ${conversionType === 'word-to-pdf' ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25' : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                <FileType className="w-4 h-4" />
                                <span>Word to PDF</span>
                            </button>
                        </div>
                    </div>

                    <div className="transition-all duration-300 relative" ref={contentRef}>
                        {!file ? (
                            <div
                                onClick={() => inputRef.current?.click()}
                                className={`relative border-2 cursor-pointer border-dashed rounded-xl p-12 text-center transition-all ${dragActive ? 'border-blue-500 bg-blue-500/10' : 'border-white/10 hover:border-white/30 bg-black/20 hover:bg-white/5'
                                    }`}
                                onDragEnter={handleDrag}
                                onDragLeave={handleDrag}
                                onDragOver={handleDrag}
                                onDrop={handleDrop}
                            >
                                <input
                                    ref={inputRef}
                                    type="file"
                                    className="hidden"
                                    onChange={handleChange}
                                    accept={conversionType === 'pdf-to-word' ? '.pdf' : '.doc,.docx'}
                                />
                                <div className="space-y-4">
                                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-blue-500/20">
                                        <Upload className="w-8 h-8 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-2">
                                            Drop your file here
                                        </h3>
                                        <p className="text-gray-400 text-sm">
                                            or <button onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }} className="text-blue-400 hover:text-blue-300 underline">browse computer</button>
                                        </p>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-4">
                                        Max file size: 50MB
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-black/40 rounded-xl p-8 border border-white/10">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                                            {conversionType === 'pdf-to-word' ? <FileText className="text-red-400" /> : <FileType className="text-blue-400" />}
                                        </div>
                                        <div>
                                            <p className="text-white font-medium">{file.name}</p>
                                            <p className="text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                        </div>
                                    </div>
                                    {!isProcessing && !isComplete && (
                                        <button onClick={reset} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                                            <X className="w-5 h-5 text-gray-400" />
                                        </button>
                                    )}
                                </div>

                                {!isProcessing && !isComplete && (
                                    <button
                                        onClick={handleConversion}
                                        className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all text-white"
                                    >
                                        Start Conversion
                                    </button>
                                )}

                                {(isProcessing || isComplete) && (
                                    <div className="space-y-4">
                                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 ease-linear"
                                                style={{ width: `${progress}%` }}
                                            />
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-400">
                                                {isComplete ? "Conversion Complete!" : "Converting..."}
                                            </span>
                                            <span className="text-white font-mono">{Math.round(progress)}%</span>
                                        </div>
                                    </div>
                                )}

                                {isComplete && (
                                    <div className="mt-8 pt-8 border-t border-white/10 flex justify-center">
                                        <button
                                            onClick={handleDownload}
                                            className="flex items-center space-x-2 px-8 py-3 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 transition-colors shadow-lg shadow-green-500/20"
                                        >
                                            <Download className="w-5 h-5" />
                                            <span>Download {conversionType === 'pdf-to-word' ? 'Word Doc' : 'PDF'}</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
