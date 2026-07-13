import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Sparkles, Sphere } from '@react-three/drei'
import { useRef } from 'react'
import type { Group } from 'three'

function Sculpture({ dark }: { dark: boolean }) {
  const group = useRef<Group>(null)

  useFrame((state, delta) => {
    if (!group.current) return
    const px = state.pointer.x * 0.16
    const py = state.pointer.y * 0.12
    group.current.rotation.y += (px - group.current.rotation.y) * delta * 1.8
    group.current.rotation.x += (-py - group.current.rotation.x) * delta * 1.8
  })

  return (
    <group ref={group}>
      <Float speed={1.25} rotationIntensity={0.2} floatIntensity={0.42}>
        <Sphere args={[1.34, 160, 160]} scale={[1, 1.08, 0.96]}>
          <MeshDistortMaterial
            color={dark ? '#c87889' : '#f1a69e'}
            roughness={0.18}
            metalness={0.02}
            clearcoat={1}
            clearcoatRoughness={0.12}
            distort={0.31}
            speed={1.2}
          />
        </Sphere>
      </Float>
      <Sparkles
        count={34}
        scale={[4.5, 4.5, 3]}
        size={2.2}
        speed={0.18}
        opacity={dark ? 0.38 : 0.3}
        color={dark ? '#f4c8ba' : '#b76170'}
      />
    </group>
  )
}

export default function SoftOrb({ dark }: { dark: boolean }) {
  return (
    <div className="orb-shell" aria-hidden="true">
      <Canvas
        dpr={[1, 1.6]}
        camera={{ position: [0, 0, 4.7], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={dark ? 1.1 : 1.65} color={dark ? '#f3c0b5' : '#fff2df'} />
        <directionalLight position={[3, 4, 5]} intensity={3.8} color="#fff3dd" />
        <pointLight position={[-4, -2, 3]} intensity={3.2} color={dark ? '#8c4160' : '#db6681'} />
        <pointLight position={[2, -3, 2]} intensity={2.4} color="#ffcc9f" />
        <Sculpture dark={dark} />
      </Canvas>
      <div className="orb-caption">
        <span className="orb-caption__dot" />
        <span>curiosity, in motion</span>
      </div>
    </div>
  )
}
