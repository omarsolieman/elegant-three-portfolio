
import { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import ErrorBoundary from './ErrorBoundary';

interface ModelViewerProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number | [number, number, number];
  url: string;
}

export default function ModelViewer({ 
  position = [0, 0, 0], 
  scale = 1, 
  rotation = [0, 0, 0],
  url
}: ModelViewerProps) {
  const groupRef = useRef<THREE.Group>(null);
  
  // Load the GLB model
  const { scene } = useGLTF(url, true);
  
  // Clone the scene to prevent issues with reusing the same object
  const model = scene.clone();
  
  // Add some rotation animation
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003;
    }
  });
  
  return (
    <ErrorBoundary>
      <group 
        ref={groupRef} 
        position={position as any} 
        rotation={rotation as any} 
        scale={typeof scale === 'number' ? [scale, scale, scale] : scale}
      >
        <primitive object={model} />
      </group>
    </ErrorBoundary>
  );
}

// Note: Preloading can be done at call sites if needed, e.g., useGLTF.preload('/models/yourModel.glb');
