import * as React from 'react'; // Use namespace import
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

// Define the structure for the project data expected
interface ProjectData {
  title: string;
  description: string;
  tags: string[];
  modelType: string;
  demoLink?: string;
  codeLink?: string;
}

interface ProjectDialogProps {
  project: ProjectData;
  children: React.ReactNode; // Use React.ReactNode
}

export function ProjectDialog({ project, children }: ProjectDialogProps) {
  // Dialog open state is managed internally by shadcn/ui Dialog
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[525px] bg-secondary/90 backdrop-blur-sm border-primary/10">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary">{project.title}</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {project.description}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <h3 className="text-lg font-semibold mb-2 text-foreground">Project Details</h3>
          <p className="text-sm text-muted-foreground mb-1">Tags: {project.tags.join(', ')}</p>
          <p className="text-sm text-muted-foreground mb-1">Model Type: {project.modelType}</p>
          {project.demoLink && <p className="text-sm text-muted-foreground">Demo Link: {project.demoLink}</p>}
        </div>
        <DialogFooter className="justify-between sm:justify-between">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <div className="flex gap-2">
            {project.codeLink && (
              <Button variant="outline" size="sm" className="flex items-center gap-2" asChild>
                <a href={project.codeLink} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4" /> Code
                </a>
              </Button>
            )}
            {project.demoLink && (
              <Button asChild size="sm" className="flex items-center gap-2">
                <a href={project.demoLink} target="_blank" rel="noopener noreferrer">
                  Open Demo <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 