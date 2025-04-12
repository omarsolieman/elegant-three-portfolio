
import React, { useState, useEffect } from 'react';

const CursorEffect: React.FC = () => {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    try {
      const handleMouseMove = (e: MouseEvent) => {
        setCursorPos({ x: e.clientX, y: e.clientY });
      };
      
      window.addEventListener('mousemove', handleMouseMove);
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    } catch (error) {
      console.error("Error in CursorEffect:", error);
      setIsActive(false);
    }
  }, []);

  if (!isActive) return null;

  return (
    <div 
      className="fixed w-40 h-40 rounded-full bg-primary/10 pointer-events-none blur-3xl z-10"
      style={{
        left: `${cursorPos.x - 80}px`,
        top: `${cursorPos.y - 80}px`,
        transform: 'translate3d(0, 0, 0)',
        transition: 'transform 0.1s ease, opacity 0.2s ease'
      }}
    ></div>
  );
};

export default CursorEffect;
