/**
 * Seed script for Our Team Page
 * Populates the our-team page with founder bios, leadership team, legacy, FAQs, and CTAs
 *
 * Usage: node seedOurTeamPageData.js
 */

import AboutPageSettings from "../models/content/AboutPage.js";
import { connectDB } from "../config/database.js";
import dotenv from "dotenv";

dotenv.config();

const ourTeamContent = {
  hero: {
    subheading: "Our Team",
    heading: "Meet Our Team",
    description:
      "At TrusComp, our team is the driving force behind our mission to simplify compliance and deliver transformative solutions. Led by visionary founders and an experienced leadership team, we combine decades of expertise with a passion for innovation to ensure unmatched service and results.",
    backgroundImage:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=2000&h=1200&fit=crop",
    primaryButtonText: "Join Our Team",
    primaryButtonLink: "/careers",
    secondaryButtonText: "Contact Us",
    secondaryButtonLink: "/contact",
  },
  founders: {
    title: "Our Founders",
    subtitle:
      "Visionary leaders with decades of expertise driving TrusComp's mission",
    members: [
      {
        name: "Mr. S. Deenadayalan",
        role: "Founder",
        title: "",
        bio: 'Affectionately known as "Deen," S. Deenadayalan brings over 50 years of expertise to TrusComp. As the founder of the Centre for Excellence in Organization, he pioneered self-managed teams and grassroots competency development globally. Recognized with DuPont\'s "Best Community Outreach Award," his visionary leadership guides TrusComp in delivering simplified compliance solutions that empower organizations to thrive.',
        image: "",
        linkedin: "",
        email: "",
      },
      {
        name: "Mr. Anand Gopalan",
        role: "Knowledge Partner",
        title: "",
        bio: "Anand Gopalan, founder of Agam Legal, is a Barrister from London's Middle Temple and a trusted expert in labor law and industrial relations. Known for his proactive and innovative approach, he is a key policy reform contributor in Tamil Nadu and serves on the governing boards of MCCI and EFSI. His expertise drives TrusComp's forward-thinking compliance tools, simplifying regulatory processes for businesses.",
        image: "",
        linkedin: "",
        email: "",
      },
      {
        name: "Mr. PPK Mahindhra",
        role: "Co-Founder",
        title: "",
        bio: "With over 26 years of diverse industry experience, PPK Mahindhra, or Mahe, is a pioneer in automating compliance solutions. His expertise spans high-performance systems, innovative HR practices, and RPA-powered compliance tools. At TrusComp, he combines creativity and technical acumen to develop highly customizable solutions that redefine the future of compliance management.",
        image: "",
        linkedin: "",
        email: "",
      },
    ],
  },
  leadership: {
    badge: "Leadership",
    title: "Our Leadership Team",
    subtitle:
      "Experienced professionals driving excellence in compliance management",
    members: [
      {
        name: "Mr. C. Sreetharan",
        role: "Chief Operating Officer",
        bio: "With over 40 years of HR expertise, Sreetharan brings a strategic approach to labor compliance and employee relations. A graduate of the Madras School of Social Work, his balanced perspective ensures innovative, forward-thinking solutions that address both employer and employee needs.",
        image: "",
      },
      {
        name: "Mr. M.V. Prakash",
        role: "Senior Vice President, Business Expansion",
        bio: "Prakash leads TrusComp's business growth initiatives, drawing on 45+ years of experience in market expansion and strategic partnerships. His visionary leadership strengthens TrusComp's position as a trusted compliance solutions provider.",
        image: "",
      },
      {
        name: "Mr. Ramesh",
        role: "Head of Operations",
        bio: "Ramesh's 20+ years of experience in HR compliance, coupled with his legal expertise and advanced training from the Institute of Company Secretaries of India, makes him a cornerstone of TrusComp's operations. He drives innovative solutions that simplify complex compliance initiatives across India.",
        image: "",
      },
    ],
  },
  legacy: {
    title: "A Legacy of Excellence",
    description:
      "With a legacy of excellence and a team of seasoned leaders, TrusComp delivers unmatched service and expertise. The dynamic mix of experienced professionals and innovative talent ensures our clients receive the highest level of professionalism and results throughout their compliance journey.",
    buttonText: "Explore Our Story",
    buttonLink: "/about",
    highlights: [
      "50+ Years of Combined Expertise",
      "Proven Track Record",
      "Industry-Recognized Leaders",
      "Innovation-Driven Solutions",
    ],
  },
  faq: {
    title: "Frequently Asked Questions",
    description: "Get answers to common questions about TrusComp's team",
    items: [
      {
        question: "Who are the founders of TrusComp?",
        answer:
          "TrusComp was founded by S. Deenadayalan, Anand Gopalan, and PPK Mahindhra—visionaries with expertise in compliance, labor law, and technology.",
      },
      {
        question: "What makes TrusComp's leadership team unique?",
        answer:
          "Our leadership team blends decades of experience in HR, compliance, and business development with a forward-thinking approach to delivering innovative solutions.",
      },
      {
        question: "How does TrusComp's team ensure compliance excellence?",
        answer:
          "With a commitment to innovation, our team leverages advanced tools, industry expertise, and a client-focused approach to deliver compliance solutions that drive results.",
      },
      {
        question: "What industries does TrusComp's team serve?",
        answer:
          "TrusComp serves diverse industries, including manufacturing, healthcare, technology, and more, offering tailored compliance solutions for each sector.",
      },
      {
        question: "How can I connect with TrusComp's team?",
        answer:
          "Reach out to Schedule a Consultation or Request a Demo and discover how our team can support your compliance journey.",
      },
    ],
  },
  cta: {
    badge: "Do you want to work with us?",
    title: "Join Here",
    description:
      "Be part of a team that values innovation, expertise, and client success. Join TrusComp and shape the future of compliance management.",
    primaryButtonText: "View Openings",
    primaryButtonLink: "/careers",
    secondaryButtonText: "Learn More",
    secondaryButtonLink: "/about",
  },
};

async function seedOurTeamPageData() {
  try {
    console.log("🚀 Starting Our Team Page seeding...\n");

    // Connect to database
    console.log("📡 Connecting to database...");
    await connectDB();
    console.log("✅ Connected to MongoDB");

    // Clear existing data for the our-team page
    console.log("\n🔄 Clearing existing data...");
    try {
      const result = await AboutPageSettings.deleteOne({ pageKey: "our-team" });
      console.log(
        `✓ Cleared existing data (deleted: ${result.deletedCount} document)`
      );
    } catch (err) {
      if (err.code !== 26) throw err; // Code 26 = collection doesn't exist (OK)
    }

    // Create fresh document
    console.log("\n📝 Creating fresh our-team page document...");
    let ourTeamSettings = new AboutPageSettings({
      pageKey: "our-team",
      pageName: "Our Team",
    });

    // Add Hero Section
    console.log("\n📝 Adding Hero Section...");
    ourTeamSettings.hero = {
      subheading: ourTeamContent.hero.subheading,
      heading: ourTeamContent.hero.heading,
      description: ourTeamContent.hero.description,
      backgroundImage: ourTeamContent.hero.backgroundImage,
      primaryButtonText: ourTeamContent.hero.primaryButtonText,
      primaryButtonLink: ourTeamContent.hero.primaryButtonLink,
      secondaryButtonText: ourTeamContent.hero.secondaryButtonText,
      secondaryButtonLink: ourTeamContent.hero.secondaryButtonLink,
    };

    console.log(`   ✅ Hero Section added`);
    console.log(`      - Heading: ${ourTeamSettings.hero.heading}`);

    // Add Founders Section
    console.log("\n📝 Adding Founders Section...");
    ourTeamSettings.founders = {
      title: ourTeamContent.founders.title,
      subtitle: ourTeamContent.founders.subtitle,
      members: ourTeamContent.founders.members,
    };

    console.log(`   ✅ Founders Section added`);
    console.log(`      - Members: ${ourTeamSettings.founders.members.length}`);

    // Add Leadership Section
    console.log("\n📝 Adding Leadership Team Section...");
    ourTeamSettings.leadership = {
      badge: ourTeamContent.leadership.badge,
      title: ourTeamContent.leadership.title,
      subtitle: ourTeamContent.leadership.subtitle,
      members: ourTeamContent.leadership.members,
    };

    console.log(`   ✅ Leadership Section added`);
    console.log(
      `      - Members: ${ourTeamSettings.leadership.members.length}`
    );

    // Add Legacy Section
    console.log("\n📝 Adding Legacy Section...");
    ourTeamSettings.legacy = {
      title: ourTeamContent.legacy.title,
      description: ourTeamContent.legacy.description,
      buttonText: ourTeamContent.legacy.buttonText,
      buttonLink: ourTeamContent.legacy.buttonLink,
      highlights: ourTeamContent.legacy.highlights,
    };

    console.log(`   ✅ Legacy Section added`);
    console.log(
      `      - Highlights: ${ourTeamSettings.legacy.highlights.length}`
    );

    // Add FAQ Section
    console.log("\n📝 Adding FAQ Section...");
    ourTeamSettings.faq = {
      title: ourTeamContent.faq.title,
      description: ourTeamContent.faq.description,
      items: ourTeamContent.faq.items,
    };

    console.log(`   ✅ FAQ Section added`);
    console.log(`      - Questions: ${ourTeamSettings.faq.items.length}`);

    // Add CTA Section
    console.log("\n📝 Adding CTA Section...");
    ourTeamSettings.cta = {
      badge: ourTeamContent.cta.badge,
      title: ourTeamContent.cta.title,
      description: ourTeamContent.cta.description,
      primaryButtonText: ourTeamContent.cta.primaryButtonText,
      primaryButtonLink: ourTeamContent.cta.primaryButtonLink,
      secondaryButtonText: ourTeamContent.cta.secondaryButtonText,
      secondaryButtonLink: ourTeamContent.cta.secondaryButtonLink,
    };

    console.log(`   ✅ CTA Section added`);

    // Save fresh data
    console.log("\n💾 Saving fresh data to database...");
    await ourTeamSettings.save();
    console.log("✅ Fresh data saved successfully to MongoDB");

    // Verify the data
    console.log("\n🔍 Verifying seeded data...");
    const verifiedSettings = await AboutPageSettings.findOne({
      pageKey: "our-team",
    });

    if (verifiedSettings) {
      console.log("✅ Data verification successful");
      console.log(`   - Hero Heading: ${verifiedSettings.hero.heading}`);
      console.log(`   - Founders: ${verifiedSettings.founders.members.length}`);
      console.log(
        `   - Leadership: ${verifiedSettings.leadership.members.length}`
      );
      console.log(`   - FAQ Items: ${verifiedSettings.faq.items.length}`);
    }

    console.log("\n✨ Our Team page data seeding completed successfully!");
    console.log("\n📊 Fresh Data Summary:");
    console.log(`   ✓ Hero Section - Meet Our Team`);
    console.log(
      `   ✓ Founders Section - ${ourTeamSettings.founders.members.length} Founders`
    );
    console.log(
      `   ✓ Leadership Section - ${ourTeamSettings.leadership.members.length} Leaders`
    );
    console.log(
      `   ✓ Legacy Section - ${ourTeamSettings.legacy.highlights.length} Highlights`
    );
    console.log(
      `   ✓ FAQ Section - ${ourTeamSettings.faq.items.length} Q&A Pairs`
    );
    console.log(`   ✓ CTA Section - Ready for conversion`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding our-team page data:");
    console.error(error.message);
    if (error.stack) {
      console.error(error.stack);
    }
    process.exit(1);
  }
}

seedOurTeamPageData();
