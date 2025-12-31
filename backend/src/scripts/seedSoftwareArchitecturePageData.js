/**
 * Seed script for Software Architecture Page
 * Populates the software-architecture page with features, benefits, FAQs, and CTAs
 *
 * Usage: node seedSoftwareArchitecturePageData.js
 */

import AboutPageSettings from "../models/content/AboutPage.js";
import { connectDB } from "../config/database.js";
import dotenv from "dotenv";

dotenv.config();

const softwareArchitectureContent = {
  hero: {
    subheading: "Advanced Technology",
    heading: "Software Architecture: The Engine Behind Our Solution",
    description:
      "At TrusComp, technology powers everything we do. Our advanced software architecture ensures efficient, secure, and scalable compliance solutions tailored to meet the demands of modern businesses. Explore the key technological features that make our platform a leader in compliance management.",
    backgroundImage:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=2000&h=1200&fit=crop",
    primaryButtonText: "Schedule a Call",
    primaryButtonLink: "/contact",
    secondaryButtonText: "Book Demo",
    secondaryButtonLink: "/demo",
  },
  features: {
    title: "Key Features",
    subtitle: "Advanced technological capabilities powering our platform",
    items: [
      {
        title: "Cloud-Based Infrastructure",
        description:
          "Our solution leverages a scalable and resilient cloud infrastructure, ensuring high availability for seamless access to compliance tools and data anytime, anywhere. Robust backup systems ensure uninterrupted operations with redundancy.",
        icon: "Cloud",
      },
      {
        title: "Multi-Tier Architecture",
        description:
          "A layered system design that ensures optimal performance with dedicated layers handling specific tasks for maximum efficiency. Future modularity simplifies maintenance and allows for seamless enhancements.",
        icon: "Layers",
      },
      {
        title: "Open API Integration",
        description:
          "Our platform integrates seamlessly with existing systems such as HRM, ERP, and financial tools, providing unified operations while enhancing compliance management. Flexible connectivity enables easy adoption into existing workflows.",
        icon: "Zap",
      },
      {
        title: "Data Security",
        description:
          "Robust measures protect your data with encryption & data backup using industry-standard algorithms. Includes multi-factor authentication, role-based access control, continuous security measures, secure APIs protected by OAuth, and adherence to ISO 27001 and GDPR standards.",
        icon: "Shield",
      },
      {
        title: "User Access Management",
        description:
          "Our role-based access control system minimizes security risks while maintaining operational efficiency. Granular permissions ensure users only access information necessary for their role, with clear audit trails for all activities.",
        icon: "Users",
      },
      {
        title: "Scalability",
        description:
          "Built to grow with your business, our platform offers consistent performance regardless of workload. Future-ready design provides scalable architecture for evolving business needs.",
        icon: "TrendingUp",
      },
    ],
  },
  benefits: {
    title: "Benefits of Our Technology",
    subtitle: "Why organizations choose TrusComp's platform",
    items: [
      {
        title: "Enhanced Efficiency",
        description:
          "Streamline compliance processes with automation and modular architecture, reducing manual effort and improving operational speed.",
        icon: "Zap",
      },
      {
        title: "Improved Security",
        description:
          "Industry-leading encryption, access controls, and regulatory compliance protect your sensitive data from threats.",
        icon: "Shield",
      },
      {
        title: "Seamless Integration",
        description:
          "Open APIs ensure easy integration with existing systems, enhancing functionality without disrupting workflows.",
        icon: "GitMerge",
      },
      {
        title: "Future-Ready",
        description:
          "Scalable and modular architecture evolves with your growing business needs and technological advancements.",
        icon: "Lightbulb",
      },
    ],
  },
  why: {
    title: "Why Choose TrusComp?",
    subtitle: "Leading excellence in compliance technology",
    reasons: [
      {
        title: "Proven Expertise",
        description:
          "Trusted by 100+ clients for secure, efficient compliance solutions built on years of industry experience.",
      },
      {
        title: "Cutting-Edge Tools",
        description:
          "Stay ahead with advanced features like role-based access, secure APIs, and continuous security updates.",
      },
      {
        title: "Customizable Solutions",
        description:
          "Adapt our platform to fit your organization's unique needs and compliance requirements.",
      },
    ],
    benefits: [
      {
        title: "Scalable Architecture",
        description:
          "Grows with your business without compromising performance.",
      },
      {
        title: "Security-First Design",
        description:
          "Every feature built with data protection and compliance at the core.",
      },
    ],
  },
  faq: {
    title: "Frequently Asked Questions",
    description:
      "Get answers to common questions about TrusComp's software architecture",
    items: [
      {
        question: "What makes TrusComp's software architecture unique?",
        answer:
          "Our platform combines a scalable cloud-based infrastructure, robust security measures, and open APIs to deliver efficient and secure compliance solutions tailored to your business needs.",
      },
      {
        question: "How does the platform ensure data security?",
        answer:
          "We implement industry-leading encryption, multi-factor authentication, role-based access controls, and regular security audits to safeguard your data.",
      },
      {
        question: "Can the platform integrate with existing systems?",
        answer:
          "Yes, our open APIs enable seamless integration with HRM, ERP, and financial systems, ensuring unified workflows.",
      },
      {
        question: "Is the platform suitable for businesses of all sizes?",
        answer:
          "Absolutely. Our scalable architecture supports businesses ranging from small enterprises to multinational corporations.",
      },
      {
        question: "How do I start using TrusComp's software solutions?",
        answer:
          "Simply Schedule a Free Consultation or Request a Demo to discover how our technology can transform your compliance management.",
      },
    ],
  },
  cta: {
    badge: "Take the First Step",
    title: "Revolutionize your compliance management",
    description:
      "Start your seamless compliance journey today with TrusComp's cutting-edge technology and proven expertise.",
    primaryButtonText: "Schedule a Free Consultation",
    primaryButtonLink: "/contact",
    secondaryButtonText: "Request a Demo",
    secondaryButtonLink: "/contact?type=demo",
  },
};

async function seedSoftwareArchitecturePageData() {
  try {
    console.log("🚀 Starting Software Architecture Page seeding...\n");

    // Connect to database
    console.log("📡 Connecting to database...");
    await connectDB();
    console.log("✅ Connected to MongoDB");

    // Clear existing data for the software-architecture page
    console.log("\n🔄 Clearing existing data...");
    try {
      const result = await AboutPageSettings.deleteOne({
        pageKey: "software-architecture",
      });
      console.log(
        `✓ Cleared existing data (deleted: ${result.deletedCount} document)`
      );
    } catch (err) {
      if (err.code !== 26) throw err; // Code 26 = collection doesn't exist (OK)
    }

    // Create fresh document
    console.log("\n📝 Creating fresh software-architecture page document...");
    let softwareArchSettings = new AboutPageSettings({
      pageKey: "software-architecture",
      pageName: "Software Architecture",
    });

    // Add Hero Section
    console.log("\n📝 Adding Hero Section...");
    softwareArchSettings.hero = {
      subheading: softwareArchitectureContent.hero.subheading,
      heading: softwareArchitectureContent.hero.heading,
      description: softwareArchitectureContent.hero.description,
      backgroundImage: softwareArchitectureContent.hero.backgroundImage,
      primaryButtonText: softwareArchitectureContent.hero.primaryButtonText,
      primaryButtonLink: softwareArchitectureContent.hero.primaryButtonLink,
      secondaryButtonText: softwareArchitectureContent.hero.secondaryButtonText,
      secondaryButtonLink: softwareArchitectureContent.hero.secondaryButtonLink,
    };

    console.log(`   ✅ Hero Section added`);
    console.log(`      - Heading: ${softwareArchSettings.hero.heading}`);

    // Add Features Section
    console.log("\n📝 Adding Features Section...");
    softwareArchSettings.features = {
      title: softwareArchitectureContent.features.title,
      subtitle: softwareArchitectureContent.features.subtitle,
      items: softwareArchitectureContent.features.items,
    };

    console.log(`   ✅ Features Section added`);
    console.log(
      `      - Features: ${softwareArchSettings.features.items.length}`
    );

    // Add Benefits Section
    console.log("\n📝 Adding Benefits Section...");
    softwareArchSettings.benefits = {
      title: softwareArchitectureContent.benefits.title,
      subtitle: softwareArchitectureContent.benefits.subtitle,
      items: softwareArchitectureContent.benefits.items,
    };

    console.log(`   ✅ Benefits Section added`);
    console.log(
      `      - Benefits: ${softwareArchSettings.benefits.items.length}`
    );

    // Add Why Section (Why Choose TrusComp)
    console.log("\n📝 Adding Why Section...");
    softwareArchSettings.why = {
      title: softwareArchitectureContent.why.title,
      subtitle: softwareArchitectureContent.why.subtitle,
      reasons: softwareArchitectureContent.why.reasons,
      benefits: softwareArchitectureContent.why.benefits,
    };

    console.log(`   ✅ Why Section added`);
    console.log(`      - Reasons: ${softwareArchSettings.why.reasons.length}`);

    // Add FAQ Section
    console.log("\n📝 Adding FAQ Section...");
    softwareArchSettings.faq = {
      title: softwareArchitectureContent.faq.title,
      description: softwareArchitectureContent.faq.description,
      items: softwareArchitectureContent.faq.items,
    };

    console.log(`   ✅ FAQ Section added`);
    console.log(`      - Questions: ${softwareArchSettings.faq.items.length}`);

    // Add CTA Section
    console.log("\n📝 Adding CTA Section...");
    softwareArchSettings.cta = {
      badge: softwareArchitectureContent.cta.badge,
      title: softwareArchitectureContent.cta.title,
      description: softwareArchitectureContent.cta.description,
      primaryButtonText: softwareArchitectureContent.cta.primaryButtonText,
      primaryButtonLink: softwareArchitectureContent.cta.primaryButtonLink,
      secondaryButtonText: softwareArchitectureContent.cta.secondaryButtonText,
      secondaryButtonLink: softwareArchitectureContent.cta.secondaryButtonLink,
    };

    console.log(`   ✅ CTA Section added`);

    // Save fresh data
    console.log("\n💾 Saving fresh data to database...");
    await softwareArchSettings.save();
    console.log("✅ Fresh data saved successfully to MongoDB");

    // Verify the data
    console.log("\n🔍 Verifying seeded data...");
    const verifiedSettings = await AboutPageSettings.findOne({
      pageKey: "software-architecture",
    });

    if (verifiedSettings) {
      console.log("✅ Data verification successful");
      console.log(`   - Hero Heading: ${verifiedSettings.hero.heading}`);
      console.log(`   - Features: ${verifiedSettings.features.items.length}`);
      console.log(`   - Benefits: ${verifiedSettings.benefits.items.length}`);
      console.log(`   - FAQ Items: ${verifiedSettings.faq.items.length}`);
    }

    console.log(
      "\n✨ Software Architecture page data seeding completed successfully!"
    );
    console.log("\n📊 Fresh Data Summary:");
    console.log(`   ✓ Hero Section - The Engine Behind Our Solution`);
    console.log(
      `   ✓ Features Section - ${softwareArchSettings.features.items.length} Key Features`
    );
    console.log(
      `   ✓ Benefits Section - ${softwareArchSettings.benefits.items.length} Benefits`
    );
    console.log(
      `   ✓ Why Section - ${softwareArchSettings.why.reasons.length} Reasons`
    );
    console.log(
      `   ✓ FAQ Section - ${softwareArchSettings.faq.items.length} Q&A Pairs`
    );
    console.log(`   ✓ CTA Section - Ready for conversion`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding software-architecture page data:");
    console.error(error.message);
    if (error.stack) {
      console.error(error.stack);
    }
    process.exit(1);
  }
}

seedSoftwareArchitecturePageData();
