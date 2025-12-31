/**
 * Seed script for About Page Settings (Main About/Who We Are)
 * Populates the about page with company information, founders, impact, FAQs, and CTAs
 *
 * Usage: node seedAboutPageData.js
 */

import AboutPageSettings from "../models/content/AboutPage.js";
import { connectDB } from "../config/database.js";
import dotenv from "dotenv";

dotenv.config();

const aboutContent = {
  hero: {
    badge: "About TrusComp",
    title: "Who We Are",
    description:
      "TrusComp Private Limited is a trusted leader in compliance solutions, committed to transforming regulatory adherence through innovation and expertise. Guided by our core values of Trust, Transparency, and Transformation, we unite domain expertise in labor law, consulting, and technology to deliver exceptional value to our clients.",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop",
    primaryButtonText: "Get Started",
    primaryButtonLink: "/contact",
    secondaryButtonText: "Meet the Team",
    secondaryButtonLink: "#founders",
    statsNumber: "7+",
    statsTitle: "Years of Excellence",
    statsDescription: "Trusted by Industry Leaders",
  },
  founders: {
    title: "Our Founders",
    subtitle: "Meet the visionary leaders driving TrusComp's success",
    members: [
      {
        name: "Mr. S. Deenadayalan",
        role: "Chairman of CEO Group of Companies",
        title: "",
        bio: "Chairman of the CEO Group of Companies with 25+ years of consulting expertise, known for delivering impactful organizational transformation.",
        image: "",
        linkedin: "",
        email: "",
      },
      {
        name: "Mr. Anand Gopalan",
        role: "Managing Partner, Agam Legal Services",
        title: "",
        bio: "Managing Partner at Agam Legal Services, a renowned labor law expert dedicated to ensuring seamless compliance.",
        image: "",
        linkedin: "",
        email: "",
      },
      {
        name: "Mr. PPK Mahindhra",
        role: "Managing Partner, JZ Tec",
        title: "",
        bio: "A technology innovator and Managing Partner at JZ Tec, specializing in automating compliance management for modern businesses.",
        image: "",
        linkedin: "",
        email: "",
      },
    ],
  },
  impact: {
    title: "Our Impact",
    subtitle: "Measuring our success through the value we deliver",
    stats: [
      {
        name: "7+ Years of Excellence",
        description:
          "Delivering customized compliance solutions across diverse industries",
        icon: "Star",
        className: "md:col-span-1 bg-primary/5 border-primary/10",
      },
      {
        name: "60+ Compliance Specialists",
        description:
          "A dedicated team committed to providing top-tier service and support.",
        icon: "Users",
        className: "md:col-span-1 bg-primary/5 border-primary/10",
      },
      {
        name: "100+ Clients",
        description:
          "Trusted by industry leaders, including Blue Star, Reckitt Benckiser, and Ola Electric, to ensure flawless compliance management.",
        icon: "TrendingUp",
        className: "md:col-span-1 bg-primary/5 border-primary/10",
      },
    ],
  },
  whySection: {
    title: "Why TrusComp?",
    subtitle:
      "We are more than a compliance partner; we are your ally in staying ahead of the curve. Join us in reshaping compliance management, leveraging innovation, expertise, and unwavering commitment to excellence.",
    features: [
      {
        title: "Domain Expertise",
        description:
          "Deep knowledge in labor law, consulting, and technology combined to deliver comprehensive solutions.",
        icon: "Brain",
      },
      {
        title: "Innovation-Driven",
        description:
          "Cutting-edge technology that automates and simplifies compliance management for modern businesses.",
        icon: "Lightbulb",
      },
      {
        title: "Client-Centric Approach",
        description:
          "Customized solutions tailored to your unique business needs and industry requirements.",
        icon: "Target",
      },
    ],
    highlights: [
      "Pan-India Presence",
      "Industry-Recognized Expertise",
      "Proven Track Record",
    ],
  },
  faq: {
    title: "Frequently Asked Questions (FAQs)",
    description:
      "Get answers to common questions about TrusComp and our services",
    items: [
      {
        question: "What makes TrusComp unique in the compliance industry?",
        answer:
          "TrusComp stands out with its combination of labor law expertise, consulting excellence, and cutting-edge technology, ensuring tailored compliance solutions for every business need.",
      },
      {
        question: "Who are the founders of TrusComp?",
        answer:
          "Our founders include Mr. S. Deenadayalan, Mr. Anand Gopalan, and Mr. PPK Mahindhra— visionaries with decades of experience in consulting, labor law, and technology.",
      },
      {
        question: "How has TrusComp impacted businesses?",
        answer:
          "With over 7 years of excellence, 60+ compliance specialists, and 100+ satisfied clients, TrusComp has helped businesses streamline compliance, mitigate risks, and stay ahead in their industries.",
      },
      {
        question: "What industries does TrusComp serve?",
        answer:
          "We serve a wide range of industries, including manufacturing, healthcare, technology, and retail, offering tailored solutions for unique compliance challenges.",
      },
      {
        question: "How can I connect with TrusComp?",
        answer:
          "Reach out today to Schedule a Consultation or Request a Demo to see how TrusComp can transform your compliance management journey.",
      },
    ],
  },
  cta: {
    badge: "Do you want to work with us?",
    title: "Join Here",
    description:
      "Transform your compliance management with TrusComp. Get expert guidance and innovative solutions tailored to your business.",
    primaryButtonText: "Schedule a Consultation",
    primaryButtonLink: "/contact",
    secondaryButtonText: "Request a Demo",
    secondaryButtonLink: "/contact?type=demo",
  },
};

async function seedAboutPageData() {
  try {
    console.log("🚀 Starting About Page seeding...\n");

    // Connect to database
    console.log("📡 Connecting to database...");
    await connectDB();
    console.log("✅ Connected to MongoDB");

    // Clear existing data for the main about page
    console.log("\n🔄 Clearing existing data...");
    try {
      await AboutPageSettings.collection.drop();
      console.log("✓ Cleared existing data");
    } catch (err) {
      if (err.code !== 26) throw err; // Code 26 = collection doesn't exist (OK)
    }

    // Create fresh document
    console.log("\n📝 Creating fresh about page document...");
    let aboutSettings = new AboutPageSettings({
      pageKey: "about",
      pageName: "About Us",
    });

    // Add Hero Section
    console.log("\n📝 Adding Hero Section...");
    aboutSettings.hero = {
      badge: aboutContent.hero.badge,
      title: aboutContent.hero.title,
      description: aboutContent.hero.description,
      image: aboutContent.hero.image,
      primaryButtonText: aboutContent.hero.primaryButtonText,
      primaryButtonLink: aboutContent.hero.primaryButtonLink,
      secondaryButtonText: aboutContent.hero.secondaryButtonText,
      secondaryButtonLink: aboutContent.hero.secondaryButtonLink,
      statsNumber: aboutContent.hero.statsNumber,
      statsTitle: aboutContent.hero.statsTitle,
      statsDescription: aboutContent.hero.statsDescription,
    };

    console.log(`   ✅ Hero Section added`);
    console.log(`      - Title: ${aboutSettings.hero.title}`);

    // Add Founders Section
    console.log("\n📝 Adding Founders Section...");
    aboutSettings.founders = {
      title: aboutContent.founders.title,
      subtitle: aboutContent.founders.subtitle,
      members: aboutContent.founders.members,
    };

    console.log(`   ✅ Founders Section added`);
    console.log(`      - Members: ${aboutSettings.founders.members.length}`);

    // Add Impact Section
    console.log("\n📝 Adding Impact Section...");
    aboutSettings.impact = {
      title: aboutContent.impact.title,
      subtitle: aboutContent.impact.subtitle,
      stats: aboutContent.impact.stats,
    };

    console.log(`   ✅ Impact Section added`);
    console.log(`      - Statistics: ${aboutSettings.impact.stats.length}`);

    // Add Why TrusComp Section
    console.log("\n📝 Adding Why Section...");
    aboutSettings.whySection = {
      title: aboutContent.whySection.title,
      subtitle: aboutContent.whySection.subtitle,
      features: aboutContent.whySection.features,
      highlights: aboutContent.whySection.highlights,
    };

    console.log(`   ✅ Why Section added`);
    console.log(
      `      - Features: ${aboutSettings.whySection.features.length}`
    );
    console.log(
      `      - Highlights: ${aboutSettings.whySection.highlights.length}`
    );

    // Add FAQ Section
    console.log("\n📝 Adding FAQ Section...");
    aboutSettings.faq = {
      title: aboutContent.faq.title,
      description: aboutContent.faq.description,
      items: aboutContent.faq.items,
    };

    console.log(`   ✅ FAQ Section added`);
    console.log(`      - Questions: ${aboutSettings.faq.items.length}`);

    // Add CTA Section
    console.log("\n📝 Adding CTA Section...");
    aboutSettings.cta = {
      badge: aboutContent.cta.badge,
      title: aboutContent.cta.title,
      description: aboutContent.cta.description,
      primaryButtonText: aboutContent.cta.primaryButtonText,
      primaryButtonLink: aboutContent.cta.primaryButtonLink,
      secondaryButtonText: aboutContent.cta.secondaryButtonText,
      secondaryButtonLink: aboutContent.cta.secondaryButtonLink,
    };

    console.log(`   ✅ CTA Section added`);

    // Save fresh data
    console.log("\n💾 Saving fresh data to database...");
    await aboutSettings.save();
    console.log("✅ Fresh data saved successfully to MongoDB");

    // Verify the data
    console.log("\n🔍 Verifying seeded data...");
    const verifiedSettings = await AboutPageSettings.findOne({
      pageKey: "about",
    });

    if (verifiedSettings) {
      console.log("✅ Data verification successful");
      console.log(`   - Hero Title: ${verifiedSettings.hero.title}`);
      console.log(`   - Founders: ${verifiedSettings.founders.members.length}`);
      console.log(`   - Impact Stats: ${verifiedSettings.impact.stats.length}`);
      console.log(
        `   - Why Features: ${verifiedSettings.whySection.features.length}`
      );
      console.log(`   - FAQ Items: ${verifiedSettings.faq.items.length}`);
    }

    console.log("\n✨ About page data seeding completed successfully!");
    console.log("\n📊 Fresh Data Summary:");
    console.log(`   ✓ Hero Section - Who We Are`);
    console.log(
      `   ✓ Founders Section - ${aboutSettings.founders.members.length} Founders`
    );
    console.log(
      `   ✓ Impact Section - ${aboutSettings.impact.stats.length} Statistics`
    );
    console.log(
      `   ✓ Why Section - ${aboutSettings.whySection.features.length} Features`
    );
    console.log(
      `   ✓ FAQ Section - ${aboutSettings.faq.items.length} Q&A Pairs`
    );
    console.log(`   ✓ CTA Section - Ready for conversion`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding about page data:");
    console.error(error.message);
    if (error.stack) {
      console.error(error.stack);
    }
    process.exit(1);
  }
}

seedAboutPageData();
