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
    <section className="py-20 md:py-28 bg-gradient-to-b from-secondary/5 via-background to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center space-y-10">
          <div className="space-y-5">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Samson Maborukoje
            </h1>
            <p className="text-xl text-muted-foreground font-medium">
              Full Stack Developer & AI Enthusiast
            </p>
            <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Creating innovative web applications and AI-powered solutions that solve real-world problems.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Button
              onClick={() => scrollToSection('projects')}
              className="px-6 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              View My Work
            </Button>
            <Button
              variant="outline"
              onClick={() => scrollToSection('contact')}
              className="px-6 hover:bg-secondary/50 transition-colors duration-300"
            >
              Get In Touch
            </Button>
          </div>

          <div className="flex items-center justify-center space-x-5 pt-2">
            <a
              href="https://github.com/samabos"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors duration-200 p-2 rounded-full hover:bg-secondary/50"
              aria-label="GitHub"
            >
              <Github size={22} />
            </a>
            <a
              href="https://www.linkedin.com/in/samabos"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors duration-200 p-2 rounded-full hover:bg-secondary/50"
              aria-label="LinkedIn"
            >
              <Linkedin size={22} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}