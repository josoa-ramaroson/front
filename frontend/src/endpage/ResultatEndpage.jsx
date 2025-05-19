import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Sky, Text } from '@react-three/drei';
import CameraControls from '../3d/CameraControls';
import LoadAvatar from './LoadAvatar';
import axios from 'axios';

export default function ResultPage() {
  const [characterGender] = useState('male');
  const [characterMode] = useState('PRO');
  const [type] = useState('demission');
  const [ton] = useState('dramatique');
  const [finVoulu, setFinVoulu] = useState('');
  const [expression, setExpression] = useState('idle');
  const [introDone, setIntroDone] = useState(false);

  // Phase 1: 5s intro
  useEffect(() => {
    const timer = setTimeout(() => setIntroDone(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  // Fetch details after intro
  useEffect(() => {
    if (!introDone) return;
    async function fetchDetails() {
      try {
        const { data } = await axios.get(
          'http://10.1.1.199:8000/api/endpage/1/details',
          {
            headers: {
              Authorization: 'Bearer <TOKEN>'
            },
            timeout: 5000
          }
        );
        setFinVoulu(data.finVoulu || '');
      } catch (err) {
        console.error('Erreur lors du fetch:', err);
      }
    }
    fetchDetails();
  }, [introDone]);

  // Map tone to expression
  useEffect(() => {
    const mapping = {
      dramatique: 'angry',
      serein: 'thankful',
      triste: 'sad',
      surprise: 'surprised'
    };
    setExpression(mapping[ton] || 'idle');
  }, [ton]);

  // Background color per emotion (dark themes)
  const bgColorMap = {
    angry: '#330000',    // dark red
    sad: '#001133',      // dark blue
    thankful: '#003300', // dark green
    surprised: '#332200',// dark brown
    idle: '#111111'      // dark grey
  };
  const backgroundColor = bgColorMap[expression] || '#111111';

  return (
    <div style={{
      backgroundColor: "black"
    }}>
      <Canvas
        style={{ backgroundColor, height: '100vh' }}
        shadows
        camera={{ position: [0, 1.1, 5], fov: 30 }}
      >
        <CameraControls />
        <ambientLight intensity={0.5} />
        <Sky sunPosition={[0, 1, 0]} />
        <Environment preset="sunset" />
        
        {/* <Environment preset={ton.toLowerCase() === 'dramatique' ? 'sunset' : 'night'} /> */}
        <directionalLight position={[-5, 5, 5]} intensity={1} castShadow />

        {!introDone && <IntroText3D />}

        {introDone && (
          <>
            <Suspense fallback={<LoadingFallback />}>
              <LoadAvatar
                gender={characterGender}
                mode={characterMode}
                expression={expression}
                animation='angry'
              />
            </Suspense>
            <RepeatTextBehindAvatar message="J'ai le malheur de vous annoncer que..." />
          </>
        )}
      </Canvas>

      {/* {introDone && <ExplanationBlock type={type} finVoulu={finVoulu} expression={expression} />} */}
    </div>
  );
}

function IntroText3D() {
  const textRef = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (textRef.current) {
      const scale = 0.5 + Math.sin(t * 2) * 0.05;
      textRef.current.scale.set(scale, scale, scale);
      const hue = (t * 20) % 360 / 360;
      textRef.current.material.color.setHSL(hue, 0.7, 0.5);
    }
  });
  return (
    <Text
      ref={textRef}
      position={[0, 0, 0]}
      fontSize={0.7}
      color="#ffffff"
      anchorX="center"
      anchorY="middle"
    >
      J'ai le malheur de vous annoncer que...
    </Text>
  );
}

function RepeatTextBehindAvatar({ message }) {
  const textRef = useRef();
  useFrame(({ camera, clock }) => {
    if (textRef.current) {
      // Position the text behind avatar roughly
      textRef.current.position.set(0, 1.8, -0.5);
      // Face camera
      textRef.current.lookAt(camera.position);
    }
  });
  return (
    <Text
      ref={textRef}
      fontSize={0.5}
      color="#ffffff"
      anchorX="center"
      anchorY="middle"
      depthTest={true}
    >
      {message}
    </Text>
  );
}

function LoadingFallback() {
  const groupRef = useRef();
  const textRef = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) groupRef.current.rotation.y = Math.sin(t * 0.5) * 0.1;
    if (textRef.current) {
      const scale = 1 + Math.sin(t * 2) * 0.05;
      textRef.current.scale.set(scale, scale, scale);
      const hue = (t * 30) % 360 / 360;
      textRef.current.material.color.setHSL(hue, 0.6, 0.7);
    }
  });
  return (
    <group ref={groupRef}>
      <Text
        ref={textRef}
        fontSize={0.4}
        anchorX="center"
        anchorY="middle"
      >
        CHARGEMENT...
      </Text>
    </group>
  );
}

function ExplanationBlock({ type, finVoulu, expression }) {
  const messages = {
    demission: `Vous avez choisi de démissionner. ${finVoulu}`,
    rupture: `Séparation amoureuse annoncée. ${finVoulu}`
  };
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', color: '#333' }}>
      <h2>Explications</h2>
      <p>{messages[type] || 'Détails de la rupture:'}</p>
      <ul>
        <li>Type: {type}</li>
        <li>Expression: {expression}</li>
      </ul>
      {finVoulu && (
        <img
          src={finVoulu}
          alt="Illustration"
          style={{ maxWidth: '100%', marginTop: '1rem' }}
        />
      )}
    </div>
  );
}
