import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Code, Brain, Rocket, Users } from "lucide-react";

export function About() {
  const highlights = [
    {
      icon: <Code className="w-6 h-6" />,
      title: "Enterprise Development",
      description: "9+ years building scalable enterprise applications with .NET and cloud technologies"
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI & Risk Systems",
      description: "Specialized in AI-powered risk assessment and trade intelligence systems"
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      title: "Cloud Architecture",
      description: "Expert in Azure, microservices, and CI/CD for high-performance systems"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Technical Leadership",
      description: "Led cross-functional teams delivering 20+ enterprise applications"
    }
  ];

  return (
    <section id="about" className="py-16 md:py-20 bg-section-warm">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-2xl md:text-3xl font-bold mb-5 tracking-tight text-foreground">
              About Me
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Lead Software Engineer with 9+ years of experience building enterprise-scale applications
              and AI-powered systems for customs, logistics, and trade operations.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {highlights.map((highlight, index) => (
              <div key={index} className="text-center group p-4 rounded-xl bg-white/50 dark:bg-card/50 hover:bg-white dark:hover:bg-card hover:shadow-md transition-all duration-300">
                <div className="text-accent mb-4 flex justify-center transition-transform duration-300 group-hover:scale-110">
                  {highlight.icon}
                </div>
                <h3 className="font-semibold mb-2 text-sm tracking-tight text-foreground">{highlight.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{highlight.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}