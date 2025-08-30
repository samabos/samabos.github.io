import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Github, Linkedin, Mail, Download } from "lucide-react";

export function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-secondary/10 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold">
              Samson Maborukoje
            </h1>
            <p className="text-lg text-muted-foreground">
              Full Stack Developer & AI Enthusiast
            </p>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Creating innovative web applications and AI-powered solutions that solve real-world problems.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              onClick={() => scrollToSection('projects')}
            >
              View My Work
            </Button>
            <Button 
              variant="outline" 
              onClick={() => scrollToSection('contact')}
            >
              Get In Touch
            </Button>
          </div>

          <div className="flex items-center justify-center space-x-6">
            <a 
              href="https://github.com/samabos" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a 
              href="https://www.linkedin.com/in/samabos" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}