
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, ExternalLink } from "lucide-react";

interface ResumeDialogProps {
  children: React.ReactNode;
}

export function ResumeDialog({ children }: ResumeDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display">Resume</DialogTitle>
          <DialogDescription>
            My professional experience and skills
          </DialogDescription>
        </DialogHeader>
        
        <div className="my-6">
          {/* Experience Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3">Experience</h3>
            
            <div className="space-y-4">
              <div className="border-l-2 border-primary/30 pl-4">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium">Senior Developer</h4>
                  <span className="text-xs text-muted-foreground">2021-Present</span>
                </div>
                <p className="text-sm text-muted-foreground">TechCorp Inc.</p>
                <p className="text-sm mt-2">
                  Led frontend development efforts for flagship product, increasing user engagement by 45% through intuitive UI design and optimized performance.
                </p>
              </div>
              
              <div className="border-l-2 border-primary/30 pl-4">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium">Web Developer</h4>
                  <span className="text-xs text-muted-foreground">2018-2021</span>
                </div>
                <p className="text-sm text-muted-foreground">Creative Studios</p>
                <p className="text-sm mt-2">
                  Developed responsive applications for clients across various industries, including e-commerce and finance.
                </p>
              </div>
              
              <div className="border-l-2 border-primary/30 pl-4">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium">Junior Developer</h4>
                  <span className="text-xs text-muted-foreground">2016-2018</span>
                </div>
                <p className="text-sm text-muted-foreground">Startup Innovations</p>
                <p className="text-sm mt-2">
                  Assisted in development of MVP product features and integration of third-party services.
                </p>
              </div>
            </div>
          </div>
          
          {/* Skills Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3">Skills</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Frontend</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 text-xs bg-secondary rounded-full">React</span>
                  <span className="px-2 py-1 text-xs bg-secondary rounded-full">TypeScript</span>
                  <span className="px-2 py-1 text-xs bg-secondary rounded-full">Next.js</span>
                  <span className="px-2 py-1 text-xs bg-secondary rounded-full">Tailwind CSS</span>
                  <span className="px-2 py-1 text-xs bg-secondary rounded-full">Three.js</span>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Backend</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 text-xs bg-secondary rounded-full">Node.js</span>
                  <span className="px-2 py-1 text-xs bg-secondary rounded-full">Express</span>
                  <span className="px-2 py-1 text-xs bg-secondary rounded-full">MongoDB</span>
                  <span className="px-2 py-1 text-xs bg-secondary rounded-full">PostgreSQL</span>
                  <span className="px-2 py-1 text-xs bg-secondary rounded-full">GraphQL</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Education Section */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Education</h3>
            
            <div className="border-l-2 border-primary/30 pl-4">
              <div className="flex justify-between items-start">
                <h4 className="font-medium">BS in Computer Science</h4>
                <span className="text-xs text-muted-foreground">2012-2016</span>
              </div>
              <p className="text-sm text-muted-foreground">University of Technology</p>
              <p className="text-sm mt-2">
                Graduated with honors. Specialized in Web Technologies and Interactive Media.
              </p>
            </div>
          </div>
        </div>
        
        <DialogFooter className="flex-col sm:flex-row gap-3">
          <Button variant="outline" className="flex-1 sm:flex-initial" asChild>
            <a href="#" download>
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </a>
          </Button>
          <Button className="flex-1 sm:flex-initial">
            <ExternalLink className="mr-2 h-4 w-4" />
            View Full Resume
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
