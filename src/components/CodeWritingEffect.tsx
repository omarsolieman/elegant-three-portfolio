
import { useEffect, useState, useRef } from 'react';

// Define the type for code snippets
interface CodeSnippet {
  id: number;
  text: string;
  position: {
    x: number;
    y: number;
  };
  opacity: number;
  duration: number;
  delay: number;
}

// Sample code snippets to display
const codeSnippets = [
  "const renderComponent = () => <App />",
  "function animate(time) {",
  "useEffect(() => { }, [])",
  "import React from 'react'",
  "const [state, setState] = useState()"
];

export default function CodeWritingEffect() {
  const [snippets, setSnippets] = useState<CodeSnippet[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize code snippets with random positions and attributes
    const newSnippets: CodeSnippet[] = [];
    
    for (let i = 0; i < Math.min(5, codeSnippets.length); i++) {
      newSnippets.push({
        id: i,
        text: codeSnippets[i],
        position: {
          x: Math.random() * 80 + 10, // 10-90% of width
          y: Math.random() * 40 + 10, // Focus more on top half (10-50% of height)
        },
        opacity: 0.3 + Math.random() * 0.2, // Increased to 0.3-0.5 opacity
        duration: 8 + Math.random() * 7, // 8-15s duration
        delay: Math.random() * 10 // 0-10s delay
      });
    }
    
    setSnippets(newSnippets);
    
    // Reposition snippets periodically
    const interval = setInterval(() => {
      setSnippets(prevSnippets => 
        prevSnippets.map(snippet => ({
          ...snippet,
          position: {
            x: Math.random() * 80 + 10,
            y: Math.random() * 40 + 10, // Keep focused on top half
          },
          opacity: 0.3 + Math.random() * 0.2, // Keep higher opacity
          duration: 8 + Math.random() * 7,
          delay: Math.random() * 3
        }))
      );
    }, 15000); // Reposition every 15 seconds
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-10"
      aria-hidden="true"
    >
      {snippets.map((snippet) => (
        <div
          key={snippet.id}
          className="absolute font-mono text-xs sm:text-sm writing-code"
          style={{
            left: `${snippet.position.x}%`,
            top: `${snippet.position.y}%`,
            opacity: snippet.opacity,
            color: 'rgba(255, 255, 255, 0.3)', // Increased from 0.15 to 0.3
            transform: 'translateZ(0)',
            transition: `all ${snippet.duration}s ease-in-out ${snippet.delay}s`,
            whiteSpace: 'nowrap',
          }}
        >
          {snippet.text}
        </div>
      ))}
    </div>
  );
}
