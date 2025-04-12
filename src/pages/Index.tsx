import ThreeScene from "@/components/ThreeScene";
import Navbar from "@/components/Navbar";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import ArchiveSection from "@/components/ArchiveSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import CodeWritingEffect from "@/components/CodeWritingEffect";
import CodeShootingStars from "@/components/CodeShootingStars";
import { ArrowDown, Sparkles } from "lucide-react";
import { useEffect, useState, useRef, Suspense } from "react";

const FloatingLight = ({ size, delay, duration, left, top, opacity }) => {
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

const ParticleEffect = ({ containerRef }) => {
  const [particles, setParticles] = useState([]);
  
  const createParticle = (x, y) => {
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
  
  const handleMouseMove = (e) => {
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

const Index = () => {
  const [lights, setLights] = useState([]);
  const heroRef = useRef(null);
  const [isClient, setIsClient] = useState(false);
  const [threeJsError, setThreeJsError] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
    
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

    console.log("Index component initialized");
  }, []);

  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleThreeJsError = (error) => {
    console.error("Error loading Three.js scene:", error);
    setThreeJsError(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <CodeWritingEffect />
      <CodeShootingStars />
      
      <div 
        className="fixed w-40 h-40 rounded-full bg-primary/10 pointer-events-none blur-3xl z-10"
        style={{
          left: cursorPos.x - 80,
          top: cursorPos.y - 80,
          transform: 'translate3d(0, 0, 0)',
          transition: 'transform 0.1s ease, opacity 0.2s ease'
        }}
      ></div>
      
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
          
          <ParticleEffect containerRef={heroRef} />
        </div>
        
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
      
      <AboutSection />
      
      <ProjectsSection />
      
      <ArchiveSection />
      
      <ContactSection />
      
      <Footer />

      <div className="fixed -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse-glow"></div>
      <div className="fixed -top-20 -right-20 w-60 h-60 bg-primary/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1.5s" }}></div>
      <div className="fixed top-1/3 -left-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "3s" }}></div>
    </div>
  );
};

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.props.onError?.(error);
    console.error("Error in ThreeScene:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

export default Index;
