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
    <section id="contact" className="py-16 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Let's Work Together
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Interested in collaborating or have a project in mind? I'd love to hear from you.
            </p>
          </div>

          <div className="text-center space-y-8">
            <div className="flex justify-center">
              <div className="flex flex-col items-center p-4 rounded-lg">
                <div className="text-primary mb-2">
                  <MapPin className="w-5 h-5" />
                </div>
                <p className="font-medium">Location</p>
                <p className="text-sm text-muted-foreground">United Kingdom</p>
              </div>
            </div>

            <div className="flex justify-center space-x-6">
              {socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-900/20 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-700 dark:text-green-400">Available for hire</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}