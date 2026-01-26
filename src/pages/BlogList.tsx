import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Calendar, Clock, ArrowRight, Rss, Filter, X } from "lucide-react";
import { blogPosts, BLOG_CATEGORIES } from "../data/blogPosts";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export function BlogList() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Get all unique tags from filtered posts
  const getTagsForCategory = (category: string | null) => {
    const posts = category
      ? blogPosts.filter(post => post.category === category)
      : blogPosts;
    return Array.from(new Set(posts.flatMap(post => post.tags))).sort();
  };

  const allTags = getTagsForCategory(selectedCategory);

  // Filter posts by selected category and tag
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = !selectedCategory || post.category === selectedCategory;
    const matchesTag = !selectedTag || post.tags.includes(selectedTag);
    return matchesCategory && matchesTag;
  });

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

  const hasActiveFilters = selectedCategory !== null || selectedTag !== null;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Page header */}
          <div className="max-w-4xl mx-auto text-center mb-12">
            <Badge variant="secondary" className="mb-4">Blog</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Articles & Insights
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Exploring software development, artificial intelligence, and building
              products that solve real-world problems.
            </p>
          </div>

          {/* Main content with sidebar */}
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
            {/* Sidebar - filters */}
            <aside className="lg:w-72 lg:flex-shrink-0">
              <div className="lg:sticky lg:top-24 space-y-6">
                {/* Filter header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <Filter size={16} />
                    <span>Filters</span>
                  </div>
                  {hasActiveFilters && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-1 text-muted-foreground hover:text-foreground"
                      onClick={() => {
                        setSelectedCategory(null);
                        setSelectedTag(null);
                      }}
                    >
                      <X size={14} className="mr-1" />
                      Clear
                    </Button>
                  )}
                </div>

                {/* Categories */}
                <div className="bg-card rounded-xl p-5 border border-border/50 shadow-sm">
                  <h3 className="text-sm font-semibold mb-4 text-foreground">Categories</h3>
                  <div className="space-y-2">
                    <button
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedCategory === null
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                      }`}
                      onClick={() => {
                        setSelectedCategory(null);
                        setSelectedTag(null);
                      }}
                    >
                      All Categories
                      <span className="ml-2 text-xs opacity-70">({blogPosts.length})</span>
                    </button>
                    {BLOG_CATEGORIES.map(category => {
                      const count = blogPosts.filter(p => p.category === category).length;
                      return (
                        <button
                          key={category}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                            selectedCategory === category
                              ? "bg-primary text-primary-foreground"
                              : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                          }`}
                          onClick={() => {
                            setSelectedCategory(category);
                            setSelectedTag(null);
                          }}
                        >
                          {category}
                          <span className="ml-2 text-xs opacity-70">({count})</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Tags */}
                <div className="bg-card rounded-xl p-5 border border-border/50 shadow-sm">
                  <h3 className="text-sm font-semibold mb-4 text-foreground">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {allTags.map(tag => (
                      <Badge
                        key={tag}
                        variant={selectedTag === tag ? "default" : "outline"}
                        className={`cursor-pointer transition-all ${
                          selectedTag === tag
                            ? ""
                            : "hover:bg-secondary"
                        }`}
                        onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* RSS Subscribe */}
                <div className="bg-gradient-to-br from-secondary to-muted rounded-xl p-5 border border-border/50">
                  <h3 className="text-sm font-semibold mb-2 text-foreground">Stay Updated</h3>
                  <p className="text-xs text-muted-foreground mb-4">
                    Subscribe to get notified about new articles.
                  </p>
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <a href="/rss.xml" target="_blank" rel="noopener noreferrer">
                      <Rss size={14} className="mr-2" />
                      Subscribe via RSS
                    </a>
                  </Button>
                </div>
              </div>
            </aside>

            {/* Main content - posts */}
            <div className="flex-1 min-w-0">
              {/* Active filters summary */}
              {hasActiveFilters && (
                <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
                  <span>Showing:</span>
                  {selectedCategory && (
                    <Badge variant="secondary" className="gap-1">
                      {selectedCategory}
                      <X
                        size={12}
                        className="cursor-pointer hover:text-foreground"
                        onClick={() => setSelectedCategory(null)}
                      />
                    </Badge>
                  )}
                  {selectedTag && (
                    <Badge variant="secondary" className="gap-1">
                      {selectedTag}
                      <X
                        size={12}
                        className="cursor-pointer hover:text-foreground"
                        onClick={() => setSelectedTag(null)}
                      />
                    </Badge>
                  )}
                  <span className="text-muted-foreground/70">
                    ({sortedPosts.length} {sortedPosts.length === 1 ? 'article' : 'articles'})
                  </span>
                </div>
              )}

              {/* Posts grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sortedPosts.map((post) => (
                  <Card key={post.slug} className="bg-card border border-border/50 shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col overflow-hidden">
                    <div className="relative overflow-hidden">
                      <ImageWithFallback
                        src={post.image}
                        alt={post.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute top-4 left-4">
                        <Badge variant="secondary" className="backdrop-blur-sm bg-white/90 dark:bg-black/70 text-foreground">
                          {post.category}
                        </Badge>
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
                      <CardTitle className="text-xl leading-tight group-hover:text-accent transition-colors">
                        <Link to={`/blog/${post.slug}`}>
                          {post.title}
                        </Link>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col">
                      <p className="text-muted-foreground mb-4 flex-1 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Button variant="ghost" className="w-fit p-0 h-auto text-accent hover:text-accent/80 font-medium" asChild>
                        <Link to={`/blog/${post.slug}`}>
                          Read more <ArrowRight size={16} className="ml-1" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {sortedPosts.length === 0 && (
                <div className="text-center py-16 bg-card rounded-xl border border-border/50">
                  <p className="text-muted-foreground mb-4">
                    No posts found with the selected filters.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedCategory(null);
                      setSelectedTag(null);
                    }}
                  >
                    Clear all filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
