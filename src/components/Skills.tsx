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
    <section id="skills" className="py-12 bg-secondary/10">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Skills & Technologies
            </h2>
          </div>

          <div className="space-y-6">
            <div className="flex flex-wrap justify-center gap-2">
              {allSkills.map((skill, index) => (
                <Badge key={index} variant="secondary" className="px-3 py-1">
                  {skill}
                </Badge>
              ))}
            </div>
            
            <div className="text-center">
              <h3 className="font-semibold mb-3">Certifications</h3>
              <div className="flex flex-wrap justify-center gap-2">
                {certifications.map((cert, index) => (
                  <Badge key={index} variant="outline" className="px-2 py-1 text-xs">
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