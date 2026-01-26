export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: number;
  tags: string[];
  image: string;
  author: {
    name: string;
    avatar: string;
  };
}

export const blogPosts: BlogPost[] = [
  {
    slug: "building-ai-powered-project-management",
    title: "Building AI-Powered Project Management Tools",
    excerpt: "Learn how I built AIPM, a tool that transforms ideas into structured projects with AI-generated artifacts and intelligent project initialization.",
    content: `
## Introduction

In the ever-evolving landscape of software development, the initial setup phase of a project often determines its success. That's why I built AIPM (AI Project Manager) - a tool designed to transform your ideas into structured projects with AI-generated artifacts.

## The Problem

Starting a new project typically involves:
- Creating folder structures
- Setting up configuration files
- Writing boilerplate documentation
- Establishing coding standards

This repetitive work consumes valuable time that could be spent on actual development.

## The Solution

AIPM leverages the OpenAI API to intelligently generate:

1. **Project Structure** - Automatically creates a logical folder hierarchy based on your project type
2. **Documentation** - Generates README files, contributing guidelines, and API documentation
3. **Configuration Files** - Sets up linting, formatting, and build configurations
4. **Templates** - Creates issue templates, PR templates, and code scaffolding

## Technical Implementation

The tool is built with:
- **React** for the frontend interface
- **TypeScript** for type safety
- **OpenAI API** for intelligent generation
- **Vercel** for deployment

### Key Code Pattern

\`\`\`typescript
async function generateProjectArtifacts(prompt: string) {
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "system", content: PROJECT_SYSTEM_PROMPT },
      { role: "user", content: prompt }
    ],
    temperature: 0.7
  });

  return parseArtifacts(response.choices[0].message.content);
}
\`\`\`

## Results

Since launching AIPM:
- Average project setup time reduced from 2 hours to 10 minutes
- Consistent project structures across teams
- Better documentation coverage from day one

## Conclusion

AI-powered tools like AIPM represent the future of developer productivity. By automating repetitive tasks, we can focus on what truly matters - building great software.

Try it out at [aipm-murex.vercel.app](https://aipm-murex.vercel.app/)!
    `.trim(),
    date: "2025-01-15",
    readTime: 5,
    tags: ["AI", "React", "TypeScript", "Productivity"],
    image: "https://images.unsplash.com/photo-1649451844931-57e22fc82de3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBSSUyMHByb2plY3QlMjBtYW5hZ2VtZW50JTIwZGFzaGJvYXJkfGVufDF8fHx8MTc1NjU2MTk3OHww&ixlib=rb-4.1.0&q=80&w=1080",
    author: {
      name: "Samson Maborukoje",
      avatar: ""
    }
  },
  {
    slug: "multilabel-text-classification-with-distilbert",
    title: "Multilabel Text Classification with DistilBERT for Trade Compliance",
    excerpt: "How I built HS.Codes - a commodity classification system using retrained DistilBERT for WCO Commodity Codes and Tariffs Classification.",
    content: `
## Introduction

International trade relies heavily on the Harmonized System (HS) - a standardized numerical method of classifying traded products. With thousands of codes and complex rules, manual classification is error-prone and time-consuming. That's why I built HS.Codes.

## The Challenge

HS Code classification involves:
- 5,000+ unique codes at the 6-digit level
- Complex hierarchical relationships
- Multilingual product descriptions
- Regulatory requirements that vary by country

## Technical Approach

### Why DistilBERT?

DistilBERT offers the perfect balance:
- 40% smaller than BERT
- 60% faster inference
- Retains 97% of BERT's performance

### Model Architecture

\`\`\`python
from transformers import DistilBertForSequenceClassification

model = DistilBertForSequenceClassification.from_pretrained(
    'distilbert-base-uncased',
    num_labels=len(hs_codes),
    problem_type="multi_label_classification"
)
\`\`\`

### Training Pipeline

1. **Data Preparation**: Collected 100K+ product descriptions with verified HS codes
2. **Preprocessing**: Tokenization, padding, and attention masks
3. **Fine-tuning**: Transfer learning with custom classification head
4. **Evaluation**: F1-score optimization for imbalanced classes

## Key Innovations

### Hierarchical Classification

Instead of flat classification, we leverage the HS hierarchy:

\`\`\`python
def hierarchical_predict(description):
    # First predict chapter (2-digit)
    chapter = predict_chapter(description)

    # Then predict heading within chapter (4-digit)
    heading = predict_heading(description, chapter)

    # Finally predict subheading (6-digit)
    subheading = predict_subheading(description, heading)

    return f"{chapter}{heading}{subheading}"
\`\`\`

### Confidence Scoring

Each prediction includes confidence scores to flag uncertain classifications for human review.

## Results

- **Accuracy**: 94.2% at 6-digit level
- **Inference Time**: <100ms per classification
- **Coverage**: 98 chapters of HS codes

## Real-World Impact

HS.Codes helps:
- Importers/Exporters classify goods correctly
- Customs brokers speed up declarations
- Compliance teams reduce errors

Check it out at [hs.codes](https://hs.codes)!
    `.trim(),
    date: "2025-01-08",
    readTime: 7,
    tags: ["Machine Learning", "NLP", "Python", "Trade Tech"],
    image: "https://images.unsplash.com/photo-1546327740-1d4c4e191b65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tb2RpdHklMjBjbGFzc2lmaWNhdGlvbiUyMGNvZGUlMjBzeXN0ZW18ZW58MXx8fHwxNzU2NTY0NjcxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    author: {
      name: "Samson Maborukoje",
      avatar: ""
    }
  },
  {
    slug: "risk-assessment-systems-in-customs",
    title: "Building Intelligent Risk Assessment Systems for Customs Operations",
    excerpt: "An inside look at STRIX - Strategic Trade Risk Intelligence eXchange, and how AI is revolutionizing customs workflow management.",
    content: `
## Introduction

Customs agencies worldwide process millions of declarations daily. Identifying high-risk shipments while facilitating legitimate trade is a delicate balance. STRIX (Strategic Trade Risk Intelligence eXchange) was built to address this challenge.

## The Problem Space

Traditional risk assessment relies on:
- Rule-based systems with static thresholds
- Manual review of flagged declarations
- Limited data sharing between agencies
- Reactive rather than predictive approaches

## STRIX Architecture

### Core Components

1. **Risk Scoring Engine**: ML-based scoring using historical data
2. **Real-time Analytics**: Live dashboards for operations
3. **Multi-agency Collaboration**: Secure data exchange protocols
4. **Audit Trail**: Complete traceability for compliance

### Technology Stack

\`\`\`
Frontend: React + TypeScript
Backend: ASP.NET Core
ML Pipeline: Azure ML
Database: SQL Server + Redis
Infrastructure: Azure Cloud
\`\`\`

## Risk Scoring Model

### Features Engineering

Key indicators for risk assessment:
- Importer/Exporter history
- Trade route patterns
- Commodity classification anomalies
- Value declaration deviations
- Document consistency scores

### Model Training

\`\`\`csharp
public class RiskScoreService
{
    public async Task<RiskAssessment> CalculateRisk(Declaration declaration)
    {
        var features = await ExtractFeatures(declaration);
        var baseScore = await _mlModel.PredictAsync(features);
        var adjustedScore = ApplyRules(baseScore, declaration);

        return new RiskAssessment
        {
            Score = adjustedScore,
            Factors = GetContributingFactors(features),
            Recommendation = DetermineAction(adjustedScore)
        };
    }
}
\`\`\`

## Real-time Analytics

### Dashboard Features

- Live declaration processing metrics
- Risk distribution heat maps
- Alert management system
- Performance KPIs

### Multi-agency Collaboration

Secure information sharing enables:
- Cross-border risk intelligence
- Joint targeting operations
- Harmonized risk profiles

## Impact Metrics

Since deployment:
- **40% improvement** in hit rates
- **60% reduction** in processing time for low-risk shipments
- **25% increase** in detection of non-compliant declarations

## Lessons Learned

1. **Domain expertise is crucial**: Work closely with customs officers
2. **Explainability matters**: Officers need to understand why something is flagged
3. **Feedback loops**: Continuous model improvement from inspection outcomes

## Conclusion

AI-powered risk assessment is transforming customs operations worldwide. By combining machine learning with domain expertise, we can enhance security while facilitating legitimate trade.

Learn more at [strix.teqcenta.com](https://strix.teqcenta.com/)
    `.trim(),
    date: "2024-12-20",
    readTime: 8,
    tags: ["AI", "Risk Analytics", "ASP.NET Core", "Enterprise"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyaXNrJTIwYXNzZXNzbWVudCUyMGRhc2hib2FyZCUyMGFuYWx5dGljc3xlbnwxfHx8fDE3NTY1NjQ2NzV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    author: {
      name: "Samson Maborukoje",
      avatar: ""
    }
  }
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

export function getRecentPosts(count: number = 3): BlogPost[] {
  return [...blogPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
}
