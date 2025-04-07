
import { Github, Linkedin, Twitter, Heart, Sparkles, Coffee } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef(null);
  const [sparkPosition, setSparkPosition] = useState({ x: 50, y: 50 });
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (footerRef.current) {
        const rect = footerRef.current.getBoundingClientRect();
        if (e.clientY > rect.top && e.clientY < rect.bottom) {
          const x = ((e.clientX - rect.left) / rect.width) * 100;
          const y = ((e.clientY - rect.top) / rect.height) * 100;
          setSparkPosition({ x, y });
        }
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  const [hovered, setHovered] = useState(null);
  
  return (
    <footer ref={footerRef} className="bg-background py-12 border-t border-secondary relative overflow-hidden">
      <div 
        className="absolute w-40 h-40 rounded-full bg-primary/5 blur-3xl pointer-events-none animate-pulse-glow"
        style={{
          left: `${sparkPosition.x}%`,
          top: `${sparkPosition.y}%`,
          transform: 'translate(-50%, -50%)',
          transition: 'left 0.5s ease-out, top 0.5s ease-out',
        }}
      ></div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="inline-flex items-center justify-center mb-4 moving-border">
            <Sparkles className="w-5 h-5 mr-2 text-primary/70" />
          </div>
          <h3 className="text-xl md:text-2xl font-display font-bold mb-2 glow">Thanks for Visiting!</h3>
          <p className="text-muted-foreground text-center max-w-md animate-shimmer">
            I'm always open to new opportunities and interesting projects.
            Let's create something amazing together!
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-secondary pt-8 magic-border">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0 flex items-center">
            © {currentYear} Your Name. Made with <Heart className="w-4 h-4 mx-1 text-red-500" /> and <Coffee className="w-4 h-4 mx-1" />
          </p>
          
          <div className="flex space-x-4">
            {[
              { icon: Github, label: "GitHub" },
              { icon: Linkedin, label: "LinkedIn" },
              { icon: Twitter, label: "Twitter" }
            ].map((item, i) => (
              <a 
                key={i}
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors p-2 hover:bg-secondary/50 rounded-full hover-glow"
                aria-label={item.label}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <item.icon className={`w-5 h-5 ${hovered === i ? 'animate-pulse' : ''}`} />
              </a>
            ))}
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-primary/5 rounded-full blur-3xl animate-pulse-glow"></div>
      <div className="absolute top-1/2 right-0 w-24 h-24 bg-primary/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1.5s" }}></div>
    </footer>
  );
}
