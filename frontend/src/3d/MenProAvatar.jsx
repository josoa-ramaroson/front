
import React, { useEffect, useRef } from 'react'
import { useAnimations, useGLTF } from '@react-three/drei'
import { FacialExpressions } from './FacialExpressions'
// Apply expression helper
function applyFacialExpression(skinnedMesh, expression) {
  const influences = skinnedMesh.morphTargetInfluences;
  const dictionary = skinnedMesh.morphTargetDictionary;

  Object.values(dictionary).forEach((value) => {
    influences[value] = 0;
  });
  Object.entries(expression).forEach(([key, value]) => {
    const idx = dictionary[key]
    if (idx !== undefined && influences[idx] !== undefined) {
      influences[idx] = value
    }
  })
}
export function MenProAvatar({animation, ...props}) {
  const { nodes, materials } = useGLTF('/men20to30.glb')
  
  const group = useRef()
      // Load model geometry and materials
       // Load animations from separate GLB
      const { animations } = useGLTF('/man-animation.glb')
      // Setup animation actions
      const { actions } = useAnimations(animations, group)
    
       // Play and switch animation with corresponding facial expression
      useEffect(() => {
        // stop all
        Object.values(actions).forEach(a => a.stop())
        const action = actions[animation]
        if (action) {
          action.reset().fadeIn(0.4).play();
          const expr = FacialExpressions[animation] || {}
          applyFacialExpression(nodes.Wolf3D_Head, expr)
          applyFacialExpression(nodes.EyeLeft, expr)
          applyFacialExpression(nodes.EyeRight, expr)
        }
      }, [actions, animation, nodes])
     useEffect(() => {
      console.log("man pro")
          console.log(nodes.EyeLeft.morphTargetDictionary);
          console.log(nodes.EyeLeft.morphTargetInfluences);
    
          console.log(nodes.EyeRight.morphTargetDictionary);
          console.log(nodes.EyeRight.morphTargetInfluences);
    
          console.log(nodes.Wolf3D_Head.morphTargetDictionary);
          console.log(nodes.Wolf3D_Head.morphTargetInfluences);
        }, []);
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
      <skinnedMesh
        geometry={nodes.Wolf3D_Hair.geometry}
        material={materials.Wolf3D_Hair}
        skeleton={nodes.Wolf3D_Hair.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Body.geometry}
        material={materials.Wolf3D_Body}
        skeleton={nodes.Wolf3D_Body.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
        material={materials.Wolf3D_Outfit_Bottom}
        skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
        material={materials.Wolf3D_Outfit_Footwear}
        skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Top.geometry}
        material={materials.Wolf3D_Outfit_Top}
        skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
      />
    </group>
  )
}

useGLTF.preload('/men20to30.glb')


