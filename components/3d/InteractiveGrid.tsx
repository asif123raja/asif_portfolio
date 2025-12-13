'use client'
import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { useTheme } from '../ThemeContext'

function TileGrid({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
    const meshRef = useRef<THREE.InstancedMesh>(null)
    const count = 170 // Even wider spread
    const dummy = useMemo(() => new THREE.Object3D(), [])
    const color = useMemo(() => new THREE.Color(), [])
    const { theme } = useTheme()

    // Grid parameters
    const size = 1.2
    const gap = 0.2
    const totalSize = count * (size + gap)
    const offset = totalSize / 2

    // Initialize positions
    const initialPositions = useMemo(() => {
        const temp = []
        for (let i = 0; i < count; i++) {
            for (let j = 0; j < count; j++) {
                const x = (i * (size + gap)) - offset
                const z = (j * (size + gap)) - offset
                temp.push({ x, z, y: -10 }) // Base y level
            }
        }
        return temp
    }, [count, offset, size, gap])

    useFrame((state) => {
        if (!meshRef.current) return

        const time = state.clock.getElapsedTime()
        const mouseX = (mouse.current[0] * 2 - 1) * 70
        const mouseY = -(mouse.current[1] * 2 - 1) * 70

        for (let i = 0; i < initialPositions.length; i++) {
            const { x, z, y: baseY } = initialPositions[i]

            // Distance to mouse (Interaction)
            const dx = x - mouseX
            const dz = z - mouseY
            const dist = Math.sqrt(dx * dx + dz * dz)

            // Distance from center (Edge Fading)
            const distCenter = Math.sqrt(x * x + z * z)
            const maxDist = 80 // Push fade start further
            const fade = Math.max(0, 1 - Math.max(0, distCenter - maxDist) / 40) // Softer fade out

            // Interaction: Pop up if close
            const influence = Math.max(0, 15 - dist) / 15
            const easeInfluence = influence * influence

            // Target Y height
            const targetY = baseY + (easeInfluence * 10)

            // Dynamic wave
            const wave = Math.sin(x * 0.2 + time) * Math.cos(z * 0.2 + time * 0.5) * 0.5

            dummy.position.set(x, targetY + wave, z)

            if (influence > 0) {
                dummy.rotation.x = -influence * (dz * 0.1)
                dummy.rotation.z = influence * (dx * 0.1)
            } else {
                dummy.rotation.set(0, 0, 0)
            }

            // Scale: Fade at edges AND interactive pop
            dummy.scale.setScalar(fade * (1 - (dist * 0.02)))

            dummy.updateMatrix()
            meshRef.current.setMatrixAt(i, dummy.matrix)

            // Color update
            let baseColorVal = "#1a1a40" // Default base
            let activeColorVal = "#4488ff" // Default active

            if (theme === 'light') {
                baseColorVal = "#e4e4e7" // Zinc-200
                activeColorVal = "#2563eb" // Blue-600
            } else if (theme === 'dark') {
                baseColorVal = "#000000" // Pure Black
                activeColorVal = "#a1a1aa" // Zinc-400
            }

            const baseColor = new THREE.Color(baseColorVal)
            const activeColor = new THREE.Color(activeColorVal)

            const colorMix = Math.min(1, easeInfluence * 1.5)
            meshRef.current.setColorAt(i, color.copy(baseColor).lerp(activeColor, colorMix).multiplyScalar(fade)) // Fade color too
        }

        meshRef.current.instanceMatrix.needsUpdate = true
        if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true
    })

    // Material props based on theme
    const materialProps = theme === 'light' ? {
        color: "#fafaab", // slight tint
        emissive: "#2563eb",
        emissiveIntensity: 0.1
    } : theme === 'dark' ? {
        color: "#000000",
        emissive: "#ffffff",
        emissiveIntensity: 0.2
    } : {
        color: "#1a1a40",
        emissive: "#3300ff",
        emissiveIntensity: 0.4
    }

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count * count]} position={[0, -15, -30]} rotation={[0.3, 0, 0]}>
            <boxGeometry args={[1.2, 0.15, 1.2]} />
            <meshStandardMaterial
                roughness={0.5}
                metalness={0.5}
                {...materialProps}
            />
        </instancedMesh>
    )
}

export default function InteractiveGrid() {
    const mouse = useRef<[number, number]>([0.5, 0.5])
    const { theme } = useTheme()

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouse.current = [
                e.clientX / window.innerWidth,
                e.clientY / window.innerHeight
            ]
        }
        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    // Theme configurations
    const themeConfig: Record<string, { fog: string; pointLight: string; directionLight: string }> = {
        default: {
            fog: '#030014',
            pointLight: '#9d00ff',
            directionLight: '#00ffff'
        },
        dark: {
            fog: '#09090b',
            pointLight: '#ffffff', // White
            directionLight: '#71717a' // Zinc-500
        },
        light: {
            fog: '#ffffff',
            pointLight: '#2563eb',
            directionLight: '#52525b'
        }
    }

    const colors = themeConfig[theme] || themeConfig.default

    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none">
            <Canvas camera={{ position: [0, 40, 60], fov: 45 }} gl={{ alpha: true }}>
                <fog attach="fog" args={[colors.fog, 50, 160]} />
                <ambientLight intensity={0.5} />
                <pointLight position={[0, 20, 0]} intensity={2} color={colors.pointLight} />
                <directionalLight position={[10, 20, 10]} intensity={1} color={colors.directionLight} />

                <TileGrid mouse={mouse} />
            </Canvas>
        </div>
    )
}
