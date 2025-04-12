
import React, { useState, useEffect } from 'react';

const CursorEffect: React.FC = () => {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      className="fixed w-40 h-40 rounded-full bg-primary/10 pointer-events-none blur-3xl z-10"
      style={{
        left: cursorPos.x - 80,
        top: cursorPos.y - 80,
        transform: 'translate3d(0, 0, 0)',
        transition: 'transform 0.1s ease, opacity 0.2s ease'
      }}
    ></div>
  );
};

export default CursorEffect;
