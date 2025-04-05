
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 
        ${isScrolled ? 'bg-background/80 backdrop-blur-md py-3' : 'bg-transparent py-5'}`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <a href="#" className="text-2xl font-display font-bold text-foreground">Portfolio</a>
        
        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.label}
              href={link.href}
              className="text-sm uppercase tracking-wider text-foreground/80 hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
          <Button>Resume</Button>
        </nav>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-foreground"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile navigation */}
      {isMenuOpen && (
        <nav className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md p-4 flex flex-col space-y-4 animate-fade-in">
          {navLinks.map((link) => (
            <a 
              key={link.label}
              href={link.href}
              className="text-sm uppercase tracking-wider text-foreground/80 hover:text-foreground transition-colors p-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <Button className="mt-2">Resume</Button>
        </nav>
      )}
    </header>
  );
}
