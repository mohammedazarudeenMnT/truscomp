/**
 * Seed script for Home Page Settings
 * Directly inserts/updates the home page with Why Choose TrusComp and FAQ data
 * Appends content to existing data based on the model structure
 *
 * Usage: node seedHomePageData.js
 */

import HomePageSettings from "../models/content/HomePage.js";
import { connectDB } from "../config/database.js";
import dotenv from "dotenv";

dotenv.config();

const newContent = {
  hero: {
    sections: [
      {
        id: 1,
        title: "Build and Ship 10x Faster",
        subtitle: "Modern Development",
        description:
          "Create stunning websites and applications with our cutting-edge tools and components. Experience the future of web development today.",
        buttonText: "Get Started",
        img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
      },
      {
        id: 2,
        title: "Design That Inspires",
        subtitle: "Creative Excellence",
        description:
          "Transform your ideas into beautiful, functional designs that captivate your audience and drive engagement across all platforms.",
        buttonText: "Explore More",
        img: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=2187&auto=format&fit=crop",
      },
      {
        id: 3,
        title: "Scale With Confidence",
        subtitle: "Enterprise Ready",
        description:
          "Built for growth with enterprise-grade security, performance, and reliability. Take your business to the next level with confidence.",
        buttonText: "Learn More",
        img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop",
      },
      {
        id: 4,
        title: "Innovation at Your Fingertips",
        subtitle: "Next Generation",
        description:
          "Leverage the latest technologies and best practices to create exceptional digital experiences that stand out from the competition.",
        buttonText: "Start Building",
        img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop",
      },
    ],
  },
  whySection: {
    title: "Why Choose TrusComp?",
    subtitle:
      "Choose TrusComp for effortless, future-ready compliance. Let us handle the complexity, so you can focus on growth!",
    features: [
      {
        icon: "CheckCircle",
        title: "Comprehensive Compliance Solutions",
        description:
          "From end-to-end compliance management to risk assessments and training programs, we provide complete support tailored to your needs.",
      },
      {
        icon: "Award",
        title: "Expertise You Can Trust",
        description:
          "Founded by industry leaders with decades of proven experience in labor law, consulting, and technology.",
      },
      {
        icon: "Zap",
        title: "Customizable for All Businesses",
        description:
          "Scalable solutions designed to meet the unique requirements of SMEs and large enterprises.",
      },
      {
        icon: "TrendingUp",
        title: "Proven Track Record",
        description:
          "Trusted by over 100 clients, including Amara Raja, Blue Star, and Dr. Reddy's, to deliver flawless compliance management.",
      },
    ],
    stats: [
      {
        number: "100+",
        label: "Trusted Clients",
        className: "bg-primary/5 border-primary/10",
      },
      {
        number: "15+",
        label: "Years Experience",
        className: "bg-primary/10 border-primary/20",
      },
      {
        number: "99.9%",
        label: "Compliance Rate",
        className: "bg-primary/5 border-primary/10",
      },
      {
        number: "24/7",
        label: "Support Available",
        className: "bg-primary/10 border-primary/20",
      },
    ],
    trustIndicators: [
      "Amara Raja",
      "Blue Star",
      "Dr. Reddy's",
      "Ola Electric",
      "Reckitt Benckiser",
    ],
  },
  faq: {
    badge: "FAQ",
    title: "Frequently Asked Questions",
    description: "Common questions about our compliance management solutions.",
    items: [
      {
        question: "What is compliance management, and why is it important?",
        answer:
          "Compliance management ensures businesses adhere to labor laws and regulatory standards, reducing risks, avoiding penalties, and fostering a positive workplace. TrusComp simplifies this process, allowing you to focus on growth.",
      },
      {
        question: "How can TrusComp support my business?",
        answer:
          "TrusComp provides end-to-end compliance solutions, including risk assessments, training, and adherence to labor laws. Our customizable solutions ensure seamless integration into your operations.",
      },
      {
        question: "Who are TrusComp's clients?",
        answer:
          "We serve a diverse range of industries, with over 100 satisfied clients, including Amara Raja, Blue Star, and Dr. Reddy's, who trust us for their compliance needs.",
      },
      {
        question: "Are TrusComp's solutions suitable for SMEs?",
        answer:
          "Yes, our solutions are scalable and customizable, making them ideal for SMEs and large enterprises alike.",
      },
      {
        question: "How do I start with TrusComp?",
        answer:
          "Getting started is simple! Schedule a Free Consultation or Request a Demo to explore how TrusComp can transform your compliance management.",
      },
    ],
  },
  cta: {
    badge: "Ready to Transform?",
    heading: "Take the First Step Towards Seamless Compliance",
    description:
      "Join hundreds of businesses that trust TrusComp for seamless, automated compliance management. Let us handle the complexity, so you can focus on growth.",
    buttons: [
      {
        text: "Schedule a Free Consultation",
        href: "/contact",
        variant: "secondary",
        icon: "ArrowRight",
      },
      {
        text: "Request a Demo",
        href: "/contact",
        variant: "outline",
        icon: "Play",
      },
    ],
    isDark: true,
  },
};

async function seedHomePageData() {
  try {
    console.log("🌱 Starting home page data seeding...");

    // Connect to MongoDB
    console.log("📡 Connecting to MongoDB...");
    await connectDB();
    console.log("✅ Connected to MongoDB");

    // Clear existing data
    console.log("\n🗑️ Clearing existing home page settings...");
    try {
      await HomePageSettings.collection.drop();
      console.log("✓ Cleared existing data");
    } catch (err) {
      // Collection might not exist, which is fine
      if (err.code !== 26) throw err;
    }

    // Create fresh home page settings
    console.log("\n📝 Creating fresh home page settings...");
    let settings = new HomePageSettings();

    // Add Hero Section
    console.log("\n📝 Adding Hero Section...");

    settings.hero = {
      sections: newContent.hero.sections,
    };

    console.log(`   ✅ Hero Section added`);
    console.log(`      - Sections: ${settings.hero.sections.length}`);

    // Add Why Choose Section
    console.log("\n📝 Adding Why Choose Section...");

    settings.whySection = {
      title: newContent.whySection.title,
      subtitle: newContent.whySection.subtitle,
      features: newContent.whySection.features,
      stats: newContent.whySection.stats,
      trustIndicators: newContent.whySection.trustIndicators,
    };

    console.log(`   ✅ Why Choose Section added`);
    console.log(`      - Features: ${settings.whySection.features.length}`);
    console.log(`      - Stats: ${settings.whySection.stats.length}`);
    console.log(
      `      - Trust Indicators: ${settings.whySection.trustIndicators.length}`
    );

    // Add FAQ Section
    console.log("\n📝 Adding FAQ Section...");

    settings.faq = {
      badge: newContent.faq.badge,
      title: newContent.faq.title,
      description: newContent.faq.description,
      items: newContent.faq.items,
    };

    console.log(`   ✅ FAQ Section added`);
    console.log(`      - Questions: ${settings.faq.items.length}`);

    // Add CTA Section
    console.log("\n📝 Adding CTA Section...");

    settings.cta = {
      badge: newContent.cta.badge,
      heading: newContent.cta.heading,
      description: newContent.cta.description,
      buttons: newContent.cta.buttons,
      isDark: newContent.cta.isDark,
    };

    console.log(`   ✅ CTA Section added`);
    console.log(`      - Buttons: ${settings.cta.buttons.length}`);

    // Save fresh data
    console.log("\n💾 Saving fresh data to database...");
    await settings.save();
    console.log("✅ Fresh data saved successfully to MongoDB");

    // Verify the data
    console.log("\n🔍 Verifying seeded data...");
    const verifiedSettings = await HomePageSettings.findOne();

    if (verifiedSettings) {
      console.log("✅ Data verification successful");
      console.log(
        `   - Hero Sections: ${verifiedSettings.hero.sections.length}`
      );
      console.log(
        `   - Why Section Title: ${verifiedSettings.whySection.title}`
      );
      console.log(
        `   - Features Count: ${verifiedSettings.whySection.features.length}`
      );
      console.log(
        `   - Stats Count: ${verifiedSettings.whySection.stats.length}`
      );
      console.log(
        `   - Trust Indicators Count: ${verifiedSettings.whySection.trustIndicators.length}`
      );
      console.log(`   - FAQ Items Count: ${verifiedSettings.faq.items.length}`);
      console.log(
        `   - CTA Buttons Count: ${verifiedSettings.cta.buttons.length}`
      );
    }

    console.log("\n✨ Home page data seeding completed successfully!");
    console.log("\n📊 Fresh Data Summary:");
    console.log(`   ✓ Hero Section`);
    console.log(`     - Sections: ${settings.hero.sections.length}`);
    console.log(`   ✓ Why Choose TrusComp Section`);
    console.log(`     - Features: ${settings.whySection.features.length}`);
    console.log(`     - Statistics: ${settings.whySection.stats.length}`);
    console.log(
      `     - Trust Indicators: ${settings.whySection.trustIndicators.length}`
    );
    console.log(`   ✓ FAQ Section`);
    console.log(`     - Questions & Answers: ${settings.faq.items.length}`);
    console.log(`   ✓ CTA Section`);
    console.log(`     - Buttons: ${settings.cta.buttons.length}`);
  } catch (error) {
    console.error("❌ Error seeding home page data:");
    console.error(error.message);
    if (error.stack) {
      console.error(error.stack);
    }
    process.exit(1);
  }
}

seedHomePageData();
