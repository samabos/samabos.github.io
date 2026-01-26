import { Github, Linkedin, Mail, Heart, Rss } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    if (isHomePage) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(`/#${sectionId}`);
    }
  };

  return (
    <footer className="bg-section-tertiary border-t border-border/40">
      <div className="container mx-auto px-4 py-14">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
            <div className="space-y-4">
              <Link to="/" className="flex items-center space-x-3 group">
                <div className="w-9 h-9 bg-accent rounded-full flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300">
                  <span className="text-accent-foreground text-sm font-medium">SM</span>
                </div>
                <span className="font-semibold tracking-tight text-foreground">Samson Maborukoje</span>
              </Link>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Full Stack Developer & AI Enthusiast creating innovative solutions
                that make a difference.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-sm tracking-tight text-foreground">Quick Links</h3>
              <div className="space-y-2.5">
                <button
                  onClick={() => scrollToSection('about')}
                  className="block text-sm text-muted-foreground hover:text-accent transition-colors duration-200"
                >
                  About
                </button>
                <button
                  onClick={() => scrollToSection('skills')}
                  className="block text-sm text-muted-foreground hover:text-accent transition-colors duration-200"
                >
                  Skills
                </button>
                <button
                  onClick={() => scrollToSection('projects')}
                  className="block text-sm text-muted-foreground hover:text-accent transition-colors duration-200"
                >
                  Projects
                </button>
                <Link
                  to="/blog"
                  className="block text-sm text-muted-foreground hover:text-accent transition-colors duration-200"
                >
                  Blog
                </Link>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="block text-sm text-muted-foreground hover:text-accent transition-colors duration-200"
                >
                  Contact
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-sm tracking-tight text-foreground">Connect</h3>
              <div className="flex space-x-2">
                <a
                  href="https://github.com/samabos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-accent transition-all duration-200 p-2.5 rounded-lg hover:bg-secondary"
                  aria-label="GitHub"
                >
                  <Github size={18} />
                </a>
                <a
                  href="https://www.linkedin.com/in/samabos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-accent transition-all duration-200 p-2.5 rounded-lg hover:bg-secondary"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
                <a
                  href="mailto:mabos.samson@gmail.com"
                  className="text-muted-foreground hover:text-accent transition-all duration-200 p-2.5 rounded-lg hover:bg-secondary"
                  aria-label="Email"
                >
                  <Mail size={18} />
                </a>
                <a
                  href="/rss.xml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-accent transition-all duration-200 p-2.5 rounded-lg hover:bg-secondary"
                  aria-label="RSS Feed"
                >
                  <Rss size={18} />
                </a>
              </div>
              <button
                onClick={scrollToTop}
                className="text-sm text-muted-foreground hover:text-accent transition-colors duration-200 flex items-center gap-1.5 mt-4"
              >
                Back to top
                <span className="text-xs">↑</span>
              </button>
            </div>
          </div>

          <div className="border-t border-border/40 pt-8 text-center">
            <p className="text-sm text-muted-foreground flex items-center justify-center gap-1.5">
              <span>© {currentYear} Samson Maborukoje</span>
              <span className="opacity-50">·</span>
              <span className="flex items-center gap-1">
                Made with <Heart size={14} className="text-red-500/80 fill-current" />
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
