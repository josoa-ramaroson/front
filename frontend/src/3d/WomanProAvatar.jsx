import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useAnimations, useGLTF } from '@react-three/drei'
import { FacialExpressions } from './FacialExpressions'
import { MorphTargetIndices } from './MorphTargetIndices'

// Apply expression helper
function applyFacialExpression(skinnedMesh, expression) {
  const influences = skinnedMesh.morphTargetInfluences
  Object.entries(expression).forEach(([key, value]) => {
    const idx = MorphTargetIndices[key]
    if (idx !== undefined && influences[idx] !== undefined) {
      influences[idx] = value
    }
  })
}

export function WomanProAvatar({ animation = 'idle', ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/women-pro.glb')
  const { animations } = useGLTF('/woman-animation.glb')
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    // Stop all existing actions
    Object.values(actions).forEach(action => action.stop())

    const currentAction = actions[animation]
    const expression = FacialExpressions[animation] || {}

    if (animation !== 'idle' && currentAction) {
      currentAction.reset().setLoop(THREE.LoopRepeat).play()
    }

    // Apply facial expression to head, eyes and teeth
    applyFacialExpression(nodes.Wolf3D_Head, expression)
    applyFacialExpression(nodes.EyeLeft, expression)
    applyFacialExpression(nodes.EyeRight, expression)
    applyFacialExpression(nodes.Wolf3D_Teeth, expression)
  }, [animation, actions, nodes])

  return (
    <group {...props} ref={group} dispose={null} position-y={-1}>
      <primitive object={nodes.Hips} />
      <skinnedMesh
        name="EyeLeft"
        geometry={nodes.EyeLeft.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.EyeLeft.skeleton}
        morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
      />
      <skinnedMesh
        name="EyeRight"
        geometry={nodes.EyeRight.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.EyeRight.skeleton}
        morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Head"
        geometry={nodes.Wolf3D_Head.geometry}
        material={materials.Wolf3D_Skin}
        skeleton={nodes.Wolf3D_Head.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Teeth"
        geometry={nodes.Wolf3D_Teeth.geometry}
        material={materials.Wolf3D_Teeth}
        skeleton={nodes.Wolf3D_Teeth.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
      />
      <skinnedMesh geometry={nodes.Wolf3D_Hair.geometry} material={materials.Wolf3D_Hair} skeleton={nodes.Wolf3D_Hair.skeleton} />
      <skinnedMesh geometry={nodes.Wolf3D_Body.geometry} material={materials.Wolf3D_Body} skeleton={nodes.Wolf3D_Body.skeleton} />
      <skinnedMesh geometry={nodes.Wolf3D_Outfit_Bottom.geometry} material={materials.Wolf3D_Outfit_Bottom} skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton} />
      <skinnedMesh geometry={nodes.Wolf3D_Outfit_Footwear.geometry} material={materials.Wolf3D_Outfit_Footwear} skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton} />
      <skinnedMesh geometry={nodes.Wolf3D_Outfit_Top.geometry} material={materials.Wolf3D_Outfit_Top} skeleton={nodes.Wolf3D_Outfit_Top.skeleton} />
    </group>
  )
}

useGLTF.preload('/women-pro.glb')
useGLTF.preload('/woman-animation.glb')
