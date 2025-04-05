
import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Float } from '@react-three/drei';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, ArrowUpRight, Sparkles, Mouse } from "lucide-react";

function Project3DPreview({ modelType }) {
  const [rotating, setRotating] = useState(true);
  
  return (
    <div className="relative h-[220px] w-full overflow-hidden rounded-t-lg group">
      <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/40 z-10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="absolute bottom-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex items-center justify-center gap-1 text-xs bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full">
          <Mouse className="w-3 h-3" /> <span>Interact</span>
        </div>
      </div>
      <Canvas>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <Float speed={3} rotationIntensity={rotating ? 1 : 0} floatIntensity={1}>
          {modelType === 'cube' && (
            <mesh onClick={() => setRotating(!rotating)}>
              <boxGeometry args={[1.5, 1.5, 1.5]} />
              <meshStandardMaterial color="#ff49db" metalness={0.5} roughness={0.2} />
            </mesh>
          )}
          {modelType === 'sphere' && (
            <mesh onClick={() => setRotating(!rotating)}>
              <sphereGeometry args={[1, 32, 32]} />
              <meshStandardMaterial color="#0095ff" metalness={0.2} roughness={0.3} />
            </mesh>
          )}
          {modelType === 'torus' && (
            <mesh onClick={() => setRotating(!rotating)}>
              <torusGeometry args={[1, 0.4, 16, 32]} />
              <meshStandardMaterial color="#00e676" metalness={0.4} roughness={0.2} />
            </mesh>
          )}
        </Float>
        <OrbitControls enableZoom={false} autoRotate={rotating} autoRotateSpeed={3} />
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      </Canvas>
    </div>
  );
}

export default function ProjectsSection() {
  const [activeCard, setActiveCard] = useState(null);
  
  const projects = [
    {
      title: "Interactive Dashboard",
      description: "A data visualization dashboard with real-time updates and 3D charts.",
      tags: ["React", "Three.js", "D3.js"],
      modelType: "cube",
      demoLink: "#",
      codeLink: "#"
    },
    {
      title: "E-commerce Platform",
      description: "A modern e-commerce site with 3D product previews and AR features.",
      tags: ["Next.js", "WebGL", "Shopify"],
      modelType: "sphere",
      demoLink: "#",
      codeLink: "#"
    },
    {
      title: "3D Portfolio Generator",
      description: "A tool for creatives to build interactive 3D portfolios without coding.",
      tags: ["Three.js", "React", "Firebase"],
      modelType: "torus",
      demoLink: "#",
      codeLink: "#"
    }
  ];

  return (
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center mb-4 p-2 bg-secondary/30 rounded-full">
            <Sparkles className="w-5 h-5 mr-2 text-primary/70" />
            <span className="text-sm font-medium">My Creative Works</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Featured Projects</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Here are some of my recent works showcasing my skills in interactive 3D web development.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <Card 
              key={i} 
              className={`bg-secondary/30 border-secondary overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-primary/5 ${activeCard === i ? 'ring-1 ring-primary/20' : ''}`}
              onMouseEnter={() => setActiveCard(i)}
              onMouseLeave={() => setActiveCard(null)}
            >
              <Project3DPreview modelType={project.modelType} />
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {project.title}
                  <span className="text-xs py-1 px-2 bg-primary/10 rounded-full text-primary/80">
                    3D
                  </span>
                </CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-xs px-3 py-1 bg-secondary rounded-full text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm" className="flex items-center gap-2 group">
                  <Github className="w-4 h-4 group-hover:text-primary transition-colors" /> 
                  <span>Code</span>
                </Button>
                <Button size="sm" className="flex items-center gap-2 group">
                  <span>Demo</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Decorative background elements */}
      <div className="absolute top-1/4 left-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
    </section>
  );
}
