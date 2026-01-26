import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Calendar, Clock, ArrowRight, Rss } from "lucide-react";
import { blogPosts } from "../data/blogPosts";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export function BlogList() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Get all unique tags
  const allTags = Array.from(
    new Set(blogPosts.flatMap(post => post.tags))
  ).sort();

  // Filter posts by selected tag
  const filteredPosts = selectedTag
    ? blogPosts.filter(post => post.tags.includes(selectedTag))
    : blogPosts;

  // Sort by date (newest first)
  const sortedPosts = [...filteredPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Page header */}
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">Blog</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Articles & Insights
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
                Exploring software development, artificial intelligence, and building
                products that solve real-world problems.
              </p>
              <Button variant="outline" size="sm" asChild>
                <a href="/rss.xml" target="_blank" rel="noopener noreferrer">
                  <Rss size={16} className="mr-2" />
                  Subscribe via RSS
                </a>
              </Button>
            </div>

            {/* Tags filter */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-2 justify-center">
                <Button
                  variant={selectedTag === null ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTag(null)}
                >
                  All
                </Button>
                {allTags.map(tag => (
                  <Button
                    key={tag}
                    variant={selectedTag === tag ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTag(tag)}
                  >
                    {tag}
                  </Button>
                ))}
              </div>
            </div>

            {/* Posts grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedPosts.map((post) => (
                <Card key={post.slug} className="border-0 shadow-lg hover:shadow-xl transition-shadow group flex flex-col">
                  <div className="relative overflow-hidden">
                    <ImageWithFallback
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary">{post.tags[0]}</Badge>
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                      <div className="flex items-center space-x-1">
                        <Calendar size={14} />
                        <span>{formatDate(post.date)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock size={14} />
                        <span>{post.readTime} min read</span>
                      </div>
                    </div>
                    <CardTitle className="text-xl leading-tight group-hover:text-primary transition-colors">
                      <Link to={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <p className="text-muted-foreground mb-4 flex-1">
                      {post.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Button variant="ghost" className="w-fit p-0 h-auto text-primary hover:text-primary/80" asChild>
                      <Link to={`/blog/${post.slug}`}>
                        Read more <ArrowRight size={16} className="ml-1" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {sortedPosts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No posts found with the selected tag.
                </p>
                <Button
                  variant="link"
                  onClick={() => setSelectedTag(null)}
                  className="mt-2"
                >
                  Clear filter
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
