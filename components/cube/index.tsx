'use client'

import React, { useState, useRef } from 'react'
import * as THREE from 'three'
import { TextureLoader } from 'three'
import { Canvas, useFrame, useLoader, ThreeElements } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { randomColor } from '@/utils/color'

function Cube3D() {
  return (
    <div className="w-1/2 h-full">
      <Canvas>
        <OrbitControls enableZoom={false} enablePan={false} />
        <ambientLight intensity={2} />
        <directionalLight position={[2, 1, 1]} />
        <Cube />
      </Canvas>
    </div>
  )
}

// props: ThreeElements['mesh']
function Cube() {
  const meshRef = useRef<THREE.Mesh>(null!)
  useFrame((state, delta) => {
    if (!meshRef.current) {
      return
    }
    meshRef.current.rotation.x += delta * 0.1
    meshRef.current.rotation.y += delta * 0.1
    meshRef.current.rotation.z += delta * 0.1
  })

  // const texture_1 = useLoader(TextureLoader, '/assets/cube1.jpg')
  // const texture_2 = useLoader(TextureLoader, '/assets/cube2.jpg')
  // const texture_3 = useLoader(TextureLoader, '/assets/cube3.jpg')
  // const texture_4 = useLoader(TextureLoader, '/assets/cube4.jpg')
  // const texture_5 = useLoader(TextureLoader, '/assets/cube5.jpg')
  // const texture_6 = useLoader(TextureLoader, '/assets/cube6.jpg')
  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2.5, 2.5, 2.5]} />
      <meshStandardMaterial color={randomColor()} />
      {/* <meshStandardMaterial map={texture_1} attach={'material-0'} />
      <meshStandardMaterial map={texture_2} attach={'material-1'} />
      <meshStandardMaterial map={texture_3} attach={'material-2'} />
      <meshStandardMaterial map={texture_4} attach={'material-3'} />
      <meshStandardMaterial map={texture_5} attach={'material-4'} />
      <meshStandardMaterial map={texture_6} attach={'material-5'} /> */}
    </mesh>
  )
}

export default Cube3D
