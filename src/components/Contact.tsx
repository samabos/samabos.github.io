import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Send } from "lucide-react";
import { useState } from "react";

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: <MapPin className="w-5 h-5" />,
      label: "Location",
      value: "United Kingdom",
      href: "#"
    }
  ];

  const socialLinks = [
    {
      name: "GitHub",
      icon: <Github className="w-6 h-6" />,
      href: "https://github.com/samabos",
      username: "@samabos"
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="w-6 h-6" />,
      href: "https://www.linkedin.com/in/samabos",
      username: "/in/samabos"
    },
    {
      name: "Twitter",
      icon: <Twitter className="w-6 h-6" />,
      href: "https://twitter.com/samabos",
      username: "@samabos"
    }
  ];

  return (
    <section id="contact" className="py-16 bg-section-soft relative overflow-hidden">
      {/* Subtle decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-64 h-64 bg-accent/8 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-primary/6 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
              Let's Work Together
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Interested in collaborating or have a project in mind? I'd love to hear from you.
            </p>
          </div>

          <div className="text-center space-y-8">
            <div className="flex justify-center">
              <div className="flex flex-col items-center p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/30">
                <div className="text-accent mb-2">
                  <MapPin className="w-5 h-5" />
                </div>
                <p className="font-medium text-foreground">Location</p>
                <p className="text-sm text-muted-foreground">United Kingdom</p>
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-accent transition-all duration-200 p-3 rounded-full hover:bg-card border border-transparent hover:border-border/50"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-50 dark:bg-green-900/20 rounded-full border border-green-200/50 dark:border-green-800/50 shadow-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-green-700 dark:text-green-400">Available for hire</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}