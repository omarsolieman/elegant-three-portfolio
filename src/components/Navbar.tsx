
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { ResumeDialog } from './ResumeDialog';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef(null);
  const [activeLink, setActiveLink] = useState('home');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      
      // Update active link based on scroll position
      const sections = ['home', 'about', 'projects', 'contact'];
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveLink(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (navRef.current) {
        setMousePosition({ x: e.clientX, y: e.clientY });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];
  
  const handleLinkClick = (e, href) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: 'smooth'
      });
      
      setActiveLink(targetId);
      setIsMenuOpen(false);
    }
  };

  return (
    <header 
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 
        ${isScrolled ? 'bg-background/80 backdrop-blur-md py-3 shadow-lg shadow-black/10' : 'bg-transparent py-5'}`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between relative">
        {/* Hover glow effect */}
        <div 
          className="absolute pointer-events-none w-20 h-20 rounded-full bg-primary/5 blur-xl opacity-70"
          style={{
            left: mousePosition.x - navRef.current?.getBoundingClientRect().left, 
            top: mousePosition.y - navRef.current?.getBoundingClientRect().top,
            transform: 'translate(-50%, -50%)',
            transition: 'opacity 0.3s ease',
            opacity: isScrolled ? 0.4 : 0
          }}
        ></div>
        
        <a href="#" className="text-2xl font-display font-bold text-foreground glow relative z-10">Portfolio</a>
        
        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-8 relative z-10">
          {navLinks.map((link) => (
            <a 
              key={link.label}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className={`text-sm uppercase tracking-wider relative overflow-hidden group ${
                activeLink === link.href.substring(1) 
                  ? 'text-foreground' 
                  : 'text-foreground/80 hover:text-foreground'
              } transition-colors`}
            >
              {link.label}
              <span className={`absolute bottom-0 left-0 w-full h-[1px] bg-primary transform transition-transform duration-300 ${
                activeLink === link.href.substring(1)
                  ? 'scale-x-100' 
                  : 'scale-x-0 group-hover:scale-x-100'
              }`}></span>
            </a>
          ))}
          <ResumeDialog>
            <Button className="btn-fancy relative">Resume</Button>
          </ResumeDialog>
        </nav>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-foreground relative z-10"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile navigation */}
      {isMenuOpen && (
        <nav className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md p-4 flex flex-col space-y-4 animate-fade-in glass">
          {navLinks.map((link) => (
            <a 
              key={link.label}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className={`text-sm uppercase tracking-wider ${
                activeLink === link.href.substring(1) 
                  ? 'text-foreground' 
                  : 'text-foreground/80 hover:text-foreground'
              } transition-colors p-2 magic-border`}
            >
              {link.label}
            </a>
          ))}
          <ResumeDialog>
            <Button className="mt-2 btn-fancy">Resume</Button>
          </ResumeDialog>
        </nav>
      )}
    </header>
  );
}
