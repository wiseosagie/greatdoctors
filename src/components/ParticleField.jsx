import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function Particles({ count = 120 }) {
  const mesh = useRef()
  const dummy = useMemo(() => new THREE.Object3D(), [])

  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100
      const factor = 20 + Math.random() * 100
      const speed = 0.002 + Math.random() / 200
      const xFactor = -30 + Math.random() * 60
      const yFactor = -20 + Math.random() * 40
      const zFactor = -10 + Math.random() * 20
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 })
    }
    return temp
  }, [count])

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 60
      pos[i * 3 + 1] = (Math.random() - 0.5) * 40
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return pos
  }, [count])

  const sizes = useMemo(() => {
    const s = new Float32Array(count)
    for (let i = 0; i < count; i++) s[i] = 0.08 + Math.random() * 0.18
    return s
  }, [count])

  useFrame((state) => {
    particles.forEach((p, i) => {
      p.t += p.speed
      const { t, factor, xFactor, yFactor, zFactor } = p

      const x = xFactor + Math.cos((t / 10) * factor) + Math.sin(t * 1.5) * factor / 10
      const y = yFactor + Math.sin((t / 10) * factor) + Math.cos(t * 2) * factor / 10
      const z = zFactor + Math.cos((t / 10) * factor) + Math.sin(t) * factor / 10

      dummy.position.set(x, y, z)
      dummy.scale.setScalar(0.4 + Math.sin(t) * 0.1)
      dummy.updateMatrix()
      mesh.current.setMatrixAt(i, dummy.matrix)
    })
    mesh.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <sphereGeometry args={[0.12, 8, 8]} />
      <meshStandardMaterial
        color="#00B4D8"
        transparent
        opacity={0.35}
        roughness={0.1}
        metalness={0.6}
      />
    </instancedMesh>
  )
}

function FloatingRing({ position, rotation, scale, color, speed }) {
  const mesh = useRef()
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    mesh.current.rotation.x = rotation[0] + t * speed * 0.3
    mesh.current.rotation.y = rotation[1] + t * speed * 0.5
    mesh.current.position.y = position[1] + Math.sin(t * speed) * 0.8
  })
  return (
    <mesh ref={mesh} position={position} scale={scale}>
      <torusGeometry args={[1, 0.04, 16, 60]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.18}
        roughness={0.2}
        metalness={0.8}
      />
    </mesh>
  )
}

function FloatingSphere({ position, radius, color, speed }) {
  const mesh = useRef()
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    mesh.current.position.y = position[1] + Math.sin(t * speed + position[0]) * 1.2
    mesh.current.position.x = position[0] + Math.cos(t * speed * 0.7) * 0.5
  })
  return (
    <mesh ref={mesh} position={position}>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.10}
        roughness={0.1}
        metalness={0.9}
      />
    </mesh>
  )
}

function MedicalCross({ position, scale }) {
  const group = useRef()
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    group.current.rotation.y = t * 0.3
    group.current.rotation.x = Math.sin(t * 0.4) * 0.15
    group.current.position.y = position[1] + Math.sin(t * 0.5) * 0.5
  })
  return (
    <group ref={group} position={position} scale={scale}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.18, 1.1, 0.18]} />
        <meshStandardMaterial color="#00B4D8" transparent opacity={0.55} metalness={0.7} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.1, 0.18, 0.18]} />
        <meshStandardMaterial color="#00B4D8" transparent opacity={0.55} metalness={0.7} roughness={0.2} />
      </mesh>
    </group>
  )
}

export default function ParticleField() {
  return (
    <Canvas
      camera={{ position: [0, 0, 28], fov: 55 }}
      style={{ position: 'absolute', inset: 0 }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1.2} color="#00B4D8" />
      <pointLight position={[-10, -10, -10]} intensity={0.6} color="#1E6FBF" />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />

      <Particles count={100} />

      <FloatingRing position={[-12, 2, -8]} rotation={[0.4, 0.2, 0]} scale={4} color="#0A2463" speed={0.4} />
      <FloatingRing position={[14, -3, -12]} rotation={[0.8, 0.5, 0.2]} scale={6} color="#00B4D8" speed={0.25} />
      <FloatingRing position={[2, 8, -15]} rotation={[1.2, 0.1, 0.6]} scale={8} color="#1E6FBF" speed={0.18} />

      <FloatingSphere position={[-18, 4, -10]} radius={3.5} color="#00B4D8" speed={0.3} />
      <FloatingSphere position={[20, -6, -14]} radius={5} color="#0A2463" speed={0.2} />
      <FloatingSphere position={[8, 12, -18]} radius={4} color="#1E6FBF" speed={0.25} />

      <MedicalCross position={[-8, 1, -2]} scale={1.4} />
      <MedicalCross position={[10, -2, -4]} scale={0.9} />
      <MedicalCross position={[0, 6, -6]} scale={0.6} />
    </Canvas>
  )
}
