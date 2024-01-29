import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Astronaut_mesh: THREE.Mesh
  }
  materials: {
    Astronaut_mat: THREE.MeshStandardMaterial
  }
}

const Model = (props: JSX.IntrinsicElements['group']) => {
  const { nodes, materials } = useGLTF('/assets/Astronaut-transformed.glb') as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Astronaut_mesh.geometry}
        material={materials.Astronaut_mat}
      />
    </group>
  )
}

useGLTF.preload('/assets/Astronaut-transformed.glb')

export default Model
