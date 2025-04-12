
import { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import ErrorBoundary from './ErrorBoundary';

export default function ModelViewer({ position = [0, 0, 0], scale = 1, rotation = [0, 0, 0] }) {
  const groupRef = useRef();
  
  // Load the GLB model
  const { scene, nodes, animations } = useGLTF('/models/scene.glb', true);
  
  // Clone the scene to prevent issues with reusing the same object
  const model = scene.clone();
  
  // Add some rotation animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003;
    }
  });
  
  return (
    <ErrorBoundary>
      <group 
        ref={groupRef} 
        position={position} 
        rotation={rotation} 
        scale={typeof scale === 'number' ? [scale, scale, scale] : scale}
      >
        <primitive object={model} />
      </group>
    </ErrorBoundary>
  );
}

// Preload the model to improve performance
useGLTF.preload('/models/scene.glb');
