
import React, { useRef, useState, Suspense } from 'react';
import { ArrowDown, Sparkles } from "lucide-react";
import ThreeScene from "./ThreeScene";
import ErrorBoundary from "./ErrorBoundary";
import BackgroundEffects from "./BackgroundEffects";

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [threeJsError, setThreeJsError] = useState(false);

  React.useEffect(() => {
    setIsClient(true);
    console.log("Hero component initialized");
  }, []);

  const handleThreeJsError = (error: Error) => {
    console.error("Error loading Three.js scene:", error);
    setThreeJsError(true);
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center overflow-hidden"
      ref={heroRef}
    >
      {isClient && !threeJsError ? (
        <Suspense fallback={<div className="absolute inset-0 bg-background flex items-center justify-center text-primary">Loading 3D scene...</div>}>
          <ErrorBoundary onError={handleThreeJsError}>
            <ThreeScene className="absolute inset-0 z-0" />
          </ErrorBoundary>
        </Suspense>
      ) : threeJsError ? (
        <div className="absolute inset-0 bg-background flex items-center justify-center">
          <p className="text-primary">Could not load 3D scene</p>
        </div>
      ) : (
        <div className="absolute inset-0 bg-background" />
      )}
      
      <BackgroundEffects containerRef={heroRef} />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center mb-4 p-2 bg-secondary/30 rounded-full backdrop-blur-md moving-border">
            <Sparkles className="w-5 h-5 mr-2 text-primary/70 animate-pulse" />
            <span className="text-sm font-medium">Welcome to my creative space</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 text-gradient animate-fade-in glow">
            Creative Developer & 3D Enthusiast
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-shimmer">
            I build engaging digital experiences with modern web technologies and creative 3D visuals.
          </p>
          <div className="relative">
            <div className="absolute -left-16 top-0 w-12 h-12 blur-2xl bg-primary/40 rounded-full animate-pulse-glow"></div>
            <div className="absolute -right-8 -bottom-8 w-20 h-20 blur-2xl bg-primary/30 rounded-full animate-pulse-glow" style={{ animationDelay: "1s" }}></div>
            <a 
              href="#about" 
              className="relative inline-flex items-center justify-center w-12 h-12 rounded-full bg-secondary/50 hover:bg-secondary backdrop-blur-sm transition-colors animate-bounce border border-white/10 hover-glow"
            >
              <ArrowDown className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
