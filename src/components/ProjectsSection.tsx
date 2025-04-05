
import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Float } from '@react-three/drei';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

function Project3DPreview({ modelType }) {
  return (
    <div className="h-[200px] w-full bg-black/20 rounded-t-lg overflow-hidden">
      <Canvas>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <Float speed={3} rotationIntensity={1} floatIntensity={1}>
          {modelType === 'cube' && (
            <mesh>
              <boxGeometry args={[1.5, 1.5, 1.5]} />
              <meshStandardMaterial color="#ff4d6d" metalness={0.5} roughness={0.2} />
            </mesh>
          )}
          {modelType === 'sphere' && (
            <mesh>
              <sphereGeometry args={[1, 32, 32]} />
              <meshStandardMaterial color="#4361ee" metalness={0.2} roughness={0.3} />
            </mesh>
          )}
          {modelType === 'torus' && (
            <mesh>
              <torusGeometry args={[1, 0.4, 16, 32]} />
              <meshStandardMaterial color="#4cc9f0" metalness={0.4} roughness={0.2} />
            </mesh>
          )}
        </Float>
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={3} />
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      </Canvas>
    </div>
  );
}

export default function ProjectsSection() {
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
    <section id="projects" className="py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Featured Projects</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Here are some of my recent works showcasing my skills in interactive 3D web development.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <Card key={i} className="bg-secondary/30 border-secondary overflow-hidden">
              <Project3DPreview modelType={project.modelType} />
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
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
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Github className="w-4 h-4" /> Code
                </Button>
                <Button size="sm" className="flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" /> Demo
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
