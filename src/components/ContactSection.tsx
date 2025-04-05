
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Github, Linkedin, Mail, Send, Twitter } from "lucide-react";

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Get In Touch</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or just want to say hello? Feel free to reach out!
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <div>
            <h3 className="text-xl font-display font-semibold mb-4">Send Me a Message</h3>
            <form className="space-y-4">
              <div>
                <Input type="text" placeholder="Your Name" className="bg-secondary/50 border-secondary" />
              </div>
              <div>
                <Input type="email" placeholder="Your Email" className="bg-secondary/50 border-secondary" />
              </div>
              <div>
                <Textarea placeholder="Your Message" className="min-h-[150px] bg-secondary/50 border-secondary" />
              </div>
              <Button type="submit" className="w-full flex items-center gap-2">
                <Send className="w-4 h-4" /> Send Message
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
              
              <div className="flex items-center gap-3 mb-3">
                <Mail className="w-5 h-5 text-primary/70" />
                <a href="mailto:hello@example.com" className="text-muted-foreground hover:text-primary transition-colors">
                  hello@example.com
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-display font-semibold mb-4">Connect With Me</h3>
              <div className="flex space-x-4">
                <a href="#" className="p-3 bg-secondary rounded-full hover:bg-primary/10 transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                <a href="#" className="p-3 bg-secondary rounded-full hover:bg-primary/10 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="p-3 bg-secondary rounded-full hover:bg-primary/10 transition-colors">
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
