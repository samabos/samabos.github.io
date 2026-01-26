import { useParams, Link, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Calendar, Clock, ArrowLeft, Share2, Linkedin, Twitter } from "lucide-react";
import { getBlogPost, getRecentPosts } from "../data/blogPosts";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = slug ? getBlogPost(slug) : undefined;
  const recentPosts = getRecentPosts(3).filter(p => p.slug !== slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
              <p className="text-muted-foreground mb-8">
                The blog post you're looking for doesn't exist.
              </p>
              <Button asChild>
                <Link to="/blog">
                  <ArrowLeft size={16} className="mr-2" />
                  Back to Blog
                </Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = `${post.title} by ${post.author.name}`;

  const shareOnTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
      '_blank'
    );
  };

  const shareOnLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      '_blank'
    );
  };

  // Convert markdown-style content to HTML-like rendering
  const renderContent = (content: string) => {
    const lines = content.split('\n');
    const elements: JSX.Element[] = [];
    let inCodeBlock = false;
    let codeBlockContent: string[] = [];
    let codeBlockLang = '';

    lines.forEach((line, index) => {
      // Code block start/end
      if (line.startsWith('```')) {
        if (!inCodeBlock) {
          inCodeBlock = true;
          codeBlockLang = line.slice(3).trim();
          codeBlockContent = [];
        } else {
          elements.push(
            <pre key={index} className="bg-secondary/80 rounded-xl p-5 overflow-x-auto my-6 border border-border/50 shadow-sm">
              <code className={`language-${codeBlockLang} text-sm font-mono leading-relaxed`}>
                {codeBlockContent.join('\n')}
              </code>
            </pre>
          );
          inCodeBlock = false;
          codeBlockContent = [];
        }
        return;
      }

      if (inCodeBlock) {
        codeBlockContent.push(line);
        return;
      }

      // Horizontal rule
      if (line.trim() === '---') {
        elements.push(
          <hr key={index} className="my-8 border-t border-border/60" />
        );
        return;
      }

      // Headers
      if (line.startsWith('## ')) {
        elements.push(
          <h2 key={index} className="text-2xl font-bold mt-10 mb-4 tracking-tight">
            {line.slice(3)}
          </h2>
        );
        return;
      }

      if (line.startsWith('### ')) {
        elements.push(
          <h3 key={index} className="text-xl font-semibold mt-8 mb-3 tracking-tight">
            {line.slice(4)}
          </h3>
        );
        return;
      }

      // List items
      if (line.startsWith('- ')) {
        elements.push(
          <li key={index} className="ml-6 mb-2.5 list-disc text-foreground/90 leading-relaxed">
            {renderInlineMarkdown(line.slice(2))}
          </li>
        );
        return;
      }

      // Numbered list
      const numberedMatch = line.match(/^(\d+)\. (.+)/);
      if (numberedMatch) {
        elements.push(
          <li key={index} className="ml-6 mb-2.5 list-decimal text-foreground/90 leading-relaxed">
            {renderInlineMarkdown(numberedMatch[2])}
          </li>
        );
        return;
      }

      // Empty lines
      if (line.trim() === '') {
        return;
      }

      // Regular paragraph
      elements.push(
        <p key={index} className="mb-5 leading-[1.8] text-foreground/90">
          {renderInlineMarkdown(line)}
        </p>
      );
    });

    return elements;
  };

  const renderInlineMarkdown = (text: string): React.ReactNode => {
    // Handle inline code first
    const parts = text.split(/(`[^`]+`)/g);
    return parts.map((part, i) => {
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code key={i} className="bg-secondary px-1.5 py-0.5 rounded text-sm font-mono">
            {part.slice(1, -1)}
          </code>
        );
      }
      // Handle bold (**text**)
      const boldParts = part.split(/(\*\*[^*]+\*\*)/g);
      return boldParts.map((boldPart, j) => {
        if (boldPart.startsWith('**') && boldPart.endsWith('**')) {
          return <strong key={`${i}-${j}`} className="font-semibold">{boldPart.slice(2, -2)}</strong>;
        }
        // Handle italic (*text*) - single asterisks
        const italicParts = boldPart.split(/(\*[^*]+\*)/g);
        return italicParts.map((italicPart, k) => {
          if (italicPart.startsWith('*') && italicPart.endsWith('*') && italicPart.length > 2) {
            return <em key={`${i}-${j}-${k}`} className="italic text-muted-foreground">{italicPart.slice(1, -1)}</em>;
          }
          // Handle links
          const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
          const linkParts: React.ReactNode[] = [];
          let lastIndex = 0;
          let match;
          while ((match = linkRegex.exec(italicPart)) !== null) {
            if (match.index > lastIndex) {
              linkParts.push(italicPart.slice(lastIndex, match.index));
            }
            linkParts.push(
              <a
                key={`${i}-${j}-${k}-${match.index}`}
                href={match[2]}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline transition-colors"
              >
                {match[1]}
              </a>
            );
            lastIndex = match.index + match[0].length;
          }
          if (lastIndex < italicPart.length) {
            linkParts.push(italicPart.slice(lastIndex));
          }
          return linkParts.length > 0 ? linkParts : italicPart;
        });
      });
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <article className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Back button */}
            <Button variant="ghost" className="mb-8" onClick={() => navigate('/blog')}>
              <ArrowLeft size={16} className="mr-2" />
              Back to Blog
            </Button>

            {/* Article header */}
            <header className="mb-8">
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="default">{post.category}</Badge>
                {post.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                {post.title}
              </h1>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-primary-foreground text-sm">SM</span>
                  </div>
                  <div>
                    <p className="font-medium">{post.author.name}</p>
                    <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Calendar size={14} />
                        <span>{formatDate(post.date)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock size={14} />
                        <span>{post.readTime} min read</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" onClick={shareOnTwitter}>
                    <Twitter size={16} />
                  </Button>
                  <Button variant="outline" size="sm" onClick={shareOnLinkedIn}>
                    <Linkedin size={16} />
                  </Button>
                </div>
              </div>
            </header>

            {/* Featured image */}
            <div className="mb-8 rounded-lg overflow-hidden">
              <ImageWithFallback
                src={post.image}
                alt={post.title}
                className="w-full h-64 md:h-96 object-cover"
              />
            </div>

            {/* Article content */}
            <div className="prose prose-lg max-w-none text-[1.05rem]">
              {renderContent(post.content)}
            </div>

            {/* Share section */}
            <div className="border-t border-border mt-12 pt-8">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Share this article</h3>
                  <p className="text-sm text-muted-foreground">
                    If you found this helpful, share it with others!
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" onClick={shareOnTwitter}>
                    <Twitter size={16} className="mr-2" />
                    Twitter
                  </Button>
                  <Button variant="outline" onClick={shareOnLinkedIn}>
                    <Linkedin size={16} className="mr-2" />
                    LinkedIn
                  </Button>
                </div>
              </div>
            </div>

            {/* Related posts */}
            {recentPosts.length > 0 && (
              <div className="border-t border-border mt-8 pt-8">
                <h3 className="text-2xl font-bold mb-6">More Articles</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {recentPosts.slice(0, 2).map((relatedPost) => (
                    <Link
                      key={relatedPost.slug}
                      to={`/blog/${relatedPost.slug}`}
                      className="group"
                    >
                      <div className="border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                        <ImageWithFallback
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="p-4">
                          <h4 className="font-semibold group-hover:text-primary transition-colors line-clamp-2">
                            {relatedPost.title}
                          </h4>
                          <p className="text-sm text-muted-foreground mt-2">
                            {relatedPost.readTime} min read
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
