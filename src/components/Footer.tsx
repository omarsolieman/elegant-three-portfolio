
import { Github, Linkedin, Twitter, Heart, Sparkles, Coffee } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-background py-12 border-t border-secondary relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="inline-flex items-center justify-center mb-4">
            <Sparkles className="w-5 h-5 mr-2 text-primary/70" />
          </div>
          <h3 className="text-xl md:text-2xl font-display font-bold mb-2">Thanks for Visiting!</h3>
          <p className="text-muted-foreground text-center max-w-md">
            I'm always open to new opportunities and interesting projects.
            Let's create something amazing together!
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-secondary pt-8">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0 flex items-center">
            © {currentYear} Your Name. Made with <Heart className="w-4 h-4 mx-1 text-red-500" /> and <Coffee className="w-4 h-4 mx-1" />
          </p>
          
          <div className="flex space-x-4">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors p-2 hover:bg-secondary/50 rounded-full">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors p-2 hover:bg-secondary/50 rounded-full">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors p-2 hover:bg-secondary/50 rounded-full">
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 right-0 w-24 h-24 bg-primary/5 rounded-full blur-3xl"></div>
    </footer>
  );
}
