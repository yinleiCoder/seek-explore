'use client'

import React, { useState, useRef } from 'react'
import * as THREE from 'three'
import { TextureLoader } from 'three'
import { Canvas, useFrame, useLoader, ThreeElements } from '@react-three/fiber'
import { OrbitControls, Environment, Float, Backdrop, Stage } from '@react-three/drei'
import Model from './model'

// function Cable({ start, end, v1 = new THREE.Vector3(), v2 = new THREE.Vector3() }) {
//     const ref = useRef()
//     useFrame(() => ref.current.setPoints(start.current.getWorldPosition(v1), end.current.getWorldPosition(v2)), [])
//     return <QuadraticBezierLine ref={ref} lineWidth={3} color="#ff2060" />
//   }

function FloatingShapes() {
  return (
    <div className="w-full h-full">
      <Canvas orthographic camera={{ position: [0, 0, 10], zoom: 30 }}>
        <ambientLight intensity={0.2} />
        <directionalLight position={[-10, 0, -5]} intensity={1} color="red" />
        <spotLight
          position={[5, 0, 5]}
          intensity={2.5}
          penumbra={1}
          angle={0.35}
          castShadow
          color="#0c8cbf"
        />
        <Stage environment={null}>
          <Float
            position={[1, 1.1, -0.5]}
            rotation={[Math.PI / 3.5, 0, 0]}
            rotationIntensity={4}
            floatIntensity={6}
            speed={1.5}
          >
            <Model></Model>
          </Float>
          <Environment path="/assets/" files="potsdamer_platz_1k.hdr" />
          <OrbitControls makeDefault enableZoom={false} />
        </Stage>
      </Canvas>
    </div>
  )
}

export default FloatingShapes
