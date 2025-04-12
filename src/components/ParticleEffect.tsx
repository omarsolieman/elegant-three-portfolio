
import React, { useState, useEffect, RefObject } from 'react';

interface ParticleProps {
  containerRef: RefObject<HTMLElement>;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  xMove: number;
  yMove: number;
  size: number;
  duration: number;
}

const ParticleEffect: React.FC<ParticleProps> = ({ containerRef }) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  
  const createParticle = (x: number, y: number): Particle => {
    const xMove = (Math.random() - 0.5) * 100;
    const yMove = (Math.random() - 0.5) * 100;
    const size = Math.random() * 5 + 1;
    const duration = Math.random() * 2 + 1;
    
    return {
      id: Date.now() + Math.random(),
      x, 
      y, 
      xMove, 
      yMove, 
      size, 
      duration
    };
  };
  
  const handleMouseMove = (e: MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      if (Math.random() > 0.7) {
        setParticles(prev => [...prev.slice(-20), createParticle(x, y)]);
      }
    }
  };
  
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, [containerRef]);
  
  return (
    <>
      {particles.map(particle => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            animationDuration: `${particle.duration}s`
          }}
          data-x-move={particle.xMove}
          data-y-move={particle.yMove}
        ></div>
      ))}
    </>
  );
};

export default ParticleEffect;
