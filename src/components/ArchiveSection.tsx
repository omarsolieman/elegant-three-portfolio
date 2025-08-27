
import { useState } from 'react';
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from '@/components/ui/table';
import { 
  Badge 
} from '@/components/ui/badge';
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent
} from '@/components/ui/hover-card';
import { 
  Popover,
  PopoverTrigger,
  PopoverContent
} from '@/components/ui/popover';
import { 
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent
} from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, Folder, FolderOpen, Tag, ExternalLink, Eye, Code, Sparkles } from 'lucide-react';

export default function ArchiveSection() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  
  const toggleCategory = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };
  
  // Sample project data - replace with your actual projects
  const archivedProjects = [
    {
      title: "ODesigns",
      description: "Website for a freelance design business",
      year: "2021",
      category: "Web",
      technologies: ["Vue.js", "Tailwindcss", "GraphQL"],
      link: "#",
      codeLink: "#"
    },
    {
      title: "MMU ZTE IoT",
      description: "Website for IoT competition at MMU in collaboration with ZTE",
      year: "2022",
      category: "Web",
      technologies: ["Vue.js", "API", "Tailwindcss"],
      link: "#",
      codeLink: "#"
    },
    {
      title: "Manarat Academy",
      description: "Website for an educational academy Based in Malaysia",
      year: "2022",
      category: "Web",
      technologies: ["React", "Tailwindcss", "Webflow"],
      link: "#",
      codeLink: "#"
    },
    {
      title: "Lahjan Academy",
      description: "A website for an educational academy based in Malaysia",
      year: "2024",
      category: "Web",
      technologies: ["React", "Tailwindcss", "WordPress"],
      link: "#",
      codeLink: "#"
    },
        {
      title: "TQ Clinic",
      description: "A website for a clinic based in Saudi Arabia with multi-branch appointment system",
      year: "2024",
      category: "Web",
      technologies: ["React", "Tailwindcss", "WordPress"],
      link: "#",
      codeLink: "#"
    },
    {
      title: "Portfolio v1",
      description: "The first iteration of my personal portfolio website",
      year: "2021",
      category: "Web",
      technologies: ["HTML", "CSS", "JavaScript"],
      link: "#",
      codeLink: "#"
    },
    {
      title: "Pixel Art Generator",
      description: "A tool for creating and exporting pixel art designs",
      year: "2022",
      category: "Graphics",
      technologies: ["Canvas API", "JavaScript", "React"],
      link: "#",
      codeLink: "#"
    },
    {
      title: "Encrypto",
      description: "Simple CLI-Based file encryption and decryption tool",
      year: "2019",
      category: "Apps",
      technologies: ["Python", "Cryptography"],
      link: "#",
      codeLink: "#"
    }
  ];
  
  // Group projects by category
  const categories = Array.from(new Set(archivedProjects.map(project => project.category)));
  const projectsByCategory = categories.reduce((acc, category) => {
    acc[category] = archivedProjects.filter(project => project.category === category);
    return acc;
  }, {});

  return (
    <section id="archive" className="py-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-grid opacity-10"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center mb-4 p-2 bg-secondary/30 rounded-full">
            <Sparkles className="w-5 h-5 mr-2 text-primary/70" />
            <span className="text-sm font-medium">Project Archive</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">More Creations</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A collection of various projects and experiments I've worked on over the years.
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8">
          {categories.map((category) => (
            <Collapsible 
              key={category}
              open={expandedCategory === category}
              onOpenChange={() => toggleCategory(category)}
              className="bg-secondary/20 border border-secondary/30 rounded-lg overflow-hidden"
            >
              <CollapsibleTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="w-full flex items-center justify-between p-4 hover:bg-secondary/40 transition-colors"
                >
                  <div className="flex items-center">
                    {expandedCategory === category ? 
                      <FolderOpen className="w-5 h-5 mr-2" /> : 
                      <Folder className="w-5 h-5 mr-2" />
                    }
                    <span className="font-semibold">{category}</span>
                    <Badge variant="secondary" className="ml-3">
                      {projectsByCategory[category].length}
                    </Badge>
                  </div>
                  <span className="text-muted-foreground text-sm">
                    {expandedCategory === category ? 'Collapse' : 'Expand'}
                  </span>
                </Button>
              </CollapsibleTrigger>
              
              <CollapsibleContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Project</TableHead>
                      <TableHead>Year</TableHead>
                      <TableHead>Technologies</TableHead>
                      <TableHead className="text-right">Links</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {projectsByCategory[category].map((project, i) => (
                      <TableRow key={i} className="hover:bg-secondary/30 group">
                        <TableCell>
                          <HoverCard>
                            <HoverCardTrigger asChild>
                              <span className="font-medium cursor-pointer hover:text-primary transition-colors">
                                {project.title}
                              </span>
                            </HoverCardTrigger>
                            <HoverCardContent className="backdrop-blur-md bg-black/80 border-secondary">
                              <div className="flex flex-col gap-2">
                                <h4 className="font-semibold text-white">{project.title}</h4>
                                <p className="text-sm text-gray-300">{project.description}</p>
                              </div>
                            </HoverCardContent>
                          </HoverCard>
                        </TableCell>
                        <TableCell>{project.year}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {project.technologies.map((tech, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button size="icon" variant="ghost" asChild>
                              <a href={project.link} target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 transition-opacity">
                                <Eye className="w-4 h-4" />
                              </a>
                            </Button>
                            <Button size="icon" variant="ghost" asChild>
                              <a href={project.codeLink} target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 transition-opacity">
                                <Code className="w-4 h-4" />
                              </a>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </div>
      
      {/* Decorative background elements */}
      <div className="absolute top-1/3 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
    </section>
  );
}
