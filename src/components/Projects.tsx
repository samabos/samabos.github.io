import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ExternalLink, Github, Star, GitFork } from "lucide-react";

interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  stats: { stars: number; forks: number };
  type: string;
  featured: boolean;
  liveUrl?: string;
  githubUrl?: string;
  inProgress?: boolean;
}

export function Projects() {
  const projects: Project[] = [
    {
      title: "AIPM - Smart Project Setup & Artifact Generation",
      description: "Transform your ideas into structured projects with AI-generated artifacts. Experience intelligent project initialization that creates comprehensive documentation, templates, and structures automatically.",
      image: "https://images.unsplash.com/photo-1649451844931-57e22fc82de3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBSSUyMHByb2plY3QlMjBtYW5hZ2VtZW50JTIwZGFzaGJvYXJkfGVufDF8fHx8MTc1NjU2MTk3OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      technologies: ["React", "OpenAI API", "TypeScript", "Vercel"],
      stats: { stars: 145, forks: 28 },
      type: "AI Project",
      featured: true,
      liveUrl: "https://aipm-murex.vercel.app/",
      githubUrl: "https://github.com/samabos/aipm"
    },
    {
      title: "HS.Codes - Commodity Classification System",
      description: "Multilabel text classification using retrained DistilBERT for WCO Commodity Codes and Tariffs Classification. Classify commodities to get information about duty, levy, VAT, and regulatory requirements for import/export.",
      image: "https://images.unsplash.com/photo-1546327740-1d4c4e191b65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tb2RpdHklMjBjbGFzc2lmaWNhdGlvbiUyMGNvZGUlMjBzeXN0ZW18ZW58MXx8fHwxNzU2NTY0NjcxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      technologies: ["Python", "DistilBERT", "FastAPI", "Machine Learning", "NLP"],
      stats: { stars: 89, forks: 15 },
      type: "AI Project",
      featured: true,
      liveUrl: "https://hs.codes",
      githubUrl: "https://github.com/samabos/hscodesdotnet"
    },
    {
      title: "STRIX - AI Risk Assessment System",
      description: "Strategic Trade Risk Intelligence eXchange - Revolutionizing customs workflow management with intelligent risk assessment, real-time analytics, and seamless multi-agency collaboration for secure trade operations.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyaXNrJTIwYXNzZXNzbWVudCUyMGRhc2hib2FyZCUyMGFuYWx5dGljc3xlbnwxfHx8fDE3NTY1NjQ2NzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      technologies: ["ASP.NET Core", "C#", "Azure", "Machine Learning", "Risk Analytics"],
      stats: { stars: 78, forks: 19 },
      type: "Enterprise System",
      featured: false,
      liveUrl: "https://strix.teqcenta.com/",
      githubUrl: "https://github.com/samabos/trade.risk.service"
    },
    {
      title: "ClubQore - Football Club Management",
      description: "Power Your Football Club with ClubQore - Complete management solution for football clubs, academies, and training centers. Manage members, schedule events, process payments, and engage with parents.",
      image: "https://images.unsplash.com/photo-1625990637351-ee0e5e9ba5e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb290YmFsbCUyMGNsdWIlMjBtYW5hZ2VtZW50JTIweW91dGglMjBzcG9ydHN8ZW58MXx8fHwxNzU2NTY0Njc5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      technologies: ["ASP.NET Core", "React", "C#", "SQL Server", "Payment Integration"],
      stats: { stars: 45, forks: 8 },
      type: "Web Development",
      featured: false,
      githubUrl: "https://github.com/samabos/clubqore",
      inProgress: true
    },

  ];

  const featuredProjects = projects.filter(project => project.featured);
  const otherProjects = projects.filter(project => !project.featured);

  return (
    <section id="projects" className="py-16 md:py-20 bg-secondary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <Badge variant="secondary" className="mb-4 px-3 py-1">Featured Work</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-5 tracking-tight">
              Projects & Innovations
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              A selection of recent projects showcasing my expertise in web development
              and artificial intelligence applications.
            </p>
          </div>

          {/* Featured Projects */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {featuredProjects.map((project, index) => (
              <Card key={index} className="border border-border/40 shadow-sm hover:shadow-lg transition-all duration-300 group bg-card/50 backdrop-blur-sm">
                <div className="relative overflow-hidden">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge variant="secondary">{project.type}</Badge>
                    {project.inProgress && (
                      <Badge variant="outline" className="bg-orange-100 text-orange-700 border-orange-200">
                        In Progress
                      </Badge>
                    )}
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{project.title}</span>
                    <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Star size={14} />
                        <span>{project.stats.stars}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <GitFork size={14} />
                        <span>{project.stats.forks}</span>
                      </div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex space-x-3 pt-2">
                    {project.githubUrl ? (
                      <Button size="sm" variant="outline" asChild>
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github size={16} className="mr-2" />
                          Code
                        </a>
                      </Button>
                    ) : (
                      <Button size="sm" variant="outline">
                        <Github size={16} className="mr-2" />
                        Code
                      </Button>
                    )}
                    {project.liveUrl ? (
                      <Button size="sm" asChild>
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink size={16} className="mr-2" />
                          Live Demo
                        </a>
                      </Button>
                    ) : project.inProgress ? (
                      <Button size="sm" disabled>
                        <ExternalLink size={16} className="mr-2" />
                        Coming Soon
                      </Button>
                    ) : (
                      <Button size="sm">
                        <ExternalLink size={16} className="mr-2" />
                        Live Demo
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Other Projects Grid */}
          <div>
            <h3 className="text-2xl font-semibold mb-8 text-center tracking-tight">More Projects</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherProjects.map((project, index) => (
                <Card key={index} className="border border-border/40 shadow-sm hover:shadow-md transition-all duration-300 group bg-card/50">
                  <div className="relative overflow-hidden">
                    <ImageWithFallback
                      src={project.image}
                      alt={project.title}
                      className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2 flex gap-1">
                      <Badge variant="secondary" className="text-xs">{project.type}</Badge>
                      {project.inProgress && (
                        <Badge variant="outline" className="text-xs bg-orange-100 text-orange-700 border-orange-200">
                          In Progress
                        </Badge>
                      )}
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{project.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 3).map((tech, techIndex) => (
                        <Badge key={techIndex} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.technologies.length - 3}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1">
                          <Star size={12} />
                          <span>{project.stats.stars}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <GitFork size={12} />
                          <span>{project.stats.forks}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        {project.githubUrl ? (
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0" asChild>
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                              <Github size={14} />
                            </a>
                          </Button>
                        ) : (
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <Github size={14} />
                          </Button>
                        )}
                        {project.liveUrl ? (
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0" asChild>
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink size={14} />
                            </a>
                          </Button>
                        ) : project.inProgress ? (
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0" disabled>
                            <ExternalLink size={14} />
                          </Button>
                        ) : (
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <ExternalLink size={14} />
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}