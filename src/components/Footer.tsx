import { Github, Linkedin, Mail, Heart } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-secondary/50 border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground">SM</span>
                </div>
                <span className="font-semibold">Samson Maborukoje</span>
              </div>
              <p className="text-muted-foreground">
                Full Stack Developer & AI Enthusiast creating innovative solutions 
                that make a difference.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Quick Links</h3>
              <div className="space-y-2">
                <button 
                  onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                  className="block text-muted-foreground hover:text-primary transition-colors"
                >
                  About
                </button>
                <button 
                  onClick={() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })}
                  className="block text-muted-foreground hover:text-primary transition-colors"
                >
                  Skills
                </button>
                <button 
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                  className="block text-muted-foreground hover:text-primary transition-colors"
                >
                  Projects
                </button>
                <button 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="block text-muted-foreground hover:text-primary transition-colors"
                >
                  Contact
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Connect</h3>
              <div className="flex space-x-4">
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
                <a 
                  href="mailto:mabos.samson@gmail.com" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Email"
                >
                  <Mail size={20} />
                </a>
              </div>
              <button 
                onClick={scrollToTop}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Back to top ↑
              </button>
            </div>
          </div>

          <div className="border-t border-border pt-8 text-center">
            <p className="text-muted-foreground flex items-center justify-center space-x-1">
              <span>© {currentYear} Samson Maborukoje. Made with</span>
              <Heart size={16} className="text-red-500 fill-current" />
              <span>using React & Tailwind CSS</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}