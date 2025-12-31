/**
 * Seed script for Timelines & Milestones Page
 * Populates the timelines-milestones page with phases, benefits, FAQs, and CTAs
 *
 * Usage: node seedTimelinesPageData.js
 */

import AboutPageSettings from "../models/content/AboutPage.js";
import { connectDB } from "../config/database.js";
import dotenv from "dotenv";

dotenv.config();

const timelinesContent = {
  hero: {
    subheading: "Our Process",
    heading: "Timelines & Milestones",
    description:
      "At TrusComp, we pride ourselves on delivering effective project implementation through a structured approach with clear timelines and milestones. Our proven phased methodology ensures successful compliance implementation with minimal risk and maximum efficiency.",
    backgroundImage:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=2000&h=1200&fit=crop",
    primaryButtonText: "Book Now",
    primaryButtonLink: "/contact",
    secondaryButtonText: "Learn More",
    secondaryButtonLink: "/about",
  },
  timeline: {
    title: "Phased Project Delivery",
    subtitle:
      "A proven methodology that ensures successful implementation and lasting compliance",
    badge: "8-9 weeks implementation timeline",
    phases: [
      {
        number: "01",
        title: "Needs Assessment",
        week: "Week 1-2",
        description:
          "We conduct comprehensive audits of your current compliance status, identify gaps, and understand your specific business requirements.",
        deliverables: [
          "Compliance Gap Analysis",
          "Risk Assessment Report",
          "Stakeholder Interviews",
          "Current State Documentation",
        ],
        duration: "2 weeks",
      },
      {
        number: "02",
        title: "Project Planning",
        week: "Week 3",
        description:
          "Our team establishes a detailed project timeline with clear deliverables and assigns skilled resources to ensure your project's success from start to finish.",
        deliverables: [
          "Timeline Development",
          "Milestone Definition",
          "Resource Allocation",
          "Risk Assessment",
        ],
        duration: "1 week",
      },
      {
        number: "03",
        title: "Technical Setup",
        week: "Week 4-5",
        description:
          "We implement compliance infrastructure, configure systems, and set up monitoring tools to ensure seamless operations.",
        deliverables: [
          "System Configuration",
          "Integration Setup",
          "Security Protocols",
          "Documentation Portal",
        ],
        duration: "2 weeks",
      },
      {
        number: "04",
        title: "User Testing",
        week: "Week 6",
        description:
          "Rigorous testing with your team ensures all systems work flawlessly and meet regulatory requirements before launch.",
        deliverables: [
          "Functionality Testing",
          "User Acceptance Testing",
          "Compliance Verification",
          "Bug Fixes & Adjustments",
        ],
        duration: "1 week",
      },
      {
        number: "05",
        title: "Pilot Launch",
        week: "Week 7",
        description:
          "A controlled rollout to a select group allows us to validate the solution in real-world conditions and gather critical feedback.",
        deliverables: [
          "Pilot Group Selection",
          "Training Sessions",
          "Performance Monitoring",
          "Feedback Collection",
        ],
        duration: "1 week",
      },
      {
        number: "06",
        title: "Full-Scale Launch",
        week: "Week 8",
        description:
          "Complete deployment across your organization with comprehensive training and support to ensure smooth adoption.",
        deliverables: [
          "Organization-Wide Rollout",
          "Comprehensive Training",
          "Documentation Delivery",
          "Support Activation",
        ],
        duration: "1 week",
      },
      {
        number: "07",
        title: "Ongoing Support",
        week: "Week 9+",
        description:
          "Continuous monitoring, updates, and dedicated support ensure your compliance solution evolves with changing regulations.",
        deliverables: [
          "Regular Health Checks",
          "Regulatory Updates",
          "Performance Optimization",
          "24/7 Support Access",
        ],
        duration: "Ongoing",
      },
    ],
  },
  why: {
    title: "Why Choose TrusComp's Phased Approach?",
    subtitle:
      "Our proven methodology delivers results with minimal risk and maximum efficiency.",
    benefits: [
      {
        title: "Seamless Transition",
        description:
          "A structured process minimizes disruptions during implementation.",
      },
      {
        title: "Tailored Solutions",
        description:
          "Customization ensures solutions meet your specific compliance needs.",
      },
      {
        title: "Ongoing Support",
        description:
          "Continuous updates and reviews keep your system aligned with regulatory changes.",
      },
      {
        title: "Operational Efficiency",
        description:
          "Pilot testing and feedback ensure optimal workflows before full deployment.",
      },
    ],
  },
  faq: {
    title: "Frequently Asked Questions",
    description:
      "Find answers to common questions about our implementation process",
    items: [
      {
        question: "How long does TrusComp's implementation process take?",
        answer:
          "The full implementation process typically spans 8-9 weeks, with ongoing support provided after deployment.",
      },
      {
        question:
          "Can the project timeline be adjusted to meet urgent requirements?",
        answer:
          "Yes, we can customize the timeline to prioritize urgent compliance needs, ensuring prompt delivery.",
      },
      {
        question: "What kind of training is included in the onboarding phase?",
        answer:
          "Our training sessions include hands-on workshops, system walkthroughs, and detailed user manuals to ensure a smooth transition for all users.",
      },
      {
        question: "How does TrusComp handle compliance updates?",
        answer:
          "We provide regular system updates to reflect the latest regulatory changes, ensuring continued compliance.",
      },
      {
        question: "What support is available after deployment?",
        answer:
          "Our ongoing support includes technical assistance, quarterly reviews, and continuous compliance updates to keep your system running efficiently.",
      },
    ],
  },
  cta: {
    badge: "Structured Implementation",
    title: "Start Your 8-Week Transformation",
    description:
      "Our proven phased approach ensures smooth, successful compliance implementation. Join hundreds of companies that have transformed their operations with TrusComp.",
    primaryButtonText: "Begin Implementation",
    primaryButtonLink: "/contact",
    secondaryButtonText: "Download Timeline",
    secondaryButtonLink: "/resources/timeline",
  },
};

async function seedTimelinesPageData() {
  try {
    console.log("🚀 Starting Timelines & Milestones Page seeding...\n");

    // Connect to database
    console.log("📡 Connecting to database...");
    await connectDB();
    console.log("✅ Connected to MongoDB");

    // Clear existing data for the timelines-milestones page
    console.log("\n🔄 Clearing existing data...");
    try {
      const result = await AboutPageSettings.deleteOne({
        pageKey: "timelines-milestones",
      });
      console.log(
        `✓ Cleared existing data (deleted: ${result.deletedCount} document)`
      );
    } catch (err) {
      if (err.code !== 26) throw err; // Code 26 = collection doesn't exist (OK)
    }

    // Create fresh document
    console.log("\n📝 Creating fresh timelines-milestones page document...");
    let timelinesSettings = new AboutPageSettings({
      pageKey: "timelines-milestones",
      pageName: "Timelines & Milestones",
    });

    // Add Hero Section
    console.log("\n📝 Adding Hero Section...");
    timelinesSettings.hero = {
      subheading: timelinesContent.hero.subheading,
      heading: timelinesContent.hero.heading,
      description: timelinesContent.hero.description,
      backgroundImage: timelinesContent.hero.backgroundImage,
      primaryButtonText: timelinesContent.hero.primaryButtonText,
      primaryButtonLink: timelinesContent.hero.primaryButtonLink,
      secondaryButtonText: timelinesContent.hero.secondaryButtonText,
      secondaryButtonLink: timelinesContent.hero.secondaryButtonLink,
    };

    console.log(`   ✅ Hero Section added`);
    console.log(`      - Heading: ${timelinesSettings.hero.heading}`);

    // Add Timeline Section
    console.log("\n📝 Adding Timeline Section...");
    timelinesSettings.timeline = {
      title: timelinesContent.timeline.title,
      subtitle: timelinesContent.timeline.subtitle,
      badge: timelinesContent.timeline.badge,
      phases: timelinesContent.timeline.phases,
    };

    console.log(`   ✅ Timeline Section added`);
    console.log(
      `      - Phases: ${timelinesSettings.timeline.phases.length}`
    );

    // Add Why Section
    console.log("\n📝 Adding Why Section...");
    timelinesSettings.why = {
      title: timelinesContent.why.title,
      subtitle: timelinesContent.why.subtitle,
      benefits: timelinesContent.why.benefits,
    };

    console.log(`   ✅ Why Section added`);
    console.log(
      `      - Benefits: ${timelinesSettings.why.benefits.length}`
    );

    // Add FAQ Section
    console.log("\n📝 Adding FAQ Section...");
    timelinesSettings.faq = {
      title: timelinesContent.faq.title,
      description: timelinesContent.faq.description,
      items: timelinesContent.faq.items,
    };

    console.log(`   ✅ FAQ Section added`);
    console.log(`      - Questions: ${timelinesSettings.faq.items.length}`);

    // Add CTA Section
    console.log("\n📝 Adding CTA Section...");
    timelinesSettings.cta = {
      badge: timelinesContent.cta.badge,
      title: timelinesContent.cta.title,
      description: timelinesContent.cta.description,
      primaryButtonText: timelinesContent.cta.primaryButtonText,
      primaryButtonLink: timelinesContent.cta.primaryButtonLink,
      secondaryButtonText: timelinesContent.cta.secondaryButtonText,
      secondaryButtonLink: timelinesContent.cta.secondaryButtonLink,
    };

    console.log(`   ✅ CTA Section added`);

    // Save fresh data
    console.log("\n💾 Saving fresh data to database...");
    await timelinesSettings.save();
    console.log("✅ Fresh data saved successfully to MongoDB");

    // Verify the data
    console.log("\n🔍 Verifying seeded data...");
    const verifiedSettings = await AboutPageSettings.findOne({
      pageKey: "timelines-milestones",
    });

    if (verifiedSettings) {
      console.log("✅ Data verification successful");
      console.log(`   - Hero Heading: ${verifiedSettings.hero.heading}`);
      console.log(`   - Phases: ${verifiedSettings.timeline.phases.length}`);
      console.log(`   - Benefits: ${verifiedSettings.why.benefits.length}`);
      console.log(`   - FAQ Items: ${verifiedSettings.faq.items.length}`);
    }

    console.log(
      "\n✨ Timelines & Milestones page data seeding completed successfully!"
    );
    console.log("\n📊 Fresh Data Summary:");
    console.log(`   ✓ Hero Section - Timelines & Milestones`);
    console.log(
      `   ✓ Timeline Section - ${timelinesSettings.timeline.phases.length} Phases`
    );
    console.log(
      `   ✓ Why Section - ${timelinesSettings.why.benefits.length} Benefits`
    );
    console.log(
      `   ✓ FAQ Section - ${timelinesSettings.faq.items.length} Q&A Pairs`
    );
    console.log(`   ✓ CTA Section - Ready for conversion`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding timelines-milestones page data:");
    console.error(error.message);
    if (error.stack) {
      console.error(error.stack);
    }
    process.exit(1);
  }
}

seedTimelinesPageData();
