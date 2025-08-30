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
    <section id="about" className="py-12 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              About Me
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Lead Software Engineer with 9+ years of experience building enterprise-scale applications 
              and AI-powered systems for customs, logistics, and trade operations.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {highlights.map((highlight, index) => (
              <div key={index} className="text-center">
                <div className="text-primary mb-3 flex justify-center">
                  {highlight.icon}
                </div>
                <h3 className="font-medium mb-2">{highlight.title}</h3>
                <p className="text-sm text-muted-foreground">{highlight.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}