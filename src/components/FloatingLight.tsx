
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
  // Ensure all values are valid to prevent NaN errors
  const safeSize = isNaN(size) ? 50 : size;
  const safeDelay = isNaN(delay) ? 0 : delay;
  const safeDuration = isNaN(duration) ? 5 : duration;
  const safeOpacity = isNaN(opacity) ? 0.5 : opacity;
  const safeLeft = left || '50%';
  const safeTop = top || '50%';

  return (
    <div 
      className="absolute rounded-full bg-white blur-xl"
      style={{
        width: safeSize,
        height: safeSize,
        left: safeLeft,
        top: safeTop,
        opacity: safeOpacity,
        animation: `float ${safeDuration}s ease-in-out ${safeDelay}s infinite`
      }}
    ></div>
  );
};

export default FloatingLight;
