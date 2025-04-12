import { useState, useEffect, useRef } from 'react';
import { Float, Stars, Environment, Text } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import ErrorBoundary from './ErrorBoundary';
import { useIsMobile } from '@/hooks/use-mobile';
import ModelViewer from './ModelViewer';
import { SphereModel, TorusModel } from './ThreeScene';

const YOUR_NAME = "Omar Medhat";

function CameraController() {
  const { camera, gl } = useThree();
  const isMobile = useIsMobile();
  
  useEffect(() => {
    try {
      if (isMobile) {
        camera.position.set(0, 0, 10);
      } else {
        camera.position.set(0, 0, 8);
      }
      camera.lookAt(0, 0, 0);
    } catch (error) {
      console.error("Error in CameraController:", error);
    }
  }, [camera, isMobile]);

  return null;
}

function FloatingName() {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [fontError, setFontError] = useState(false);
  
  useEffect(() => {
    try {
      const font = new FontFace('SpaceGrotesk', 'url(/fonts/SpaceGrotesk-Bold.ttf)');
      font.load().then(() => {
        setFontLoaded(true);
      }).catch(err => {
        console.error("Error loading font:", err);
        setFontError(true);
      });
    } catch (error) {
      console.error("Error in font loading setup:", error);
      setFontError(true);
    }
  }, []);

  return (
    <group position={[0, -2, 0]}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.8}>
        <Text
          fontSize={0.8}
          color="#ffffff"
          font={fontError ? undefined : "/fonts/SpaceGrotesk-Bold.ttf"}
          position={[0, 0, 0]}
          textAlign="center"
          maxWidth={4}
          anchorX="center"
          anchorY="middle"
        >
          {YOUR_NAME}
        </Text>
      </Float>
    </group>
  );
}

function StarField() {
  try {
    return (
      <Stars 
        radius={100} 
        depth={50} 
        count={5000} 
        factor={4} 
        saturation={0.5} 
        fade 
        speed={1} 
      />
    );
  } catch (error) {
    console.error("Error rendering StarField:", error);
    return null;
  }
}

interface Particle {
  position: [number, number, number];
  speed: number;
  size: number;
  amplitude: number;
}

function BackgroundParticles({ count = 500 }) {
  const meshRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  
  const [particles, setParticles] = useState<Particle[]>([]);
  
  useEffect(() => {
    try {
      const newParticles: Particle[] = [];
      for (let i = 0; i < count; i++) {
        newParticles.push({
          position: [
            (Math.random() - 0.5) * viewport.width * 3,
            (Math.random() - 0.5) * viewport.height * 3,
            (Math.random() - 0.5) * 10
          ],
          speed: Math.random() * 0.15 + 0.05,
          size: Math.random() * 0.05 + 0.03,
          amplitude: Math.random() * 1.5 + 0.5
        });
      }
      setParticles(newParticles);
    } catch (error) {
      console.error("Error creating background particles:", error);
    }
  }, [count, viewport]);

  useFrame((state) => {
    try {
      if (meshRef.current) {
        meshRef.current.children.forEach((child, i) => {
          if (i < particles.length) {
            const time = state.clock.elapsedTime;
            child.position.y += Math.sin(time * 0.8 + i) * 0.012 * particles[i].amplitude;
            child.position.x += Math.cos(time * 0.5 + i * 0.5) * 0.015 * particles[i].amplitude;
            
            const angle = time * particles[i].speed * 0.2;
            const radius = Math.sqrt(Math.pow(particles[i].position[0], 2) + Math.pow(particles[i].position[1], 2));
            child.position.x = Math.sin(angle) * radius * 0.4 + particles[i].position[0] * 0.6;
            child.position.z = Math.cos(angle) * radius * 0.4 + particles[i].position[2] * 0.6;
            
            const pulse = 1 + Math.sin(time * 0.5 + i) * 0.3;
            child.scale.set(
              particles[i].size * pulse,
              particles[i].size * pulse,
              particles[i].size * pulse
            );
          }
        });
      }
    } catch (error) {
      console.error("Error animating background particles:", error);
    }
  });

  return (
    <group ref={meshRef}>
      {particles.map((particle, i) => (
        <mesh key={i} position={particle.position}>
          <sphereGeometry args={[particle.size, 8, 8]} />
          <meshBasicMaterial 
            color="#ffffff" 
            transparent 
            opacity={0.9}
          />
        </mesh>
      ))}
    </group>
  );
}

function ShootingStar() {
  const ref = useRef<THREE.Mesh>(null);
  const [active, setActive] = useState(false);
  const [position, setPosition] = useState<[number, number, number]>([0, 0, 0]);
  const [direction, setDirection] = useState<[number, number, number]>([0, 0, 0]);
  
  useEffect(() => {
    try {
      const timer = setInterval(() => {
        if (Math.random() > 0.7) {
          const x = (Math.random() - 0.5) * 20;
          const y = (Math.random() - 0.5) * 20;
          const z = -10;
          
          const dx = (Math.random() - 0.5) * 0.2;
          const dy = -0.1 - Math.random() * 0.1;
          const dz = 0;
          
          setPosition([x, y, z]);
          setDirection([dx, dy, dz]);
          setActive(true);
          
          setTimeout(() => setActive(false), 1500);
        }
      }, 2000);
      
      return () => clearInterval(timer);
    } catch (error) {
      console.error("Error in ShootingStar effect:", error);
      return () => {}; // Return empty cleanup function
    }
  }, []);
  
  useFrame(() => {
    try {
      if (ref.current && active) {
        ref.current.position.x += direction[0];
        ref.current.position.y += direction[1];
        ref.current.position.z += direction[2];
      }
    } catch (error) {
      console.error("Error updating ShootingStar position:", error);
    }
  });
  
  if (!active) return null;
  
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshBasicMaterial color="#ffffff" />
      <mesh position={[0, 0, -0.5]} scale={[1, 1, 10]}>
        <cylinderGeometry args={[0, 0.05, 1, 8]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
      </mesh>
    </mesh>
  );
}

interface Orb {
  position: [number, number, number];
  color: string;
  scale: number;
  speed: number;
  radius: number;
  phaseOffset: number;
}

function GlowingOrbs() {
  const colors = ["#ffffff", "#f8f8ff", "#f5f5f5", "#fffafa", "#f0f8ff"];
  const [orbs, setOrbs] = useState<Orb[]>([]);
  
  useEffect(() => {
    try {
      const newOrbs: Orb[] = [];
      for (let i = 0; i < 12; i++) {
        const x = (Math.random() - 0.5) * 12;
        const y = (Math.random() - 0.5) * 12;
        const z = (Math.random() - 0.5) * 5 - 3;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const scale = 0.1 + Math.random() * 0.3;
        const speed = 0.8 + Math.random() * 2.0;
        const radius = 1.5 + Math.random() * 4;
        const phaseOffset = Math.random() * Math.PI * 2;
        
        newOrbs.push({ 
          position: [x, y, z], 
          color, 
          scale, 
          speed, 
          radius, 
          phaseOffset 
        });
      }
      setOrbs(newOrbs);
    } catch (error) {
      console.error("Error creating glowing orbs:", error);
    }
  }, []);
  
  return (
    <group>
      {orbs.map((orb, i) => (
        <OrbWithMotion key={i} orb={orb} />
      ))}
    </group>
  );
}

function OrbWithMotion({ orb }: { orb: Orb }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialPosition = useRef<[number, number, number]>(orb.position);
  
  useFrame((state) => {
    try {
      if (meshRef.current) {
        const time = state.clock.elapsedTime;
        const x = initialPosition.current[0] + Math.sin(time * 0.6 * orb.speed + orb.phaseOffset) * orb.radius * 0.4;
        const y = initialPosition.current[1] + Math.cos(time * 0.5 * orb.speed + orb.phaseOffset) * orb.radius * 0.35;
        const z = initialPosition.current[2] + Math.sin(time * 0.7 * orb.speed + orb.phaseOffset) * orb.radius * 0.3;
        
        meshRef.current.position.set(x, y, z);
        
        const pulse = 1 + Math.sin(time * orb.speed) * 0.3;
        meshRef.current.scale.set(orb.scale * pulse, orb.scale * pulse, orb.scale * pulse);
        
        meshRef.current.rotation.x += 0.001 * orb.speed;
        meshRef.current.rotation.y += 0.001 * orb.speed;
      }
    } catch (error) {
      console.error("Error animating orb:", error);
    }
  });

  return (
    <mesh ref={meshRef} position={orb.position} scale={orb.scale}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial 
        color={orb.color} 
        emissive={orb.color}
        emissiveIntensity={3}
        toneMapped={false}
      />
      <pointLight
        color={orb.color}
        intensity={1.5}
        distance={3}
        decay={2}
      />
    </mesh>
  );
}

export function SceneContent() {
  const [hovered, setHovered] = useState(null);
  const [sceneLoaded, setSceneLoaded] = useState(false);

  useEffect(() => {
    try {
      setSceneLoaded(true);
      console.log("Three.js scene content loaded");
    } catch (error) {
      console.error("Error in SceneContent:", error);
    }
  }, []);

  const handleHover = (index) => {
    try {
      setHovered(index === hovered ? null : index);
    } catch (error) {
      console.error("Error in handleHover:", error);
    }
  };

  return (
    <ErrorBoundary>
      <CameraController />
      <ambientLight intensity={0.3} />
      <spotLight position={[5, 5, 5]} intensity={0.8} castShadow />
      <StarField />
      <ErrorBoundary>
        <BackgroundParticles count={750} />
      </ErrorBoundary>
      <ErrorBoundary>
        <GlowingOrbs />
      </ErrorBoundary>
      <ErrorBoundary>
        <ShootingStar />
        <ShootingStar />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <Float speed={2} rotationIntensity={0.4} floatIntensity={0.8}>
          <ModelViewer 
            position={[-2, 0, 0]} 
            rotation={[0.5, 0.5, 0]} 
            scale={0.5} 
          />
        </Float>
      </ErrorBoundary>
      
      <ErrorBoundary>
        <Float speed={1.8} rotationIntensity={0.3} floatIntensity={0.6}>
          <SphereModel 
            position={[0, 0, 0]} 
            scale={1} 
            color="#0095ff"
            hovered={hovered === 1}
            onClick={() => handleHover(1)}
          />
        </Float>
      </ErrorBoundary>
      
      <ErrorBoundary>
        <Float speed={2.2} rotationIntensity={0.5} floatIntensity={0.7}>
          <TorusModel 
            position={[2, 0, 0]} 
            rotation={[0.5, 0.5, 0]} 
            scale={1} 
            color="#00e676"
            hovered={hovered === 2}
            onClick={() => handleHover(2)}
          />
        </Float>
      </ErrorBoundary>
      
      <ErrorBoundary>
        <FloatingName />
      </ErrorBoundary>
      <Environment preset="city" />
    </ErrorBoundary>
  );
}
