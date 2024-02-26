import * as THREE from 'three'
import React, { MutableRefObject, RefObject, useRef } from 'react'
import { useGLTF, Text, MeshTransmissionMaterial } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useControls } from 'leva'

function Model() {
  const mesh = useRef<THREE.Mesh>(null!)
  const { nodes } = useGLTF('/assets/torrus.glb')
  const { viewport } = useThree()

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.x += 0.02
    }
  })

  const materialProps = useControls({
    thickness: { value: 0.2, min: 0, max: 3, step: 0.05 },
    roughness: { value: 0, min: 0, max: 1, step: 0.1 },
    transmission: { value: 1, min: 0, max: 1, step: 0.1 },
    ior: { value: 1.2, min: 0, max: 3, step: 0.1 },
    chromaticAberration: { value: 0.02, min: 0, max: 1 },
    backside: { value: true },
    distortionScale: { value: 1, min: 0, max: 1, step: 0.1 },
    temporalDistortion: { value: 1, min: 0, max: 1, step: 0.1 },
  })

  return (
    <group scale={viewport.width / 4}>
      <Text fontSize={0.5} font="fonts/PPNeueMontreal-Bold.otf" position={[0, 0, -0.5]}>
        404 NOT FOUND
      </Text>
      <mesh ref={mesh} {...nodes.Torus002}>
        <MeshTransmissionMaterial {...materialProps} />
      </mesh>
    </group>
  )
}

export default Model
