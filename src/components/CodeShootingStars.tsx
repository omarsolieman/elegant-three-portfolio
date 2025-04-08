
import { useEffect, useState } from 'react';

const codeFragments = [
  "const app = () => { return <div>Hello</div> }",
  "function useHook() { return [state, setState] }",
  "import { useState } from 'react'",
  "export default function Component() {",
  "<div className='container'>"
];

interface CodeStar {
  id: number;
  text: string;
  duration: number;
  delay: number;
  left: string;
  opacity: number;
}

export default function CodeShootingStars() {
  const [stars, setStars] = useState<CodeStar[]>([]);
  
  useEffect(() => {
    // Initialize with some stars
    createInitialStars();
    
    // Periodically add new stars
    const interval = setInterval(() => {
      if (stars.length < 5) { // Keep max 5 stars at any time
        addNewStar();
      }
    }, 3000); // Reduced from 4000ms to 3000ms for more frequent stars
    
    return () => clearInterval(interval);
  }, [stars.length]); // Added stars.length as dependency
  
  const createInitialStars = () => {
    const initialStars: CodeStar[] = [];
    
    for (let i = 0; i < 3; i++) { // Start with 3 stars
      initialStars.push(createStar(i));
    }
    
    setStars(initialStars);
  };
  
  const createStar = (id: number): CodeStar => {
    return {
      id,
      text: codeFragments[Math.floor(Math.random() * codeFragments.length)],
      duration: 7 + Math.random() * 6, // 7-13 seconds
      delay: Math.random() * 1, // Reduced from 2s to 1s delay
      left: `${Math.random() * 70}%`, // Random horizontal position
      opacity: 0.3 + Math.random() * 0.2 // Increased to 0.3-0.5 opacity
    };
  };
  
  const addNewStar = () => {
    setStars(prevStars => {
      // Remove oldest star if we have 5 already
      const updatedStars = prevStars.length >= 5 
        ? [...prevStars.slice(1)] 
        : [...prevStars];
      
      // Add new star
      return [...updatedStars, createStar(Date.now())];
    });
  };
  
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-10">
      {stars.map(star => (
        <div
          key={star.id}
          className="code-star"
          style={{
            left: star.left,
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`,
            opacity: star.opacity
          }}
        >
          {star.text}
        </div>
      ))}
    </div>
  );
}
