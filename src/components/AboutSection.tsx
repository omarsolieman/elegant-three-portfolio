
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Code, Briefcase, Award } from "lucide-react";

export default function AboutSection() {
  const skills = [
    "JavaScript", "React", "Three.js", "Node.js", "HTML/CSS", 
    "TypeScript", "WebGL", "3D Modeling", "UI/UX Design"
  ];

  return (
    <section id="about" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row gap-12">
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">About Me</h2>
            <p className="text-muted-foreground mb-6">
              I'm a creative developer specializing in building immersive digital experiences. 
              With a background in both design and development, I create engaging websites and 
              interactive applications that push the boundaries of what's possible on the web.
            </p>
            <p className="text-muted-foreground mb-6">
              My passion lies at the intersection of technology and creativity, where I can blend 
              technical expertise with artistic vision to craft memorable digital experiences.
            </p>
            
            <a href="#projects" className="inline-flex items-center group text-primary">
              View my projects 
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
          
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-secondary/50 border-secondary">
                <CardContent className="p-6">
                  <Code className="w-10 h-10 mb-4 text-primary/70" />
                  <h3 className="text-xl font-display font-semibold mb-2">Development</h3>
                  <p className="text-sm text-muted-foreground">
                    I build applications with modern JavaScript frameworks and 3D technologies.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-secondary/50 border-secondary">
                <CardContent className="p-6">
                  <Briefcase className="w-10 h-10 mb-4 text-primary/70" />
                  <h3 className="text-xl font-display font-semibold mb-2">Experience</h3>
                  <p className="text-sm text-muted-foreground">
                    Over 5 years of professional experience creating digital products.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-secondary/50 border-secondary md:col-span-2">
                <CardContent className="p-6">
                  <Award className="w-10 h-10 mb-4 text-primary/70" />
                  <h3 className="text-xl font-display font-semibold mb-2">Skills</h3>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {skills.map((skill) => (
                      <span key={skill} className="text-xs px-3 py-1 bg-secondary rounded-full text-muted-foreground">
                        {skill}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
