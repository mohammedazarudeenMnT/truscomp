import dotenv from "dotenv";
import { connectDB } from "../config/database.js";
import BlogPost from "../models/content/BlogPost.js";
import Category from "../models/content/Category.js";

dotenv.config();

const categories = [
  { name: "Compliance" },
  { name: "Labor Law" },
  { name: "Industry Insights" },
  { name: "Best Practices" },
  { name: "Technology" },
];

const blogPosts = [
  {
    title: "Understanding Labor Law Compliance in 2024",
    subtitle:
      "A comprehensive guide to staying compliant with evolving regulations",
    description:
      "Navigate the complex landscape of labor law compliance with our expert insights and practical strategies for 2024.",
    content: `<h2>Introduction to Labor Law Compliance</h2>
<p>Labor law compliance is more critical than ever in today's rapidly changing regulatory environment. Organizations must stay informed about new regulations and ensure their practices align with current standards.</p>

<h2>Key Areas of Focus</h2>
<p>Understanding the fundamental aspects of labor law compliance helps organizations avoid costly penalties and maintain positive employee relations.</p>

<h3>Wage and Hour Regulations</h3>
<p>Proper classification of employees, accurate time tracking, and adherence to minimum wage requirements are essential components of compliance.</p>

<h3>Workplace Safety</h3>
<p>Maintaining a safe work environment isn't just good practice—it's a legal requirement that protects both employees and employers.</p>

<h2>Best Practices for Compliance</h2>
<ul>
<li>Regular compliance audits</li>
<li>Employee training programs</li>
<li>Documentation and record-keeping</li>
<li>Staying updated on regulatory changes</li>
</ul>

<h2>Conclusion</h2>
<p>Proactive compliance management reduces risk and creates a better workplace for everyone. Partner with experts to ensure your organization stays ahead of regulatory requirements.</p>`,
    category: "Labor Law",
    tags: ["compliance", "labor law", "regulations", "workplace safety"],
    status: "published",
    isFeatured: true,
    publishedAt: new Date("2024-01-15"),
  },
  {
    title: "The Future of Compliance Management Technology",
    subtitle: "How automation is transforming compliance operations",
    description:
      "Explore how modern technology is revolutionizing compliance management and making it easier for businesses to stay compliant.",
    content: `<h2>The Digital Transformation of Compliance</h2>
<p>Technology is reshaping how organizations approach compliance management, making processes more efficient and accurate.</p>

<h2>Key Technologies</h2>
<h3>Automation Tools</h3>
<p>Automated compliance tracking reduces manual errors and ensures nothing falls through the cracks.</p>

<h3>AI and Machine Learning</h3>
<p>Intelligent systems can predict compliance risks and provide proactive recommendations.</p>

<h2>Benefits of Technology Adoption</h2>
<ul>
<li>Reduced compliance costs</li>
<li>Improved accuracy</li>
<li>Real-time monitoring</li>
<li>Better reporting capabilities</li>
</ul>`,
    category: "Technology",
    tags: ["technology", "automation", "compliance software", "innovation"],
    status: "published",
    isFeatured: false,
    publishedAt: new Date("2024-01-20"),
  },
  {
    title: "Top 10 Compliance Mistakes to Avoid",
    subtitle: "Learn from common pitfalls in compliance management",
    description:
      "Discover the most common compliance mistakes businesses make and how to avoid them to protect your organization.",
    content: `<h2>Common Compliance Pitfalls</h2>
<p>Even well-intentioned organizations can make compliance mistakes. Here are the top issues to watch out for.</p>

<h2>The Top 10 Mistakes</h2>
<ol>
<li><strong>Inadequate Documentation</strong> - Poor record-keeping can lead to compliance failures</li>
<li><strong>Ignoring Updates</strong> - Regulations change frequently; staying informed is crucial</li>
<li><strong>Insufficient Training</strong> - Employees need proper education on compliance requirements</li>
<li><strong>Reactive Approach</strong> - Waiting for problems instead of preventing them</li>
<li><strong>Poor Communication</strong> - Compliance information must flow throughout the organization</li>
</ol>

<h2>Prevention Strategies</h2>
<p>Implementing robust compliance systems and regular audits helps organizations avoid these common mistakes.</p>`,
    category: "Best Practices",
    tags: ["best practices", "compliance tips", "risk management"],
    status: "published",
    isFeatured: false,
    publishedAt: new Date("2024-02-01"),
  },
  {
    title: "Building a Culture of Compliance",
    subtitle: "Creating an organization-wide commitment to compliance",
    description:
      "Learn how to foster a culture where compliance is everyone's responsibility and becomes part of your organizational DNA.",
    content: `<h2>Why Culture Matters</h2>
<p>A strong compliance culture goes beyond policies and procedures—it's about creating an environment where doing the right thing is the norm.</p>

<h2>Key Elements</h2>
<h3>Leadership Commitment</h3>
<p>Compliance culture starts at the top. Leaders must demonstrate their commitment through actions, not just words.</p>

<h3>Employee Engagement</h3>
<p>When employees understand why compliance matters, they become active participants in maintaining standards.</p>

<h2>Implementation Steps</h2>
<ul>
<li>Clear communication of expectations</li>
<li>Regular training and education</li>
<li>Recognition of compliant behavior</li>
<li>Transparent reporting mechanisms</li>
</ul>`,
    category: "Best Practices",
    tags: ["culture", "compliance", "organizational development", "leadership"],
    status: "published",
    isFeatured: false,
    publishedAt: new Date("2024-02-10"),
  },
  {
    title: "Contractor Compliance: What You Need to Know",
    subtitle: "Managing compliance for contract workers and vendors",
    description:
      "Understand the unique compliance challenges of working with contractors and how to manage them effectively.",
    content: `<h2>The Contractor Compliance Challenge</h2>
<p>Managing compliance for contractors requires different approaches than for regular employees.</p>

<h2>Key Considerations</h2>
<h3>Classification Issues</h3>
<p>Proper classification of workers is critical to avoid legal issues and penalties.</p>

<h3>Documentation Requirements</h3>
<p>Maintaining proper contracts and records protects both parties.</p>

<h2>Best Practices</h2>
<ul>
<li>Clear contractual agreements</li>
<li>Regular compliance audits</li>
<li>Vendor management systems</li>
<li>Insurance verification</li>
</ul>`,
    category: "Compliance",
    tags: ["contractors", "vendor management", "compliance", "legal"],
    status: "published",
    isFeatured: false,
    publishedAt: new Date("2024-02-15"),
  },
  {
    title: "Industry Trends: Compliance in Manufacturing",
    subtitle: "Sector-specific compliance challenges and solutions",
    description:
      "Explore the unique compliance landscape in manufacturing and how industry leaders are addressing these challenges.",
    content: `<h2>Manufacturing Compliance Landscape</h2>
<p>The manufacturing sector faces unique compliance challenges related to safety, environmental regulations, and labor practices.</p>

<h2>Key Compliance Areas</h2>
<h3>Workplace Safety</h3>
<p>Manufacturing environments require stringent safety protocols and regular inspections.</p>

<h3>Environmental Compliance</h3>
<p>Managing waste, emissions, and resource usage according to environmental regulations.</p>

<h2>Emerging Trends</h2>
<ul>
<li>Increased automation in compliance monitoring</li>
<li>Sustainability requirements</li>
<li>Supply chain transparency</li>
<li>Worker safety technology</li>
</ul>`,
    category: "Industry Insights",
    tags: ["manufacturing", "industry trends", "safety", "environmental"],
    status: "published",
    isFeatured: false,
    publishedAt: new Date("2024-02-20"),
  },
  {
    title: "Compliance Audits: A Step-by-Step Guide",
    subtitle: "How to conduct effective compliance audits",
    description:
      "Master the art of compliance auditing with our comprehensive guide to planning, executing, and following up on audits.",
    content: `<h2>The Importance of Regular Audits</h2>
<p>Compliance audits help identify gaps and ensure your organization meets all regulatory requirements.</p>

<h2>Audit Planning</h2>
<h3>Scope Definition</h3>
<p>Clearly define what areas will be covered in the audit.</p>

<h3>Resource Allocation</h3>
<p>Ensure you have the right people and tools for the audit.</p>

<h2>Execution Phase</h2>
<ul>
<li>Document review</li>
<li>Interviews with staff</li>
<li>Process observation</li>
<li>Data analysis</li>
</ul>

<h2>Follow-Up Actions</h2>
<p>Creating action plans to address findings is crucial for continuous improvement.</p>`,
    category: "Best Practices",
    tags: ["audits", "compliance", "risk assessment", "quality control"],
    status: "published",
    isFeatured: false,
    publishedAt: new Date("2024-02-25"),
  },
  {
    title: "Data Privacy and Compliance in the Digital Age",
    subtitle: "Protecting sensitive information while staying compliant",
    description:
      "Navigate the complex world of data privacy regulations and learn how to protect your organization and customers.",
    content: `<h2>The Data Privacy Imperative</h2>
<p>In today's digital world, data privacy compliance is more important than ever.</p>

<h2>Key Regulations</h2>
<h3>GDPR and Beyond</h3>
<p>Understanding global data protection requirements and their impact on your business.</p>

<h3>Industry-Specific Requirements</h3>
<p>Different sectors have unique data protection obligations.</p>

<h2>Implementation Strategies</h2>
<ul>
<li>Data mapping and inventory</li>
<li>Privacy by design</li>
<li>Employee training</li>
<li>Incident response planning</li>
</ul>`,
    category: "Compliance",
    tags: ["data privacy", "GDPR", "cybersecurity", "compliance"],
    status: "published",
    isFeatured: false,
    publishedAt: new Date("2024-03-01"),
  },
  {
    title: "The ROI of Compliance Management",
    subtitle: "Understanding the business value of compliance",
    description:
      "Discover how effective compliance management delivers tangible business benefits beyond just avoiding penalties.",
    content: `<h2>Beyond Risk Mitigation</h2>
<p>Compliance management offers significant business value beyond simply avoiding fines and penalties.</p>

<h2>Measurable Benefits</h2>
<h3>Cost Savings</h3>
<p>Preventing violations is far less expensive than dealing with their consequences.</p>

<h3>Operational Efficiency</h3>
<p>Streamlined compliance processes improve overall business operations.</p>

<h2>Strategic Advantages</h2>
<ul>
<li>Enhanced reputation</li>
<li>Competitive differentiation</li>
<li>Better risk management</li>
<li>Improved stakeholder confidence</li>
</ul>`,
    category: "Industry Insights",
    tags: ["ROI", "business value", "compliance", "strategy"],
    status: "published",
    isFeatured: false,
    publishedAt: new Date("2024-03-05"),
  },
  {
    title: "Preparing for Compliance Inspections",
    subtitle: "Be ready when regulators come calling",
    description:
      "Learn how to prepare for and successfully navigate compliance inspections with confidence.",
    content: `<h2>Inspection Readiness</h2>
<p>Being prepared for compliance inspections reduces stress and ensures better outcomes.</p>

<h2>Preparation Steps</h2>
<h3>Documentation Review</h3>
<p>Ensure all required documents are current, organized, and easily accessible.</p>

<h3>Staff Training</h3>
<p>Employees should know how to respond to inspector questions appropriately.</p>

<h2>During the Inspection</h2>
<ul>
<li>Designate a point person</li>
<li>Be cooperative but professional</li>
<li>Take notes</li>
<li>Ask for clarification when needed</li>
</ul>

<h2>Post-Inspection Actions</h2>
<p>Address any findings promptly and use the experience to improve your compliance program.</p>`,
    category: "Best Practices",
    tags: ["inspections", "compliance", "preparation", "regulatory"],
    status: "draft",
    isFeatured: false,
  },
];

async function seedBlogs() {
  try {
    console.log("Connecting to MongoDB...");
    await connectDB();
    console.log("Connected successfully");

    // Clear existing data
    console.log("Clearing existing blog posts and categories...");
    try {
      await BlogPost.collection.drop();
      await Category.collection.drop();
    } catch (err) {
      // Collections might not exist, which is fine
      if (err.code !== 26) throw err;
    }
    console.log("Cleared existing data");

    // Create categories
    console.log("Creating categories...");
    const createdCategories = await Category.insertMany(categories);
    console.log(`Created ${createdCategories.length} categories`);

    // Create blog posts
    console.log("Creating blog posts...");
    const createdPosts = await BlogPost.insertMany(blogPosts);
    console.log(`Created ${createdPosts.length} blog posts`);

    console.log("\n✅ Blog data seeded successfully!");
    console.log(`\nSummary:`);
    console.log(`- Categories: ${createdCategories.length}`);
    console.log(`- Blog Posts: ${createdPosts.length}`);
    console.log(
      `- Published: ${
        createdPosts.filter((p) => p.status === "published").length
      }`
    );
    console.log(
      `- Drafts: ${createdPosts.filter((p) => p.status === "draft").length}`
    );
    console.log(
      `- Featured: ${createdPosts.filter((p) => p.isFeatured).length}`
    );

    process.exit(0);
  } catch (error) {
    console.error("Error seeding blog data:", error);
    process.exit(1);
  }
}

seedBlogs();
