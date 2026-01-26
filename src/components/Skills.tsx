import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";

export function Skills() {
  const skillCategories = [
    {
      title: "Languages & Frameworks",
      skills: [
        { name: "C#", level: 95 },
        { name: "ASP.NET Core", level: 95 },
        { name: "Python", level: 85 },
        { name: "JavaScript", level: 90 },
        { name: "TypeScript", level: 90 },
        { name: "Node.js", level: 85 },
        { name: "React", level: 90 },
        { name: "FastAPI", level: 80 }
      ]
    },
    {
      title: "Cloud & DevOps",
      skills: [
        { name: "Microsoft Azure", level: 95 },
        { name: "AWS", level: 80 },
        { name: "GCP", level: 75 },
        { name: "Docker", level: 90 },
        { name: "Azure DevOps", level: 95 },
        { name: "GitHub Actions", level: 85 },
        { name: "Terraform", level: 75 }
      ]
    },
    {
      title: "Architecture & Security",
      skills: [
        { name: "Microservices", level: 95 },
        { name: "CLEAN Architecture", level: 90 },
        { name: "Event-Driven", level: 85 },
        { name: "DDD", level: 80 },
        { name: "Azure AD", level: 90 },
        { name: "Okta", level: 85 },
        { name: "Auth0", level: 85 }
      ]
    },
    {
      title: "Databases & APIs",
      skills: [
        { name: "SQL Server", level: 95 },
        { name: "PostgreSQL", level: 85 },
        { name: "MongoDB", level: 80 },
        { name: "RESTful APIs", level: 95 },
        { name: "GraphQL", level: 80 },
        { name: "SOAP", level: 85 }
      ]
    }
  ];

  const certifications = [
    "Azure DevOps Engineer Expert (AZ-400)",
    "ISO 9001 QMS Lead Implementer",
    "ISO 27001 ISMS Lead Auditor",
    "Harvard Business School - Leadership",
    "PRINCE2 Foundation",
    "ITIL v3 Foundation",
    "Scrum Fundamentals Certified"
  ];

  const allSkills = skillCategories.flatMap(category => 
    category.skills.map(skill => skill.name)
  );

  return (
    <section id="skills" className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight">
              Skills & Technologies
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Technologies and tools I work with to build robust, scalable solutions.
            </p>
          </div>

          <div className="space-y-10">
            <div className="flex flex-wrap justify-center gap-2.5">
              {allSkills.map((skill, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="px-3.5 py-1.5 text-sm hover:bg-secondary/80 transition-colors duration-200 cursor-default"
                >
                  {skill}
                </Badge>
              ))}
            </div>

            <div className="text-center pt-4">
              <h3 className="font-semibold mb-4 text-sm tracking-tight text-muted-foreground uppercase">Certifications</h3>
              <div className="flex flex-wrap justify-center gap-2">
                {certifications.map((cert, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="px-3 py-1.5 text-xs border-border/60 hover:border-border transition-colors duration-200"
                  >
                    {cert}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}