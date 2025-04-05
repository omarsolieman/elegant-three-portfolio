
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Github, Linkedin, Mail, Send, Twitter, Sparkles } from "lucide-react";

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 bg-secondary/30 relative">
      <div className="absolute inset-0 bg-animate opacity-50"></div>
      <div className="container mx-auto px-4 md:px-6 relative">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center mb-4 p-2 bg-secondary/50 rounded-full">
            <Sparkles className="w-5 h-5 mr-2 text-primary/70" />
            <span className="text-sm font-medium">Let's Connect</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Get In Touch</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or just want to say hello? Feel free to reach out!
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto bg-secondary/20 p-8 rounded-2xl border border-secondary/50 backdrop-blur-sm">
          <div>
            <h3 className="text-xl font-display font-semibold mb-4">Send Me a Message</h3>
            <form className="space-y-4">
              <div className="relative">
                <Input 
                  type="text" 
                  placeholder="Your Name" 
                  className="bg-secondary/50 border-secondary focus:border-primary/50 transition-colors pl-4" 
                />
              </div>
              <div className="relative">
                <Input 
                  type="email" 
                  placeholder="Your Email" 
                  className="bg-secondary/50 border-secondary focus:border-primary/50 transition-colors pl-4" 
                />
              </div>
              <div className="relative">
                <Textarea 
                  placeholder="Your Message" 
                  className="min-h-[150px] bg-secondary/50 border-secondary focus:border-primary/50 transition-colors pl-4" 
                />
              </div>
              <Button type="submit" className="w-full flex items-center gap-2 bg-secondary/80 hover:bg-secondary/90 group">
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
              
              <div className="flex items-center gap-3 mb-5 group hover-lift">
                <div className="p-3 bg-secondary/50 rounded-full">
                  <Mail className="w-5 h-5 text-primary/70" />
                </div>
                <a href="mailto:hello@example.com" className="text-primary/90 hover:text-primary transition-colors">
                  hello@example.com
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-display font-semibold mb-4">Connect With Me</h3>
              <div className="flex gap-4">
                <a 
                  href="#" 
                  className="p-4 bg-secondary/50 rounded-full hover:bg-primary/10 transition-colors hover:scale-110 transform duration-300"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a 
                  href="#" 
                  className="p-4 bg-secondary/50 rounded-full hover:bg-primary/10 transition-colors hover:scale-110 transform duration-300"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a 
                  href="#" 
                  className="p-4 bg-secondary/50 rounded-full hover:bg-primary/10 transition-colors hover:scale-110 transform duration-300"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
