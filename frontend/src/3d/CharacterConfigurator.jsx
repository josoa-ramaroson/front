import React, { Suspense, useRef, useState } from 'react'
import { CharacterCustomizationProvider } from './CharacterCustomizationContext'
import { Canvas, useFrame } from '@react-three/fiber'
import Interface from './Interface'
import { CharacterAnimationsProvider } from './CharacterAnimationContext'
import CameraControls from './CameraControls'
import { DarkModeProvider } from './DarkModeContext'
import Avatar from "./Avatar";
import { Environment, Sky, Text } from '@react-three/drei'


export default function CharacterConfigurator() {
  const [animation, setAnimation] = useState("idle")
  return (
    <CharacterCustomizationProvider>
      <CharacterAnimationsProvider>
        <DarkModeProvider>

            <div>
                <Canvas  
                style={{
                    backgroundColor:"#505050",
                    height: "100vh",
                    }}
                    shadows 
                    camera={{ position: [0, 1.1, 5], fov: 30 }}
                    >
                    <CameraControls />
                    <ambientLight />
                    <Sky />
                    <Environment preset="sunset" />
                        
                    <directionalLight
                        position={[-5, 5, 5]}
                        castShadow
                        shadow-mapSize-width={2048}
                        shadow-mapSize-height={2048}
                    />
                    <Suspense fallback={
                        <LoadingFallback />
                    } >
                       <Avatar animation={animation}/> 
                    </Suspense>
                </Canvas>
                <Interface animation={animation} setAnimation={setAnimation}/>
            </div>
            </DarkModeProvider>
        </CharacterAnimationsProvider>
    </CharacterCustomizationProvider>
 
  )
}



function LoadingFallback() {
    const groupRef = useRef()
    const textRef = useRef()
    
    // Animation pour le texte "Loading..."
    useFrame(({ clock }) => {
      if (groupRef.current) {
        // Légère rotation du groupe
        groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.1
      }
      
      if (textRef.current) {
        // Animation de scale pour le texte
        const scale = 1 + Math.sin(clock.getElapsedTime() * 2) * 0.05
        textRef.current.scale.set(scale, scale, scale)
        
        // Animation de couleur pour le texte
        const hue = (clock.getElapsedTime() * 10) % 360
        textRef.current.material.color.setHSL(hue / 360, 0.5, 0.7)
      }
    })
  
    return (
      <group ref={groupRef} position={[0, 0, 0]}>
        {/* Texte de chargement avec animation */}
        <Text
          ref={textRef}
          position={[0, 0, 0]}
          fontSize={0.5}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          CHARGEMENT...
        </Text>
      </group>
    )
  }
  