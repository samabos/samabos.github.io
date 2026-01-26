/**
 * RSS Feed Generator
 * Run this script after building to generate the RSS feed
 * Usage: node scripts/generateRss.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Blog posts data - keep in sync with src/data/blogPosts.ts
const blogPosts = [
  {
    slug: "building-ai-powered-project-management",
    title: "Building AI-Powered Project Management Tools",
    excerpt: "Learn how I built AIPM, a tool that transforms ideas into structured projects with AI-generated artifacts and intelligent project initialization.",
    date: "2025-01-15",
    tags: ["AI", "React", "TypeScript", "Productivity"],
  },
  {
    slug: "multilabel-text-classification-with-distilbert",
    title: "Multilabel Text Classification with DistilBERT for Trade Compliance",
    excerpt: "How I built HS.Codes - a commodity classification system using retrained DistilBERT for WCO Commodity Codes and Tariffs Classification.",
    date: "2025-01-08",
    tags: ["Machine Learning", "NLP", "Python", "Trade Tech"],
  },
  {
    slug: "risk-assessment-systems-in-customs",
    title: "Building Intelligent Risk Assessment Systems for Customs Operations",
    excerpt: "An inside look at STRIX - Strategic Trade Risk Intelligence eXchange, and how AI is revolutionizing customs workflow management.",
    date: "2024-12-20",
    tags: ["AI", "Risk Analytics", "ASP.NET Core", "Enterprise"],
  }
];

const siteUrl = 'https://samabos.github.io';
const siteName = 'Samson Maborukoje';
const siteDescription = 'Thoughts on software development, artificial intelligence, and building products that solve real-world problems.';

function escapeXml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function formatRssDate(dateString) {
  const date = new Date(dateString);
  return date.toUTCString();
}

function generateRssFeed() {
  const sortedPosts = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const items = sortedPosts.map(post => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${siteUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${siteUrl}/blog/${post.slug}</guid>
      <description>${escapeXml(post.excerpt)}</description>
      <pubDate>${formatRssDate(post.date)}</pubDate>
      <category>${escapeXml(post.tags[0])}</category>
    </item>`).join('\n');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${escapeXml(siteName)} - Blog</title>
    <link>${siteUrl}/blog</link>
    <description>${escapeXml(siteDescription)}</description>
    <language>en-us</language>
    <lastBuildDate>${formatRssDate(new Date().toISOString())}</lastBuildDate>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

  return rss;
}

// Generate and write the RSS feed
const rssContent = generateRssFeed();
const outputPath = path.join(__dirname, '..', 'public', 'rss.xml');

fs.writeFileSync(outputPath, rssContent, 'utf-8');
console.log(`RSS feed generated at: ${outputPath}`);

// Also copy to dist if it exists (for post-build)
const distPath = path.join(__dirname, '..', 'dist', 'rss.xml');
if (fs.existsSync(path.join(__dirname, '..', 'dist'))) {
  fs.writeFileSync(distPath, rssContent, 'utf-8');
  console.log(`RSS feed copied to: ${distPath}`);
}
