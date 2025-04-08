
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
import { Download, ExternalLink, Building, GraduationCap, Briefcase, Code } from "lucide-react";
import { useState } from "react";

interface ResumeDialogProps {
  children: React.ReactNode;
}

export function ResumeDialog({ children }: ResumeDialogProps) {
  const [open, setOpen] = useState(false);
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display">Omar Medhat</DialogTitle>
          <DialogDescription className="flex flex-wrap gap-2 items-center">
            <span>Malaysia</span>
            <span>|</span>
            <a href="https://linkedin.com" className="text-primary hover:underline">LinkedIn</a>
            <span>|</span>
            <span>+60 14-234 5515</span>
            <span>|</span>
            <a href="mailto:omarsoliemanwork@gmail.com" className="text-primary hover:underline">omarsoliemanwork@gmail.com</a>
            <span>|</span>
            <a href="#" className="text-primary hover:underline">Portfolio</a>
          </DialogDescription>
        </DialogHeader>
        
        <div className="my-6 space-y-8">
          {/* Education Section */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <GraduationCap className="mr-2 h-5 w-5 text-primary/70" />
              Education
            </h3>
            
            <div className="space-y-4">
              <div className="border-l-2 border-primary/30 pl-4">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium">Monash University Malaysia</h4>
                  <span className="text-xs text-muted-foreground">Feb 2023 - Current</span>
                </div>
                <p className="text-sm text-muted-foreground">Bachelor of Computer Science</p>
                <p className="text-sm mt-1">
                  Member of RoboClub, Head of Electrical Systems in Shell Eco-Marathon (Hyperion), and winner of the Spirit of Shell Eco-Marathon SEMA2025 award in Qatar
                </p>
              </div>
              
              <div className="border-l-2 border-primary/30 pl-4">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium">Multimedia University</h4>
                  <span className="text-xs text-muted-foreground">April 2021 - Sep 2022</span>
                </div>
                <p className="text-sm text-muted-foreground">Foundation in Information Technology</p>
                <p className="text-sm mt-1">
                  Member of Roboclub and International Student Society
                </p>
              </div>
            </div>
          </div>
          
          {/* Work Experience Section */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <Briefcase className="mr-2 h-5 w-5 text-primary/70" />
              Work Experience
            </h3>
            
            <div className="space-y-4">
              <div className="border-l-2 border-primary/30 pl-4">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium">Shell Eco-Marathon (SEM) 2025 Qatar</h4>
                  <span className="text-xs text-muted-foreground">Feb 2025</span>
                </div>
                <p className="text-sm text-muted-foreground">Head of Electrical Safety | Monash Hyperion Racing Team</p>
                <ul className="text-sm mt-1 list-disc ml-4 space-y-1">
                  <li>Led the design and implementation of the vehicle's electrical safety system, including a custom steering wheel with an integrated deadman's switch, ensuring compliance with Shell Eco-marathon standards.</li>
                  <li>Mentored and led a team of five junior members, fostering skill development while maintaining project quality.</li>
                  <li>Completed a rapid steering wheel redesign within two days to address space constraints.</li>
                </ul>
              </div>
              
              <div className="border-l-2 border-primary/30 pl-4">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium">Manarat Academy</h4>
                  <span className="text-xs text-muted-foreground">Nov 2023 - Dec 2024</span>
                </div>
                <p className="text-sm text-muted-foreground">Lead Web Developer</p>
                <ul className="text-sm mt-1 list-disc ml-4 space-y-1">
                  <li>Orchestrated the publishing of the entire website within 2 weeks of receiving the spec sheet.</li>
                  <li>Lead team members in following teamwork principles and distributing the workload.</li>
                  <li>Proposed and executed solutions that boosted traffic by 30% and call rate by 18%.</li>
                </ul>
              </div>
              
              <div className="border-l-2 border-primary/30 pl-4">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium">MMU & ZTE</h4>
                  <span className="text-xs text-muted-foreground">April 2022 - June 2022</span>
                </div>
                <p className="text-sm text-muted-foreground">Head Web Developer</p>
                <ul className="text-sm mt-1 list-disc ml-4 space-y-1">
                  <li>Proposed and executed solutions with team members to increase the responsiveness of the user Website and improve the Accessibility.</li>
                  <li>Led my team members in developing and deploying the website and pushed the first version to production in less than 7 days.</li>
                  <li>Kept in direct contact with the clients and had a demo ready within 72 hours of receiving the requirements list And used SOLID principles to maintain best standards.</li>
                </ul>
              </div>
              
              <div className="border-l-2 border-primary/30 pl-4">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium">BIM</h4>
                  <span className="text-xs text-muted-foreground">Jan 2021 - May 2021</span>
                </div>
                <p className="text-sm text-muted-foreground">Full-Stack Web Developer | Saudi Arabia | Remote</p>
                <ul className="text-sm mt-1 list-disc ml-4 space-y-1">
                  <li>Collaborated in developing 2 websites for multiple clients in less than 2 months adhering to UI/UX standards and best practices.</li>
                  <li>Utilized technologies like Vue.js, TailwindCSS, and Laravel while adhering to best practices.</li>
                </ul>
              </div>
              
              <div className="border-l-2 border-primary/30 pl-4">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium">TRYKE</h4>
                  <span className="text-xs text-muted-foreground">Aug 2021 - Dec 2021</span>
                </div>
                <p className="text-sm text-muted-foreground">Web Developer & Manufacturing Consultant</p>
                <ul className="text-sm mt-1 list-disc ml-4 space-y-1">
                  <li>Proposed and executed solutions with team members following Agile principles (Scrum) to increase the responsiveness of the user application and operations dashboard, leading to a 15% increase in efficiency and a 20% increase in ease of use while utilizing technologies like React.js, Node.js, Firebase & SQL.</li>
                  <li>Analyzed and collaborated with team members to design new layouts that improved the UI and UX of the user app and dashboards, thus decreasing customer support tickets by 25%.</li>
                  <li>Developed 3D-printed parts for some vehicles while ensuring maximum cost and time efficiency for production.</li>
                  <li>Facilitated the Reduction of the firebase cost by 60% by shifting redundant data to the Oracle database and adjusting the platform accordingly.</li>
                </ul>
              </div>
              
              <div className="border-l-2 border-primary/30 pl-4">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium">Sipchem Tech Club</h4>
                  <span className="text-xs text-muted-foreground">June 2018 - Aug 2018</span>
                </div>
                <p className="text-sm text-muted-foreground">Assistant Instructor | Saudi Arabia</p>
                <ul className="text-sm mt-1 list-disc ml-4 space-y-1">
                  <li>Coached students aged 10-15 on industry-specific skills ranging from CAD design to artificial intelligence and machine learning during a two-month program involving over 100 students.</li>
                  <li>Gathered resources and final project ideas for my students while mentoring students to execute them ranging from AI/ML to embedded systems and home automation while using C++, Python, and Javascript.</li>
                  <li>Oversaw students, ensuring that all safety procedures were adhered to while operating laser cutters and/or 3D printers with 0 accidents.</li>
                </ul>
              </div>
              
              <div className="border-l-2 border-primary/30 pl-4">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium">Bright Up</h4>
                  <span className="text-xs text-muted-foreground">Jan 2018 - July 2019</span>
                </div>
                <p className="text-sm text-muted-foreground">Coding & STEM Instructor | Saudi Arabia</p>
                <ul className="text-sm mt-1 list-disc ml-4 space-y-1">
                  <li>Succeeded in teaching kids aged 8-14 how to operate a 3D printer and laser cutter with all the required safety procedures and theoretical topics.</li>
                  <li>Partnered with other volunteers and instructors to create an engaging curriculum to teach the students CAD design and various other skills in less than 1 month.</li>
                  <li>Mentored over 30 students in a time span of 3 months during a summer club and almost double that during the rest of my working period.</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Skills Section */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <Code className="mr-2 h-5 w-5 text-primary/70" />
              Skills & Interests
            </h3>
            
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-medium mb-2">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    "CAD design", "3D printing", "Laser cutting", "UI/UX design", 
                    "Photo/Videography", "Video Editing", "Python", "Firebase", 
                    "Vue.js", "React.js", "Nuxt.js", "Express.js", "TailwindCSS", 
                    "Javascript", "SQL", "SQLite", "IoT", "Embedded Systems", 
                    "Circuitpython", "English", "Arabic"
                  ].map((skill, index) => (
                    <span key={index} className="px-2 py-1 text-xs bg-secondary rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Interests</h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Robotics", "3D printing", "Photography", "Videography", 
                    "Cycling", "Hiking", "Swimming", "Kyokushin karate"
                  ].map((interest, index) => (
                    <span key={index} className="px-2 py-1 text-xs bg-secondary rounded-full">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* References Section */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <Building className="mr-2 h-5 w-5 text-primary/70" />
              References
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border-l-2 border-primary/30 pl-4">
                <h4 className="font-medium">Fawzi Mudawwar [BIM]</h4>
                <p className="text-sm">fawzi@bimsaudi.com</p>
              </div>
              
              <div className="border-l-2 border-primary/30 pl-4">
                <h4 className="font-medium">Mohanad Koko [BrightUp & Sipchem]</h4>
                <p className="text-sm">mohanadkoko92@gmail.com</p>
              </div>
              
              <div className="border-l-2 border-primary/30 pl-4">
                <h4 className="font-medium">Timothy Wong [TRYKE]</h4>
                <p className="text-sm">+60 11-1611 8467, tim.wong1355@gmail.com</p>
              </div>
              
              <div className="border-l-2 border-primary/30 pl-4">
                <h4 className="font-medium">Amjad Al Rahal [Developer]</h4>
                <p className="text-sm">+966 50 255 7526, Amjadwonders@gmail.com</p>
              </div>
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
