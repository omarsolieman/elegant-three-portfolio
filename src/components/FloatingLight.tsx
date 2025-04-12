
import React from 'react';

interface FloatingLightProps {
  size: number;
  delay: number;
  duration: number;
  left: string;
  top: string;
  opacity: number;
}

const FloatingLight: React.FC<FloatingLightProps> = ({ 
  size, 
  delay, 
  duration, 
  left, 
  top, 
  opacity 
}) => {
  return (
    <div 
      className="absolute rounded-full bg-white blur-xl"
      style={{
        width: size,
        height: size,
        left: left,
        top: top,
        opacity: opacity,
        animation: `float ${duration}s ease-in-out ${delay}s infinite`
      }}
    ></div>
  );
};

export default FloatingLight;
