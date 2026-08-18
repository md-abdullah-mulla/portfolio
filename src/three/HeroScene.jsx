import { Component, Suspense, useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float } from '@react-three/drei'
import * as THREE from 'three'
import { useLowPower, useReducedMotion } from '../hooks/useMedia'

class EnvGuard extends Component {
  constructor(props) {
    super(props)
    this.state = { failed: false }
  }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    if (this.state.failed) return null
    return this.props.children
  }
}

function Sculpture({ reduced }) {
  const group = useRef()
  const core = useRef()
  const ringA = useRef()
  const ringB = useRef()
  const target = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e) => {
      target.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      target.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  useFrame((state, delta) => {
    if (!group.current) return
    const t = state.clock.elapsedTime
    group.current.rotation.y += delta * 0.18
    group.current.rotation.x = THREE.MathUtils.damp(
      group.current.rotation.x,
      target.current.y * 0.28,
      2.4,
      delta,
    )
    group.current.rotation.z = THREE.MathUtils.damp(
      group.current.rotation.z,
      target.current.x * 0.12,
      2.4,
      delta,
    )
    if (core.current) {
      core.current.position.y = Math.sin(t * 0.7) * 0.08
    }
    if (ringA.current) ringA.current.rotation.z += delta * 0.22
    if (ringB.current) ringB.current.rotation.x -= delta * 0.16
  })

  const detail = reduced ? 1 : 3

  return (
    <group ref={group} position={[0.15, 0.05, 0]}>
      <mesh ref={core}>
        <icosahedronGeometry args={[1.42, detail]} />
        <meshPhysicalMaterial
          color="#c8d0d8"
          metalness={0.92}
          roughness={0.14}
          iridescence={1}
          iridescenceIOR={1.18}
          iridescenceThicknessRange={[80, 380]}
          clearcoat={1}
          clearcoatRoughness={0.1}
          envMapIntensity={1.35}
          reflectivity={1}
        />
      </mesh>

      <mesh scale={1.015}>
        <icosahedronGeometry args={[1.42, 1]} />
        <meshBasicMaterial color="#9aa7b4" wireframe transparent opacity={0.08} />
      </mesh>

      <mesh ref={ringA} rotation={[Math.PI / 2.15, 0.15, 0]}>
        <torusGeometry args={[2.08, 0.007, 12, reduced ? 80 : 180]} />
        <meshBasicMaterial color="#b7c3cd" transparent opacity={0.42} />
      </mesh>
      <mesh ref={ringB} rotation={[0.55, 0.4, 0.8]}>
        <torusGeometry args={[2.42, 0.004, 10, reduced ? 70 : 160]} />
        <meshBasicMaterial color="#7f8d9a" transparent opacity={0.28} />
      </mesh>
    </group>
  )
}

function Field({ count = 220 }) {
  const ref = useRef()
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i += 1) {
      arr[i * 3] = (Math.random() - 0.5) * 16
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return arr
  }, [count])

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.clock.elapsedTime * 0.015
  })

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return geo
  }, [positions])

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        size={0.012}
        color="#c5d0d8"
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

function CameraRig({ reduced }) {
  const look = useRef({ x: 0, y: 0 })
  useEffect(() => {
    const onMove = (e) => {
      look.current.x = (e.clientX / window.innerWidth - 0.5) * 0.6
      look.current.y = (e.clientY / window.innerHeight - 0.5) * 0.35
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  useFrame((state, delta) => {
    if (reduced) return
    const cam = state.camera
    cam.position.x = THREE.MathUtils.damp(cam.position.x, look.current.x, 1.6, delta)
    cam.position.y = THREE.MathUtils.damp(cam.position.y, 0.15 - look.current.y, 1.6, delta)
    cam.lookAt(0, 0, 0)
  })
  return null
}

export function HeroScene() {
  const reduced = useLowPower()
  const motionOff = useReducedMotion()
  const lite = reduced || motionOff

  return (
    <Canvas
      camera={{ position: [0, 0.1, 5.4], fov: 38 }}
      dpr={lite ? [1, 1] : [1, 1.5]}
      gl={{
        antialias: !lite,
        alpha: true,
        powerPreference: lite ? 'low-power' : 'high-performance',
        stencil: false,
        depth: true,
      }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0)
      }}
      style={{ width: '100%', height: '100%', background: 'transparent' }}
    >
      <fog attach="fog" args={['#070708', 7.2, 16]} />
      <ambientLight intensity={0.28} />
      <directionalLight position={[4, 3, 5]} intensity={1.35} color="#e8eef3" />
      <directionalLight position={[-5, -2, -3]} intensity={0.35} color="#7f93a6" />
      <spotLight position={[0, 6, 2]} intensity={1.1} angle={0.45} penumbra={1} color="#c5d0d8" />
      <Suspense fallback={null}>
        <EnvGuard>
          <Environment preset="city" environmentIntensity={0.55} />
        </EnvGuard>
        <Float speed={lite ? 0 : 1.1} rotationIntensity={lite ? 0 : 0.15} floatIntensity={lite ? 0 : 0.25}>
          <Sculpture reduced={lite} />
        </Float>
        <Field count={lite ? 80 : 240} />
        <CameraRig reduced={lite} />
      </Suspense>
    </Canvas>
  )
}
