
import ThreeScene from "@/components/ThreeScene";
import Navbar from "@/components/Navbar";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { ArrowDown } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center">
        <ThreeScene className="absolute inset-0 z-0" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 text-gradient">
              Creative Developer & 3D Enthusiast
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              I build engaging digital experiences with modern web technologies and creative 3D visuals.
            </p>
            <a 
              href="#about" 
              className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-secondary/50 hover:bg-secondary transition-colors animate-bounce"
            >
              <ArrowDown className="w-6 h-6" />
            </a>
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <AboutSection />
      
      {/* Projects Section */}
      <ProjectsSection />
      
      {/* Contact Section */}
      <ContactSection />
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
