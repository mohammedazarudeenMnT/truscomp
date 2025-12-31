/**
 * Seed script for Vision, Mission, and Core Values Page
 * Populates the vision-mission page with company vision, mission, values, FAQs, and CTAs
 *
 * Usage: node seedVisionMissionPageData.js
 */

import AboutPageSettings from "../models/content/AboutPage.js";
import { connectDB } from "../config/database.js";
import dotenv from "dotenv";

dotenv.config();

const visionMissionContent = {
  hero: {
    subheading: "Our Purpose",
    heading: "Vision, Mission, and Core Values",
    description:
      "Our guiding principles that drive us to transform compliance management and empower businesses across India.",
    backgroundImage:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=2000&h=1200&fit=crop",
    primaryButtonText: "Get Started",
    primaryButtonLink: "/contact",
    secondaryButtonText: "Learn More",
    secondaryButtonLink: "/about",
  },
  visionMission: {
    vision: {
      title: "Our Vision",
      description:
        "To be the leading force in transforming compliance management in India, enabling organizations to achieve regulatory excellence effortlessly. We aim to set new benchmarks for ethical business practices across industries, fostering trust, transparency, and innovation.",
      image:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop",
    },
    mission: {
      title: "Our Mission",
      description:
        "To empower businesses with innovative compliance solutions that simplify regulatory adherence and enhance operational efficiency. We strive to enable organizations to focus on growth with complete trust in their compliance.",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
    },
  },
  values: {
    title: "Our Value System",
    subtitle:
      "The core principles that define who we are and how we operate at TrusComp.",
    items: [
      {
        title: "Trust",
        description:
          "We build and maintain trust with our clients, employees, and stakeholders. Trust forms the foundation of ethical compliance and long-lasting relationships.",
        icon: "Shield",
        className: "md:col-span-1 bg-primary/5 border-primary/10",
      },
      {
        title: "Transparency",
        description:
          "Open and honest communication is at the heart of our operations. Transparency fosters accountability and ensures well-informed decision-making.",
        icon: "Eye",
        className: "md:col-span-1 bg-primary/5 border-primary/10",
      },
      {
        title: "Ethical Practices",
        description:
          "Upholding the highest ethical standards is integral to our philosophy. We guide clients in adopting ethical compliance practices that align with their values.",
        icon: "Scale",
        className: "md:col-span-1 bg-primary/5 border-primary/10",
      },
      {
        title: "Innovation",
        description:
          "By embracing cutting-edge technology, we deliver compliance solutions that are efficient, effective, and future-ready. Innovation is our driving force.",
        icon: "Lightbulb",
        className: "md:col-span-1 bg-primary/5 border-primary/10",
      },
      {
        title: "Client-Centric Approach",
        description:
          "Our clients are at the center of everything we do. We provide tailored solutions that meet their unique needs and consistently exceed expectations.",
        icon: "Users",
        className: "md:col-span-1 bg-primary/5 border-primary/10",
      },
      {
        title: "Continuous Learning",
        description:
          "We cultivate a culture of ongoing improvement. Our team remains updated on the latest regulations and industry trends to offer the best solutions.",
        icon: "BookOpen",
        className: "md:col-span-1 bg-primary/5 border-primary/10",
      },
      {
        title: "Team Collaboration",
        description:
          "Collaboration is key to creativity and effective problem-solving. We foster teamwork to deliver exceptional results for our clients.",
        icon: "Handshake",
        className: "md:col-span-1 bg-primary/5 border-primary/10",
      },
    ],
  },
  faq: {
    title: "Frequently Asked Questions",
    description:
      "Get answers to common questions about TrusComp's vision and values",
    items: [
      {
        question: "What is TrusComp's vision for compliance management?",
        answer:
          "Our vision is to transform compliance management in India, enabling businesses to achieve regulatory excellence with ease while fostering ethical practices across industries.",
      },
      {
        question: "How does TrusComp embody its core values?",
        answer:
          "Our core values of trust, transparency, ethical practices, and innovation are reflected in every service we provide. These values guide our actions and help us deliver tailored compliance solutions.",
      },
      {
        question: "Why is innovation important in compliance management?",
        answer:
          "Innovation enables us to offer cutting-edge compliance solutions that simplify regulatory adherence and ensure efficiency, keeping our clients ahead in a dynamic regulatory landscape.",
      },
      {
        question: "What sets TrusComp apart in its approach?",
        answer:
          "Our client-centric approach, combined with a commitment to trust, transparency, and continuous learning, ensures customized solutions that exceed client expectations.",
      },
      {
        question: "How does TrusComp foster collaboration within its team?",
        answer:
          "We encourage teamwork and mutual support to drive creativity and deliver the best results. Collaboration is central to our success and the success of our clients.",
      },
    ],
  },
  cta: {
    badge: "Do you want to work with us?",
    title: "Join Here",
    description:
      "Partner with TrusComp to transform your compliance management through innovation, expertise, and unwavering commitment to excellence.",
    primaryButtonText: "Schedule a Consultation",
    primaryButtonLink: "/contact",
    secondaryButtonText: "Request a Demo",
    secondaryButtonLink: "/contact?type=demo",
  },
};

async function seedVisionMissionPageData() {
  try {
    console.log("🚀 Starting Vision, Mission & Values Page seeding...\n");

    // Connect to database
    console.log("📡 Connecting to database...");
    await connectDB();
    console.log("✅ Connected to MongoDB");

    // Clear existing data for the vision-mission page
    console.log("\n🔄 Clearing existing data...");
    try {
      const result = await AboutPageSettings.deleteOne({
        pageKey: "vision-mission",
      });
      console.log(
        `✓ Cleared existing data (deleted: ${result.deletedCount} document)`
      );
    } catch (err) {
      if (err.code !== 26) throw err; // Code 26 = collection doesn't exist (OK)
    }

    // Create fresh document
    console.log("\n📝 Creating fresh vision-mission page document...");
    let visionMissionSettings = new AboutPageSettings({
      pageKey: "vision-mission",
      pageName: "Vision, Mission & Values",
    });

    // Add Hero Section
    console.log("\n📝 Adding Hero Section...");
    visionMissionSettings.hero = {
      subheading: visionMissionContent.hero.subheading,
      heading: visionMissionContent.hero.heading,
      description: visionMissionContent.hero.description,
      backgroundImage: visionMissionContent.hero.backgroundImage,
      primaryButtonText: visionMissionContent.hero.primaryButtonText,
      primaryButtonLink: visionMissionContent.hero.primaryButtonLink,
      secondaryButtonText: visionMissionContent.hero.secondaryButtonText,
      secondaryButtonLink: visionMissionContent.hero.secondaryButtonLink,
    };

    console.log(`   ✅ Hero Section added`);
    console.log(`      - Heading: ${visionMissionSettings.hero.heading}`);

    // Add Vision & Mission Section
    console.log("\n📝 Adding Vision & Mission Section...");
    visionMissionSettings.visionMission = {
      vision: {
        title: visionMissionContent.visionMission.vision.title,
        description: visionMissionContent.visionMission.vision.description,
        image: visionMissionContent.visionMission.vision.image,
      },
      mission: {
        title: visionMissionContent.visionMission.mission.title,
        description: visionMissionContent.visionMission.mission.description,
        image: visionMissionContent.visionMission.mission.image,
      },
    };

    console.log(`   ✅ Vision & Mission Section added`);
    console.log(
      `      - Vision: ${visionMissionSettings.visionMission.vision.title}`
    );
    console.log(
      `      - Mission: ${visionMissionSettings.visionMission.mission.title}`
    );

    // Add Values Section
    console.log("\n📝 Adding Values Section...");
    visionMissionSettings.values = {
      title: visionMissionContent.values.title,
      subtitle: visionMissionContent.values.subtitle,
      items: visionMissionContent.values.items,
    };

    console.log(`   ✅ Values Section added`);
    console.log(
      `      - Core Values: ${visionMissionSettings.values.items.length}`
    );

    // Add FAQ Section
    console.log("\n📝 Adding FAQ Section...");
    visionMissionSettings.faq = {
      title: visionMissionContent.faq.title,
      description: visionMissionContent.faq.description,
      items: visionMissionContent.faq.items,
    };

    console.log(`   ✅ FAQ Section added`);
    console.log(`      - Questions: ${visionMissionSettings.faq.items.length}`);

    // Add CTA Section
    console.log("\n📝 Adding CTA Section...");
    visionMissionSettings.cta = {
      badge: visionMissionContent.cta.badge,
      title: visionMissionContent.cta.title,
      description: visionMissionContent.cta.description,
      primaryButtonText: visionMissionContent.cta.primaryButtonText,
      primaryButtonLink: visionMissionContent.cta.primaryButtonLink,
      secondaryButtonText: visionMissionContent.cta.secondaryButtonText,
      secondaryButtonLink: visionMissionContent.cta.secondaryButtonLink,
    };

    console.log(`   ✅ CTA Section added`);

    // Save fresh data
    console.log("\n💾 Saving fresh data to database...");
    await visionMissionSettings.save();
    console.log("✅ Fresh data saved successfully to MongoDB");

    // Verify the data
    console.log("\n🔍 Verifying seeded data...");
    const verifiedSettings = await AboutPageSettings.findOne({
      pageKey: "vision-mission",
    });

    if (verifiedSettings) {
      console.log("✅ Data verification successful");
      console.log(`   - Hero Heading: ${verifiedSettings.hero.heading}`);
      console.log(`   - Values: ${verifiedSettings.values.items.length}`);
      console.log(`   - FAQ Items: ${verifiedSettings.faq.items.length}`);
    }

    console.log(
      "\n✨ Vision, Mission & Values page data seeding completed successfully!"
    );
    console.log("\n📊 Fresh Data Summary:");
    console.log(`   ✓ Hero Section - Our Purpose & Principles`);
    console.log(`   ✓ Vision & Mission Section - 2 Statements`);
    console.log(
      `   ✓ Values Section - ${visionMissionSettings.values.items.length} Core Values`
    );
    console.log(
      `   ✓ FAQ Section - ${visionMissionSettings.faq.items.length} Q&A Pairs`
    );
    console.log(`   ✓ CTA Section - Ready for conversion`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding vision-mission page data:");
    console.error(error.message);
    if (error.stack) {
      console.error(error.stack);
    }
    process.exit(1);
  }
}

seedVisionMissionPageData();
