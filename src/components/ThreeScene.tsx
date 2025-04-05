
import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, useGLTF, Environment, Float, Text, Text3D, Stars } from '@react-three/drei';
import { Vector3, Euler, MathUtils } from 'three';
import { useIsMobile } from '@/hooks/use-mobile';

function CubeModel({ position, rotation, scale, color, hovered, onClick }) {
  const mesh = useRef(null);
  
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
  const mesh = useRef(null);
  
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
  const mesh = useRef(null);
  
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

function FloatingName() {
  return (
    <group position={[0, -2, 0]}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.8}>
        <Text
          fontSize={0.8}
          color="#ffffff"
          font="/fonts/SpaceGrotesk-Bold.ttf"
          position={[0, 0, 0]}
          textAlign="center"
          maxWidth={4}
          anchorX="center"
          anchorY="middle"
        >
          YOUR NAME
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

function ShootingStar() {
  const ref = useRef();
  const [active, setActive] = useState(false);
  const [position, setPosition] = useState([0, 0, 0]);
  const [direction, setDirection] = useState([0, 0, 0]);
  
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

// Colorful glowing orbs that float around
function GlowingOrbs() {
  const colors = ["#ff49db", "#0095ff", "#ff4949", "#00e676", "#ffea00"];
  const orbs = [];
  
  for (let i = 0; i < 8; i++) {
    const x = (Math.random() - 0.5) * 10;
    const y = (Math.random() - 0.5) * 10;
    const z = (Math.random() - 0.5) * 5 - 3;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const scale = 0.1 + Math.random() * 0.2;
    
    orbs.push({ position: [x, y, z], color, scale });
  }
  
  return (
    <group>
      {orbs.map((orb, i) => (
        <Float key={i} speed={1 + Math.random()} rotationIntensity={0.2} floatIntensity={2}>
          <mesh position={orb.position} scale={orb.scale}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshStandardMaterial 
              color={orb.color} 
              emissive={orb.color}
              emissiveIntensity={2}
              toneMapped={false}
            />
          </mesh>
        </Float>
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
  return (
    <div className={`w-full h-[80vh] ${className}`}>
      <Canvas shadows dpr={[1, 2]}>
        <SceneContent />
      </Canvas>
    </div>
  );
}
