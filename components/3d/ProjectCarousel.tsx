'use client'
import { useRef, useState, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Html, useCursor, Image, RoundedBox, Sparkles, Float } from '@react-three/drei'
import * as THREE from 'three'
import { easing } from 'maath'
import { MotionValue } from 'framer-motion'

export interface Project {
    title: string
    description: string
    tags: string[]
    color: string
}

function Card({
    project,
    index,
    count,
    radius,
    setHovered,
    active,
    setActive
}: {
    project: Project
    index: number
    count: number
    radius: number
    setHovered: (hovered: boolean) => void
    active: number | null
    setActive: (i: number | null) => void
}) {
    const group = useRef<THREE.Group>(null)
    const angle = (index / count) * Math.PI * 2
    const radiusAdjusted = radius

    useFrame((state, delta) => {
        if (!group.current) return

        // Calculate position on the circle
        const x = Math.sin(angle) * radiusAdjusted
        const z = Math.cos(angle) * radiusAdjusted

        group.current.position.set(x, 0, z)
        group.current.rotation.y = angle

        // Scale up on hover or active
        const isActive = active === index
        const isHovered = group.current.userData.hovered

        const targetScale = isActive ? 1.6 : (isHovered ? 1.3 : 1)
        easing.damp3(group.current.scale, [targetScale, targetScale, targetScale], 0.2, delta)

        // Tilt effect on hover
        if (isHovered && !isActive) {
            group.current.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.05
        }
    })

    const isActive = active === index
    const isHoveredLocal = useRef(false)

    return (
        <group
            ref={group}
            onPointerOver={(e) => {
                e.stopPropagation()
                setHovered(true)
                isHoveredLocal.current = true
                if (group.current) group.current.userData.hovered = true
            }}
            onPointerOut={(e) => {
                setHovered(false)
                isHoveredLocal.current = false
                if (group.current) group.current.userData.hovered = false
            }}
            onClick={(e) => {
                e.stopPropagation()
                setActive(isActive ? null : index)
            }}
        >
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                {/* Visual Card - RoundedBox for rounded corners */}
                <RoundedBox args={[3, 2, 0.1]} radius={0.15} smoothness={4}>
                    <meshPhysicalMaterial
                        color={isActive ? "#ffffff" : isHoveredLocal.current ? "#e0f7fa" : "#2a2a2a"} // Light blue on hover
                        transparent
                        opacity={isActive ? 0.95 : 0.8}
                        roughness={0.1}
                        metalness={0.6}
                        clearcoat={1}
                        clearcoatRoughness={0.1}
                    />
                </RoundedBox>

                {/* Gradient/Color Glow at bottom */}
                <mesh position={[0, -0.9, 0.06]}>
                    <planeGeometry args={[2.8, 0.1]} />
                    <meshBasicMaterial color={project.color} transparent opacity={0.8} />
                </mesh>

                {/* Magical Sparkles for Active Card */}
                {isActive && (
                    <Sparkles count={50} scale={4} size={3} speed={0.4} opacity={0.5} color={project.color} />
                )}

                {/* Content Overlay */}
                <Html transform position={[0, 0, 0.06]} scale={0.2} style={{ pointerEvents: 'none' }}>
                    <div className={`w-[300px] flex flex-col items-center justify-center text-center select-none p-4 transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-60 blur-[1px]'}`}>
                        <h3 className={`text-4xl font-bold mb-2 drop-shadow-xl ${isActive ? 'text-black' : 'text-white'}`}>{project.title}</h3>
                        {isActive && (
                            <div className="bg-black/60 backdrop-blur-md p-4 rounded-xl mt-4 border border-white/20 shadow-2xl">
                                <p className="text-sm text-gray-200 mb-3 leading-relaxed">{project.description}</p>
                                <div className="flex flex-wrap gap-2 justify-center">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="text-xs bg-white/10 px-3 py-1 rounded-full text-white border border-white/5">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </Html>
            </Float>
        </group>
    )
}

export default function ProjectCarousel({
    projects,
    scrollYProgress
}: {
    projects: Project[]
    scrollYProgress?: MotionValue<number>
}) {
    const group = useRef<THREE.Group>(null)
    const [active, setActive] = useState<number | null>(null)
    const [hovered, setHovered] = useState(false)
    useCursor(hovered)

    const radius = 6

    useFrame((state, delta) => {
        if (!group.current) return

        if (active !== null) {
            const cardAngle = (active / projects.length) * Math.PI * 2
            const targetRotation = -cardAngle
            easing.dampE(group.current.rotation, [0, targetRotation, 0], 0.3, delta)
        } else if (scrollYProgress) {
            const scroll = scrollYProgress.get()
            const targetRotation = -scroll * Math.PI * 2
            easing.dampE(group.current.rotation, [0, targetRotation, 0], 0.1, delta)
        } else {
            group.current.rotation.y += delta * 0.05
        }
    })

    return (
        <group position={[0, -0.5, 0]}>
            {/* Click outside listener - Invisible sphere/plane */}
            <mesh
                onClick={(e) => {
                    // Only deactivate if we clicked the background, not a card
                    // e.stopPropagation is called in Card, so if we reach here, it's a background click
                    setActive(null)
                }}
                visible={false}
            >
                <sphereGeometry args={[20, 32, 32]} />
                <meshBasicMaterial side={THREE.BackSide} />
            </mesh>

            <group ref={group}>
                {projects.map((project, i) => (
                    <Card
                        key={i}
                        project={project}
                        index={i}
                        count={projects.length}
                        radius={radius}
                        setHovered={setHovered}
                        active={active}
                        setActive={setActive}
                    />
                ))}
            </group>
        </group>
    )
}
