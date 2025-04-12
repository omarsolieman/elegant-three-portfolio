
import React from 'react';
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import ArchiveSection from "@/components/ArchiveSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import CodeWritingEffect from "@/components/CodeWritingEffect";
import CodeShootingStars from "@/components/CodeShootingStars";
import CursorEffect from "@/components/CursorEffect";

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <CodeWritingEffect />
      <CodeShootingStars />
      <CursorEffect />
      
      <Hero />
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

export default Index;
