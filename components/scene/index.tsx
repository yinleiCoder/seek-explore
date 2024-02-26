'use client'

import React, { useState, useRef } from 'react'
import * as THREE from 'three'
import { TextureLoader } from 'three'
import { Canvas, useFrame, useLoader, ThreeElements } from '@react-three/fiber'
import { OrbitControls, Environment, Float, Backdrop, Stage } from '@react-three/drei'
import Model from './Model'

export default function Scene() {
  return (
    <Canvas className="bg-zinc-900">
      <directionalLight intensity={3} position={[0, 3, 2]} />
      <Environment preset="city" />
      <Model />
    </Canvas>
  )
}
