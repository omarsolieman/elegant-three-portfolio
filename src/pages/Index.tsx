import ThreeScene from "@/components/ThreeScene";
import Navbar from "@/components/Navbar";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import ArchiveSection from "@/components/ArchiveSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { ArrowDown, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

// Floating light component
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

const Index = () => {
  const [lights, setLights] = useState([]);
  
  useEffect(() => {
    // Generate random floating lights
    const newLights = Array.from({ length: 15 }, (_, i) => ({
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
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
        <ThreeScene className="absolute inset-0 z-0" />
        
        {/* Animated background lights */}
        <div className="absolute inset-0 z-0 bg-background">
          {/* Floating lights */}
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
          
          {/* Fixed position glowing orbs */}
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/4 -right-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
          <div className="absolute top-3/4 left-1/3 w-40 h-40 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center mb-4 p-2 bg-secondary/30 rounded-full backdrop-blur-md">
              <Sparkles className="w-5 h-5 mr-2 text-primary/70 animate-pulse" />
              <span className="text-sm font-medium">Welcome to my creative space</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 text-gradient animate-fade-in glow">
              Creative Developer & 3D Enthusiast
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              I build engaging digital experiences with modern web technologies and creative 3D visuals.
            </p>
            <div className="relative">
              <div className="absolute -left-16 top-0 w-12 h-12 blur-2xl bg-primary/40 rounded-full animate-pulse"></div>
              <div className="absolute -right-8 -bottom-8 w-20 h-20 blur-2xl bg-primary/30 rounded-full animate-pulse" style={{ animationDelay: "1s" }}></div>
              <a 
                href="#about" 
                className="relative inline-flex items-center justify-center w-12 h-12 rounded-full bg-secondary/50 hover:bg-secondary backdrop-blur-sm transition-colors animate-bounce border border-white/10"
              >
                <ArrowDown className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <AboutSection />
      
      {/* Projects Section */}
      <ProjectsSection />
      
      {/* Archive Section */}
      <ArchiveSection />
      
      {/* Contact Section */}
      <ContactSection />
      
      {/* Footer */}
      <Footer />

      {/* Decorative Elements */}
      <div className="fixed -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="fixed -top-20 -right-20 w-60 h-60 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="fixed top-1/3 -left-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>
    </div>
  );
};

export default Index;
