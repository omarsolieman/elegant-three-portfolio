import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, useGLTF, Environment, Float, Text, Text3D, Stars } from '@react-three/drei';
import { Vector3, Euler, MathUtils, Group, Mesh } from 'three';
import * as THREE from 'three';
import { useIsMobile } from '@/hooks/use-mobile';

const YOUR_NAME = "Omar Medhat";

function CubeModel({ position, rotation, scale, color, hovered, onClick }) {
  const mesh = useRef<Mesh>(null);
  
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
  const mesh = useRef<Mesh>(null);
  
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
  const mesh = useRef<Mesh>(null);
  
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
    const font = new FontFace('SpaceGrotesk', 'url(/fonts/SpaceGrotesk-Bold.ttf)');
    font.load().then(() => {
      setFontLoaded(true);
    }).catch(err => {
      console.error("Error loading font:", err);
      setFontError(true);
    });
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
}

interface Particle {
  position: [number, number, number];
  speed: number;
  size: number;
  amplitude: number;
}

function BackgroundParticles({ count = 500 }) {
  const meshRef = useRef<Group>(null);
  const { viewport } = useThree();
  
  const [particles, setParticles] = useState<Particle[]>([]);
  
  useEffect(() => {
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
  }, [count, viewport]);

  useFrame((state) => {
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
          >
            <primitive attach="onBeforeCompile" object={(shader) => {
              shader.fragmentShader = shader.fragmentShader.replace(
                '#include <output_fragment>',
                `
                vec3 outgoingLight = diffuseColor.rgb;
                gl_FragColor = vec4(outgoingLight, diffuseColor.a);
                gl_FragColor.rgb += vec3(0.1, 0.1, 0.1) * (0.5 + 0.5 * sin(vUv.x * 10.0 + vUv.y * 15.0 + time * 5.0));
                `
              );
              shader.uniforms.time = { value: 0 };
              function updateTime(renderer) {
                shader.uniforms.time.value = performance.now() / 1000;
              }
              if (meshRef.current) {
                meshRef.current.onBeforeRender = updateTime;
              }
            }} />
          </meshBasicMaterial>
        </mesh>
      ))}
    </group>
  );
}

function ShootingStar() {
  const ref = useRef<Mesh>(null);
  const [active, setActive] = useState(false);
  const [position, setPosition] = useState<[number, number, number]>([0, 0, 0]);
  const [direction, setDirection] = useState<[number, number, number]>([0, 0, 0]);
  
  useEffect(() => {
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
  }, []);
  
  useFrame(() => {
    if (ref.current && active) {
      ref.current.position.x += direction[0];
      ref.current.position.y += direction[1];
      ref.current.position.z += direction[2];
    }
  });
  
  if (!active) return null;
  
  return (
    <mesh ref={ref} position={position as any}>
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
  const meshRef = useRef<Mesh>(null);
  const initialPosition = useRef<[number, number, number]>(orb.position);
  
  useFrame((state) => {
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
    setSceneLoaded(true);
    console.log("Three.js scene content loaded");
  }, []);

  const handleHover = (index) => setHovered(index === hovered ? null : index);

  return (
    <>
      <CameraController />
      <ambientLight intensity={0.3} />
      <spotLight position={[5, 5, 5]} intensity={0.8} castShadow />
      <StarField />
      <BackgroundParticles count={750} />
      <GlowingOrbs />
      <ShootingStar />
      <ShootingStar />
      
      <Float speed={2} rotationIntensity={0.4} floatIntensity={0.8}>
        <CubeModel 
          position={[-2, 0, 0]} 
          rotation={[0.5, 0.5, 0]} 
          scale={1} 
          color="#ff49db"
          hovered={hovered === 0}
          onClick={() => handleHover(0)}
        />
      </Float>
      
      <Float speed={1.8} rotationIntensity={0.3} floatIntensity={0.6}>
        <SphereModel 
          position={[0, 0, 0]} 
          scale={1} 
          color="#0095ff"
          hovered={hovered === 1}
          onClick={() => handleHover(1)}
        />
      </Float>
      
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
      
      <FloatingName />
      <Environment preset="city" />
    </>
  );
}

export default function ThreeScene({ className = "" }) {
  const [hasRendered, setHasRendered] = useState(false);
  
  useEffect(() => {
    setHasRendered(true);
    console.log("ThreeScene component mounted");
  }, []);

  if (typeof window !== 'undefined') {
    if (!window.WebGLRenderingContext) {
      console.error("WebGL is not supported in this browser");
      return <div className={`w-full h-[80vh] ${className} bg-background flex items-center justify-center`}>
        <p className="text-primary">WebGL is not supported in your browser</p>
      </div>;
    }
  }

  return (
    <div className={`w-full h-[80vh] ${className}`}>
      <Canvas 
        shadows 
        dpr={[1, 2]}
        onCreated={(state) => {
          console.log("Canvas created successfully");
        }}
        onError={(error) => {
          console.error("Canvas error:", error);
        }}
      >
        <SceneContent />
      </Canvas>
    </div>
  );
}
