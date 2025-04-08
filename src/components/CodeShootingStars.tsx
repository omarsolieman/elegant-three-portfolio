
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
      if (stars.length < 3) { // Reduced from 5 to 3 max stars
        addNewStar();
      }
    }, 6000); // Increased interval from 4000ms to 6000ms
    
    return () => clearInterval(interval);
  }, []);
  
  const createInitialStars = () => {
    const initialStars: CodeStar[] = [];
    
    for (let i = 0; i < 2; i++) { // Reduced from 3 to 2 initial stars
      initialStars.push(createStar(i));
    }
    
    setStars(initialStars);
  };
  
  const createStar = (id: number): CodeStar => {
    return {
      id,
      text: codeFragments[Math.floor(Math.random() * codeFragments.length)],
      duration: 9 + Math.random() * 6, // Increased from 7-13 to 9-15 seconds
      delay: Math.random() * 3, // Increased from 0-2 to 0-3 second delay
      left: `${Math.random() * 70}%`, // Random horizontal position
      opacity: 0.05 + Math.random() * 0.1 // Reduced opacity from 0.1-0.3 to 0.05-0.15
    };
  };
  
  const addNewStar = () => {
    setStars(prevStars => {
      // Remove oldest star if we have 3 already
      const updatedStars = prevStars.length >= 3 
        ? [...prevStars.slice(1)] 
        : [...prevStars];
      
      // Add new star
      return [...updatedStars, createStar(Date.now())];
    });
  };
  
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
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
