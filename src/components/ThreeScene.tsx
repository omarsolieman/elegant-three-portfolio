
import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, useGLTF, Environment, Float, Text, Text3D } from '@react-three/drei';
import { Vector3, Euler, MathUtils } from 'three';
import { useIsMobile } from '@/hooks/use-mobile';

function CubeModel({ position, rotation, scale, color, hovered, onClick }) {
  const mesh = useRef();
  
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x += 0.005;
      mesh.current.rotation.y += 0.005;
    }
  });

  return (
    <mesh
      ref={mesh}
      position={position}
      rotation={rotation}
      scale={hovered ? 1.1 : 1}
      onClick={onClick}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} metalness={0.5} roughness={0.2} />
    </mesh>
  );
}

function SphereModel({ position, scale, color, hovered, onClick }) {
  const mesh = useRef();
  
  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <mesh
      ref={mesh}
      position={position}
      scale={hovered ? 1.1 : 1}
      onClick={onClick}
    >
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color={color} metalness={0.2} roughness={0.3} />
    </mesh>
  );
}

function TorusModel({ position, rotation, scale, color, hovered, onClick }) {
  const mesh = useRef();
  
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x += 0.003;
      mesh.current.rotation.y += 0.003;
    }
  });

  return (
    <mesh
      ref={mesh}
      position={position}
      rotation={rotation}
      scale={hovered ? 1.1 : 1}
      onClick={onClick}
    >
      <torusGeometry args={[0.5, 0.2, 16, 32]} />
      <meshStandardMaterial color={color} metalness={0.4} roughness={0.2} />
    </mesh>
  );
}

function CameraController() {
  const { camera, gl } = useThree();
  const isMobile = useIsMobile();
  
  useEffect(() => {
    if (isMobile) {
      camera.position.set(0, 0, 10);
    } else {
      camera.position.set(0, 0, 8);
    }
    camera.lookAt(0, 0, 0);
  }, [camera, isMobile]);

  return null;
}

function BackgroundParticles({ count = 500 }) {
  const mesh = useRef();
  const { viewport } = useThree();
  
  const [positions, setPositions] = useState([]);
  
  useEffect(() => {
    const newPositions = [];
    for (let i = 0; i < count; i++) {
      newPositions.push([
        (Math.random() - 0.5) * viewport.width * 3,
        (Math.random() - 0.5) * viewport.height * 3,
        (Math.random() - 0.5) * 10
      ]);
    }
    setPositions(newPositions);
  }, [count, viewport]);

  return (
    <group ref={mesh}>
      {positions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.5} />
        </mesh>
      ))}
    </group>
  );
}

export function SceneContent() {
  const [hovered, setHovered] = useState(null);

  const handleHover = (index) => setHovered(index === hovered ? null : index);

  return (
    <>
      <CameraController />
      <ambientLight intensity={0.3} />
      <spotLight position={[5, 5, 5]} intensity={0.8} castShadow />
      <BackgroundParticles />
      
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <CubeModel 
          position={[-2, 0, 0]} 
          rotation={[0.5, 0.5, 0]} 
          scale={1} 
          color="#ff4d6d"
          hovered={hovered === 0}
          onClick={() => handleHover(0)}
        />
      </Float>
      
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <SphereModel 
          position={[0, 0, 0]} 
          scale={1} 
          color="#4361ee"
          hovered={hovered === 1}
          onClick={() => handleHover(1)}
        />
      </Float>
      
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <TorusModel 
          position={[2, 0, 0]} 
          rotation={[0.5, 0.5, 0]} 
          scale={1} 
          color="#4cc9f0"
          hovered={hovered === 2}
          onClick={() => handleHover(2)}
        />
      </Float>
      
      <Environment preset="city" />
    </>
  );
}

export default function ThreeScene({ className = "" }) {
  return (
    <div className={`w-full h-[60vh] ${className}`}>
      <Canvas shadows dpr={[1, 2]}>
        <SceneContent />
      </Canvas>
    </div>
  );
}
