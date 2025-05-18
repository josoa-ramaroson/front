import { Canvas, useFrame } from '@react-three/fiber'
import React, { useState, useEffect, useRef, Suspense } from 'react'
import CameraControls from '../3d/CameraControls'
import { Environment, Sky, Text } from '@react-three/drei'
import axios from 'axios'
import LoadAvatar from './LoadAvatar'

// Composant principal
export default function ResultatEndpage() {
  const [characterGender, setCharacterGender] = useState("male");
  const [characterMode, setCharacterMode] = useState("PRO");
  const [type, setType] = useState("Demission");
  const [expression, setExpression] = useState("TRISTE");

  // Effet pour récupérer des données ou effectuer des actions au chargement du composant
  useEffect(() => {
    // Exemple d'appel API simulé
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/user-settings'); // Remplacez par votre API réelle
        setCharacterGender(response.data.gender || "male");
        setCharacterMode(response.data.mode || "PRO");
        setType(response.data.type || "Demission");
        setExpression(response.data.expression || "TRISTE");
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div style={{
        position: 'absolute',
        top: '10px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10,
        color: '#ffffff',
        fontFamily: 'Arial, sans-serif',
        fontSize: '2rem',
        textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
      }}>
        {type.toUpperCase()}
      </div>
      <Canvas
        style={{
          backgroundColor: "#505050",
          height: "100vh",
        }}
        shadows
        camera={{ position: [0, 1.1, 5], fov: 30 }}
      >
        {/* Contrôle de la caméra */}
        <CameraControls />

        {/* Lumières */}
        <ambientLight intensity={0.5} />
        <Sky sunPosition={[0, 1, 0]} />
        <Environment preset="sunset" />
        <directionalLight
          position={[-5, 5, 5]}
          intensity={1.2}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />

        {/* Contenu 3D principal */}
        <Suspense fallback={<LoadingFallback />}>
          <LoadAvatar gender={characterGender} mode={characterMode} />
        </Suspense>
      </Canvas>
    </>
  )
}

// Composant de chargement
function LoadingFallback() {
  const groupRef = useRef();
  const textRef = useRef();

  // Animation pour le texte "CHARGEMENT..."
  useFrame(({ clock }) => {
    if (groupRef.current) {
      // Rotation subtile du groupe
      groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.1;
    }

    if (textRef.current) {
      // Animation de scale pour le texte
      const scale = 1 + Math.sin(clock.getElapsedTime() * 2) * 0.05;
      textRef.current.scale.set(scale, scale, scale);

      // Animation de couleur pour le texte
      const hue = (clock.getElapsedTime() * 10) % 360;
      textRef.current.material.color.setHSL(hue / 360, 0.5, 0.7);
    }
  });

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
  );
}