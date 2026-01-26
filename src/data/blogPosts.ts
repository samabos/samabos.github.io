export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: number;
  category: string;
  tags: string[];
  image: string;
  author: {
    name: string;
    avatar: string;
  };
}

export const BLOG_CATEGORIES = [
  "Authentication & Authorization",
  "Software Design",
  "AI & Machine Learning",
] as const;

export type BlogCategory = typeof BLOG_CATEGORIES[number];

export const blogPosts: BlogPost[] = [
  {
    slug: "oauth-is-simpler-than-you-think",
    title: "OAuth Is Simpler Than You Think",
    excerpt: "OAuth has a reputation for being complicated. This perception is unnecessary. Learn the core concepts and why they exist in accessible language.",
    content: `
## The Problem

You are building an application that needs to read a user's Google Calendar. How do you obtain access?

**Option 1: Ask for their password (what not to do)**

Your application requests the user's Google credentials and stores them. This approach is insecure. Your application possesses credentials it should not have, the user cannot limit or revoke access without changing their password, and if your application is compromised, the attacker gains full access to the user's account.

**Option 2: OAuth (what to do)**

The user authenticates directly with Google. Google asks: "This application requests access to your calendar. Allow or deny?" If the user approves, Google issues a token to your application. Your application uses that token to access the calendar. Your application never sees the password.

This is OAuth. It allows users to grant limited access to their resources without sharing their credentials.

---

## An Analogy

Consider a hotel key card.

When checking into a hotel, guests do not receive a copy of the master key. Instead, they receive a card that:
- Opens only their assigned room (limited access)
- Functions only during their stay (time-limited)
- Can be deactivated by the front desk (revocable)
- Does not grant access to staff areas (scoped)

OAuth tokens operate on the same principles. They provide limited, temporary, and revocable access. The resource owner maintains control.

---

## The Roles

OAuth defines four roles:

**Resource Owner**
The entity that owns the protected resources and can grant access to them. This is often a user. When you grant an application access to your Google Drive, you are the resource owner. It can also be a system or organisation in machine-to-machine scenarios.

**Client**
The application requesting access. This could be a mobile application, a web service, or an automated script. The client requests permission to perform actions on behalf of the resource owner.

**Authorization Server**
The system that authenticates the resource owner and issues tokens. When you see "Sign in with Google" and encounter a consent screen, you are interacting with an authorization server. It verifies identity and obtains consent before issuing tokens.

**Resource Server**
The system that hosts the protected resources. The calendar API, the file storage API, the social media API. It validates tokens and returns data if the token permits the requested access.

Sometimes the authorization server and resource server are operated by the same organisation (Google operates both for Google Calendar). In other cases, they are separate (an organisation might use Keycloak as its authorization server while maintaining its own internal APIs as resource servers).

---

## How It Works

The following describes what occurs when your application needs access to a user's calendar:

1. **Your application directs the resource owner to the authorization server**

   Your application opens a browser window pointing to the authorization server (such as Google or your organisation's identity provider). The URL includes information identifying your application and the access being requested.

2. **The resource owner authenticates and sees a consent screen**

   The authorization server handles authentication. The resource owner provides their credentials and completes any additional verification steps. Then they see a consent screen: "Calendar App requests access to view your calendar. Allow?"

3. **The resource owner approves the request**

   They are granting permission. They could also deny the request.

4. **The authorization server redirects back to your application with a code**

   The browser redirects to your application with a short-lived authorization code in the URL.

5. **Your application exchanges the code for a token**

   Your application's server contacts the authorization server directly, presenting the code and requesting a token. The authorization server verifies the request and returns an access token.

6. **Your application uses the token to access the resource server**

   Your application includes the token in API requests. The resource server validates the token, confirms it permits the requested access, and returns the data.

This constitutes the entire flow. The resource owner grants permission, the client receives a token, and the client uses that token to access resources.

---

## Tokens

The token is the essential component. It is a string of characters that represents the permission the resource owner granted.

**Access tokens** are what your application presents to resource servers. They are short-lived, typically expiring within an hour. If one is compromised, the potential damage is limited by this short lifespan.

**Refresh tokens** allow your application to obtain new access tokens without requiring repeated resource owner interaction. They have longer lifespans and should be stored securely. Your application uses them to maintain access over time.

The resource owner can revoke tokens at any time. If they access their Google account settings and remove your application's access, your tokens cease to function. The resource owner retains control over their resources.

---

## What OAuth Is Not

**OAuth is not authentication**

OAuth handles authorization (what resources can be accessed), not authentication (verifying identity). If your application needs to identify the resource owner, not merely access their resources, you need OpenID Connect, which extends OAuth for authentication purposes. Most identity providers support both protocols.

**OAuth is not a product**

OAuth is a specification published by the IETF (the Internet Engineering Task Force, the organisation that defines internet standards). Products such as Auth0, Okta, and Keycloak implement this specification. Google and Microsoft implement it as well. OAuth itself is the standard they follow.

This distinction matters because:
- Auth0 documentation describes Auth0's implementation, not OAuth generally
- Applications can migrate between implementations because all follow the same specification
- Troubleshooting requires understanding whether an issue lies in application code, authorization server configuration, or protocol understanding

**OAuth defines multiple flows**

The flow described above is the most common pattern. Alternative flows exist for different contexts, such as devices without browsers, or backend services communicating without resource owner involvement. The underlying principle remains consistent: scoped, revocable access without credential sharing.

---

## Common Mistakes

**Treating tokens as proof of identity**

An access token proves the resource owner granted permission to access specific resources. It does not reliably indicate who they are. Access tokens are designed for authorization, not authentication.

*Why this matters:* An access token may be issued to a client on behalf of any resource owner. The token itself may not contain identity information, or that information may not be verified. Using access tokens to identify users can lead to security vulnerabilities where one user impersonates another.

*Solution:* Use OpenID Connect for authentication. When you need to know who the resource owner is, request an ID token by including the \`openid\` scope. The ID token is a signed JWT that contains verified identity claims. Validate this token according to the OpenID Connect specification before trusting its contents.

---

**Storing tokens carelessly**

Tokens are sensitive credentials that grant access to protected resources. Improper storage exposes them to theft.

*Why this matters:* If an attacker obtains a valid access token, they can access the resource owner's data until that token expires. If they obtain a refresh token, they can maintain access indefinitely by generating new access tokens.

*Solution:* Store tokens securely based on your application type:
- For server-side applications, store tokens in encrypted server-side sessions or secure databases
- For mobile applications, use platform-specific secure storage (Keychain on iOS, Keystore on Android)
- For browser-based applications, avoid storing tokens in localStorage or sessionStorage where JavaScript can access them. Consider using the Backend-for-Frontend pattern where tokens remain on the server, or use secure, HTTP-only cookies
- Never log tokens, include them in URLs, or transmit them through insecure channels

---

**Requesting excessive access**

Some applications request broad permissions during authorization, asking for more access than they require.

*Why this matters:* Resource owners are less likely to approve requests for extensive access. If they do approve, and tokens are later compromised, the attacker gains access to everything within the granted scope. Broad permissions also violate the principle of least privilege.

*Solution:* Request only the scopes your application needs for its current functionality. If your application requires additional permissions later, initiate a new authorization request for those specific scopes. This approach is called incremental authorization. Resource owners are more likely to grant narrow, clearly justified permissions.

---

**Assuming tokens are permanent**

Access tokens expire, typically within minutes to hours. Refresh tokens may also expire or be revoked. Applications that assume tokens remain valid indefinitely will fail when tokens expire.

*Why this matters:* When an access token expires, API requests return authorization errors. If the application does not handle this gracefully, users experience failures or must re-authenticate unnecessarily.

*Solution:* Implement proper token lifecycle management:
- Store the \`expires_in\` value returned with the access token
- Before making API requests, check whether the token has expired or is close to expiring
- If expired, use the refresh token to obtain a new access token
- If the refresh token is also invalid or expired, prompt the resource owner to re-authorize
- Handle 401 (Unauthorized) responses from resource servers by attempting token refresh before reporting failure to the user

---

## Where OAuth Is Used

- "Sign in with Google/GitHub/Microsoft" functionality uses OAuth (combined with OpenID Connect)
- Applications that access cloud storage, calendars, or social media accounts use OAuth
- Enterprise applications commonly use OAuth with authorization servers such as Keycloak or Okta
- APIs requiring resource owner authorization typically implement OAuth

Once you understand the fundamental flow, you will recognise it across many systems.

---

## Further Reading

This article covers the foundational concepts. For more detailed information:

- [OAuth.net](https://oauth.net/2/) provides accessible explanations of OAuth concepts
- [RFC 6749](https://datatracker.ietf.org/doc/html/rfc6749) is the original OAuth 2.0 specification
- [OAuth 2.1 Draft](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-v2-1) is the forthcoming consolidated specification
- Your provider's documentation (Auth0, Okta, Keycloak, etc.) details their specific implementation

---

## Summary

OAuth enables applications to access protected resources without handling user credentials. The resource owner grants permission through a consent screen, the client receives a token, and uses that token to make requests to the resource server. Tokens are scoped, time-limited, and revocable.

The specifications provide additional detail, but the fundamental concept remains this straightforward.
    `.trim(),
    date: "2026-01-26",
    readTime: 12,
    category: "Authentication & Authorization",
    tags: ["OAuth", "Security", "Authentication", "API"],
    image: "https://images.unsplash.com/photo-1633265486064-086b219458ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWN1cml0eSUyMGF1dGhlbnRpY2F0aW9uJTIwbG9ja3xlbnwxfHx8fDE3MDY1NjQwMDB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    author: {
      name: "Samson Maborukoje",
      avatar: ""
    }
  },
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
    category: "Software Design",
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
    category: "AI & Machine Learning",
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
    category: "AI & Machine Learning",
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
