
import ThreeScene from "@/components/ThreeScene";
import Navbar from "@/components/Navbar";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import ArchiveSection from "@/components/ArchiveSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { ArrowDown, Sparkles } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center">
        <ThreeScene className="absolute inset-0 z-0" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center mb-4 p-2 bg-secondary/30 rounded-full">
              <Sparkles className="w-5 h-5 mr-2 text-primary/70" />
              <span className="text-sm font-medium">Welcome to my creative space</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 text-gradient animate-fade-in">
              Creative Developer & 3D Enthusiast
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              I build engaging digital experiences with modern web technologies and creative 3D visuals.
            </p>
            <div className="relative">
              <div className="absolute -left-16 top-0 w-12 h-12 blur-2xl bg-primary/40 rounded-full"></div>
              <div className="absolute -right-8 -bottom-8 w-20 h-20 blur-2xl bg-primary/30 rounded-full"></div>
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
