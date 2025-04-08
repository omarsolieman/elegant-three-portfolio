
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Github, Linkedin, Mail, Send, Twitter, Sparkles } from "lucide-react";
import { useState } from "react";

export default function ContactSection() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [isHovered, setIsHovered] = useState(null);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contact" className="py-24 bg-secondary/30 relative">
      <div className="absolute inset-0 bg-animate opacity-50"></div>
      
      {/* Decorative lights */}
      <div className="absolute top-0 left-1/4 w-32 h-32 bg-primary/5 rounded-full blur-3xl animate-pulse-glow"></div>
      <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-primary/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1.5s" }}></div>
      
      <div className="container mx-auto px-4 md:px-6 relative">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center mb-4 p-2 bg-secondary/50 rounded-full moving-border">
            <Sparkles className="w-5 h-5 mr-2 text-primary/70" />
            <span className="text-sm font-medium">Let's Connect</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 glow">Get In Touch</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto animate-shimmer">
            Have a project in mind or just want to say hello? Feel free to reach out!
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto magic-border bg-secondary/20 p-8 rounded-2xl border border-secondary/50 backdrop-blur-sm hover-scale">
          <div>
            <h3 className="text-xl font-display font-semibold mb-4">Send Me a Message</h3>
            <form className="space-y-4">
              <div className="relative overflow-hidden rounded-md group">
                <Input 
                  type="text" 
                  name="name"
                  value={formState.name}
                  onChange={handleInputChange}
                  placeholder="Your Name" 
                  className="bg-secondary/50 border-secondary focus:border-primary/50 transition-colors pl-4 group-hover:border-primary/30" 
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shimmer pointer-events-none"></div>
              </div>
              <div className="relative overflow-hidden rounded-md group">
                <Input 
                  type="email" 
                  name="email"
                  value={formState.email}
                  onChange={handleInputChange}
                  placeholder="Your Email" 
                  className="bg-secondary/50 border-secondary focus:border-primary/50 transition-colors pl-4 group-hover:border-primary/30" 
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shimmer pointer-events-none"></div>
              </div>
              <div className="relative overflow-hidden rounded-md group">
                <Textarea 
                  name="message"
                  value={formState.message}
                  onChange={handleInputChange}
                  placeholder="Your Message" 
                  className="min-h-[150px] bg-secondary/50 border-secondary focus:border-primary/50 transition-colors pl-4 group-hover:border-primary/30" 
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shimmer pointer-events-none"></div>
              </div>
              <Button type="submit" className="w-full flex items-center gap-2 bg-secondary/80 hover:bg-secondary/90 group btn-fancy">
                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" /> Send Message
              </Button>
            </form>
          </div>
          
          <div className="flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-display font-semibold mb-4">Contact Information</h3>
              <p className="text-muted-foreground mb-6">
                I'm currently available for freelance work and job opportunities.
                If you have a project that needs some creative coding, let's talk!
              </p>
              
              <div className="flex items-center gap-3 mb-5 group hover-lift hover-glow">
                <div className="p-3 bg-secondary/50 rounded-full magic-border">
                  <Mail className="w-5 h-5 text-primary/70" />
                </div>
                <a href="mailto:omarsoliemanwork@gmail.com" className="text-primary/90 hover:text-primary transition-colors">
                  omarsoliemanwork@gmail.com
                </a>
              </div>
              
              <div className="flex items-center gap-3 mb-5 group hover-lift hover-glow">
                <div className="p-3 bg-secondary/50 rounded-full magic-border">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-primary/70">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <a href="tel:+60142345515" className="text-primary/90 hover:text-primary transition-colors">
                  +60 14-234 5515
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-display font-semibold mb-4">Connect With Me</h3>
              <div className="flex gap-4">
                {[
                  { icon: Github, label: "GitHub", url: "https://github.com" },
                  { icon: Linkedin, label: "LinkedIn", url: "https://linkedin.com" },
                  { icon: Twitter, label: "Twitter", url: "https://twitter.com" }
                ].map((item, i) => (
                  <a 
                    key={i}
                    href={item.url} 
                    target="_blank"
                    rel="noreferrer"
                    className="p-4 bg-secondary/50 rounded-full moving-border hover:bg-primary/10 transition-colors hover:scale-110 transform duration-300"
                    aria-label={item.label}
                    onMouseEnter={() => setIsHovered(i)}
                    onMouseLeave={() => setIsHovered(null)}
                  >
                    <item.icon className={`w-5 h-5 ${isHovered === i ? 'animate-pulse' : ''}`} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
