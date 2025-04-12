
import React, { useState, useEffect, RefObject } from 'react';
import FloatingLight from './FloatingLight';
import ParticleEffect from './ParticleEffect';

interface BackgroundEffectsProps {
  containerRef: RefObject<HTMLElement>;
}

const BackgroundEffects: React.FC<BackgroundEffectsProps> = ({ containerRef }) => {
  const [lights, setLights] = useState<Array<{
    id: number;
    size: number;
    delay: number;
    duration: number;
    left: string;
    top: string;
    opacity: number;
  }>>([]);

  useEffect(() => {
    const newLights = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      size: Math.random() * 100 + 30,
      delay: Math.random() * 2,
      duration: Math.random() * 5 + 5,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      opacity: Math.random() * 0.15 + 0.05
    }));
    setLights(newLights);
  }, []);

  return (
    <div className="absolute inset-0 z-0 bg-background">
      {lights.map((light) => (
        <FloatingLight 
          key={light.id}
          size={light.size}
          delay={light.delay}
          duration={light.duration}
          left={light.left}
          top={light.top}
          opacity={light.opacity}
        />
      ))}
      
      <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-primary/10 rounded-full blur-3xl animate-pulse-glow"></div>
      <div className="absolute top-1/4 -right-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1s" }}></div>
      <div className="absolute top-3/4 left-1/3 w-40 h-40 bg-primary/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "2s" }}></div>
      
      <ParticleEffect containerRef={containerRef} />
    </div>
  );
};

export default BackgroundEffects;
