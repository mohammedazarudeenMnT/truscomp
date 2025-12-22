import AboutPageSettings from "../../models/content/AboutPage.js";
import {
  uploadToCloudinary,
  deleteFromCloudinary,
} from "../../utils/cloudinaryHelper.js";

// Get about page settings
export const getAboutPageSettings = async (req, res) => {
  try {
    const { pageKey } = req.params;
    let settings = await AboutPageSettings.findOne({ pageKey });

    // Create default settings if none exist
    if (!settings) {
      const defaultSettings = getDefaultSettingsForPage(pageKey);
      settings = await AboutPageSettings.create(defaultSettings);
    }

    res.json({
      success: true,
      data: settings,
    });
  } catch (error) {
    console.error("Error fetching about page settings:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch about page settings",
      error: error.message,
    });
  }
};

// Get all about pages
export const getAllAboutPages = async (req, res) => {
  try {
    const pages = await AboutPageSettings.find().sort({ pageName: 1 });
    res.json({
      success: true,
      data: pages,
    });
  } catch (error) {
    console.error("Error fetching all about pages:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch about pages",
      error: error.message,
    });
  }
};

// Update hero section
export const updateHero = async (req, res) => {
  try {
    const { pageKey } = req.params;
    const heroData = req.body;

    let settings = await AboutPageSettings.findOne({ pageKey });
    if (!settings) {
      const defaultSettings = getDefaultSettingsForPage(pageKey);
      settings = await AboutPageSettings.create(defaultSettings);
    }

    // Handle image upload
    if (heroData.imageFile) {
      try {
        const result = await uploadToCloudinary(heroData.imageFile, `about-${pageKey}-hero`);
        heroData.image = result.secure_url;
        delete heroData.imageFile;
      } catch (uploadError) {
        console.error("Image upload failed:", uploadError);
      }
    }

    settings.hero = { ...settings.hero, ...heroData };
    await settings.save();

    res.json({
      success: true,
      message: "Hero section updated successfully",
      data: settings.hero,
    });
  } catch (error) {
    console.error("Error updating hero section:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update hero section",
      error: error.message,
    });
  }
};

// Update founders section
export const updateFounders = async (req, res) => {
  try {
    const { pageKey } = req.params;
    const foundersData = req.body;

    let settings = await AboutPageSettings.findOne({ pageKey });
    if (!settings) {
      const defaultSettings = getDefaultSettingsForPage(pageKey);
      settings = await AboutPageSettings.create(defaultSettings);
    }

    // Handle image uploads for founders/members
    if (foundersData.members && Array.isArray(foundersData.members)) {
      for (let i = 0; i < foundersData.members.length; i++) {
        const member = foundersData.members[i];
        if (member.imageFile) {
          try {
            const result = await uploadToCloudinary(member.imageFile, `about-${pageKey}-member-${i}`);
            member.image = result.secure_url;
            delete member.imageFile;
          } catch (uploadError) {
            console.error("Member image upload failed:", uploadError);
          }
        }
      }
    }

    settings.founders = foundersData;
    await settings.save();

    res.json({
      success: true,
      message: "Founders section updated successfully",
      data: settings.founders,
    });
  } catch (error) {
    console.error("Error updating founders section:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update founders section",
      error: error.message,
    });
  }
};

// Update impact section
export const updateImpact = async (req, res) => {
  try {
    const { pageKey } = req.params;
    const impactData = req.body;

    let settings = await AboutPageSettings.findOne({ pageKey });
    if (!settings) {
      const defaultSettings = getDefaultSettingsForPage(pageKey);
      settings = await AboutPageSettings.create(defaultSettings);
    }

    settings.impact = impactData;
    await settings.save();

    res.json({
      success: true,
      message: "Impact section updated successfully",
      data: settings.impact,
    });
  } catch (error) {
    console.error("Error updating impact section:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update impact section",
      error: error.message,
    });
  }
};

// Update why section
export const updateWhySection = async (req, res) => {
  try {
    const { pageKey } = req.params;
    const whyData = req.body;

    let settings = await AboutPageSettings.findOne({ pageKey });
    if (!settings) {
      const defaultSettings = getDefaultSettingsForPage(pageKey);
      settings = await AboutPageSettings.create(defaultSettings);
    }

    settings.whySection = whyData;
    await settings.save();

    res.json({
      success: true,
      message: "Why section updated successfully",
      data: settings.whySection,
    });
  } catch (error) {
    console.error("Error updating why section:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update why section",
      error: error.message,
    });
  }
};

// Update FAQ section
export const updateFaq = async (req, res) => {
  try {
    const { pageKey } = req.params;
    const faqData = req.body;

    let settings = await AboutPageSettings.findOne({ pageKey });
    if (!settings) {
      const defaultSettings = getDefaultSettingsForPage(pageKey);
      settings = await AboutPageSettings.create(defaultSettings);
    }

    settings.faq = faqData;
    await settings.save();

    res.json({
      success: true,
      message: "FAQ section updated successfully",
      data: settings.faq,
    });
  } catch (error) {
    console.error("Error updating FAQ section:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update FAQ section",
      error: error.message,
    });
  }
};

// Update leadership section
export const updateLeadership = async (req, res) => {
  try {
    const { pageKey } = req.params;
    const leadershipData = req.body;

    let settings = await AboutPageSettings.findOne({ pageKey });
    if (!settings) {
      const defaultSettings = getDefaultSettingsForPage(pageKey);
      settings = await AboutPageSettings.create(defaultSettings);
    }

    // Handle image uploads for leadership members
    if (leadershipData.members && Array.isArray(leadershipData.members)) {
      for (let i = 0; i < leadershipData.members.length; i++) {
        const member = leadershipData.members[i];
        if (member.imageFile) {
          try {
            const result = await uploadToCloudinary(member.imageFile, `about-${pageKey}-leader-${i}`);
            member.image = result.secure_url;
            delete member.imageFile;
          } catch (uploadError) {
            console.error("Leadership image upload failed:", uploadError);
          }
        }
      }
    }

    settings.leadership = leadershipData;
    await settings.save();

    res.json({
      success: true,
      message: "Leadership section updated successfully",
      data: settings.leadership,
    });
  } catch (error) {
    console.error("Error updating leadership section:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update leadership section",
      error: error.message,
    });
  }
};

// Update features section
export const updateFeatures = async (req, res) => {
  try {
    const { pageKey } = req.params;
    const featuresData = req.body;

    let settings = await AboutPageSettings.findOne({ pageKey });
    if (!settings) {
      const defaultSettings = getDefaultSettingsForPage(pageKey);
      settings = await AboutPageSettings.create(defaultSettings);
    }

    settings.features = featuresData;
    await settings.save();

    res.json({
      success: true,
      message: "Features section updated successfully",
      data: settings.features,
    });
  } catch (error) {
    console.error("Error updating features section:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update features section",
      error: error.message,
    });
  }
};

// Update timeline section
export const updateTimeline = async (req, res) => {
  try {
    const { pageKey } = req.params;
    const timelineData = req.body;

    let settings = await AboutPageSettings.findOne({ pageKey });
    if (!settings) {
      const defaultSettings = getDefaultSettingsForPage(pageKey);
      settings = await AboutPageSettings.create(defaultSettings);
    }

    settings.timeline = timelineData;
    await settings.save();

    res.json({
      success: true,
      message: "Timeline section updated successfully",
      data: settings.timeline,
    });
  } catch (error) {
    console.error("Error updating timeline section:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update timeline section",
      error: error.message,
    });
  }
};

// Update vision & mission section
export const updateVisionMission = async (req, res) => {
  try {
    const { pageKey } = req.params;
    const visionMissionData = req.body;

    let settings = await AboutPageSettings.findOne({ pageKey });
    if (!settings) {
      const defaultSettings = getDefaultSettingsForPage(pageKey);
      settings = await AboutPageSettings.create(defaultSettings);
    }

    // Handle image uploads for vision and mission
    if (visionMissionData.vision && visionMissionData.vision.imageFile) {
      try {
        const result = await uploadToCloudinary(visionMissionData.vision.imageFile, `about-${pageKey}-vision`);
        visionMissionData.vision.image = result.secure_url;
        delete visionMissionData.vision.imageFile;
      } catch (uploadError) {
        console.error("Vision image upload failed:", uploadError);
      }
    }

    if (visionMissionData.mission && visionMissionData.mission.imageFile) {
      try {
        const result = await uploadToCloudinary(visionMissionData.mission.imageFile, `about-${pageKey}-mission`);
        visionMissionData.mission.image = result.secure_url;
        delete visionMissionData.mission.imageFile;
      } catch (uploadError) {
        console.error("Mission image upload failed:", uploadError);
      }
    }

    settings.visionMission = visionMissionData;
    await settings.save();

    res.json({
      success: true,
      message: "Vision & Mission section updated successfully",
      data: settings.visionMission,
    });
  } catch (error) {
    console.error("Error updating vision & mission section:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update vision & mission section",
      error: error.message,
    });
  }
};

// Update values section
export const updateValues = async (req, res) => {
  try {
    const { pageKey } = req.params;
    const valuesData = req.body;

    let settings = await AboutPageSettings.findOne({ pageKey });
    if (!settings) {
      const defaultSettings = getDefaultSettingsForPage(pageKey);
      settings = await AboutPageSettings.create(defaultSettings);
    }

    settings.values = valuesData;
    await settings.save();

    res.json({
      success: true,
      message: "Values section updated successfully",
      data: settings.values,
    });
  } catch (error) {
    console.error("Error updating values section:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update values section",
      error: error.message,
    });
  }
};

// Helper function to get default settings for different pages
function getDefaultSettingsForPage(pageKey) {
  const baseSettings = {
    pageKey,
    pageName: getPageName(pageKey),
    hero: {
      badge: "About TrusComp",
      title: "Who We Are",
      description: "TrusComp Private Limited is a trusted leader in compliance solutions, committed to transforming regulatory adherence through innovation and expertise. Guided by our core values of Trust, Transparency, and Transformation, we unite domain expertise in labor law, consulting, and technology to deliver exceptional value to our clients.",
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop",
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
      subtitle: "Meet the visionary leaders driving TrusComp's success:",
      members: [
        {
          name: "Mr. S. Deenadayalan",
          role: "Chairman",
          image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop",
          bio: "Chairman of the CEO Group of Companies with 25+ years of consulting expertise, known for delivering impactful organizational transformation.",
          social: {
            linkedin: "#",
          },
        },
        {
          name: "Mr. Anand Gopalan",
          role: "Managing Partner",
          image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
          bio: "Managing Partner at Agam Legal Services, a renowned labor law expert dedicated to ensuring seamless compliance.",
          social: {
            linkedin: "#",
          },
        },
        {
          name: "Mr. PPK Mahindhra",
          role: "Managing Partner",
          image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
          bio: "A technology innovator and Managing Partner at JZ Tec, specializing in automating compliance management for modern businesses.",
          social: {
            linkedin: "#",
          },
        },
      ],
    },
    impact: {
      title: "Our Impact",
      subtitle: "Measuring our success through the value we deliver to our clients and the industry.",
      stats: [
        {
          name: "7+ Years of Excellence",
          description: "Delivering customized compliance solutions across diverse industries",
          icon: "Star",
          className: "md:col-span-2 bg-primary/5 border-primary/10",
        },
        {
          name: "60+ Compliance Specialists",
          description: "A dedicated team committed to providing top-tier service and support.",
          icon: "ThumbsUp",
          className: "md:col-span-1 bg-primary/10 border-primary/20",
        },
        {
          name: "100+ Clients",
          description: "Trusted by industry leaders, including Blue Star, Reckitt Benckiser, and Ola Electric, to ensure flawless compliance management.",
          icon: "Users",
          className: "md:col-span-3 bg-primary/5 border-primary/10",
        },
      ],
    },
    whySection: {
      title: "Why Choose TrusComp?",
      subtitle: "We are more than a compliance partner; we are your ally in staying ahead of the curve.",
      highlights: ["Pan-India Presence", "Technology Driven", "Client-Centric Approach"],
      features: [
        {
          icon: "Shield",
          title: "Comprehensive Compliance",
          description: "End-to-end management and risk assessments.",
        },
        {
          icon: "Award",
          title: "Expertise You Can Trust",
          description: "Founded by industry leaders with decades of experience.",
        },
        {
          icon: "Lightbulb",
          title: "Innovative Solutions",
          description: "Leveraging technology to streamline compliance processes.",
        },
      ],
    },
    faq: {
      title: "Frequently Asked Questions",
      description: "Common questions about TrusComp and our services",
      items: [
        {
          question: "What makes TrusComp different?",
          answer: "Our unique combination of domain expertise, technology innovation, and personalized service sets us apart. We bring together labor law specialists, consultants, and technology experts to deliver comprehensive compliance solutions.",
        },
        {
          question: "Which industries do you serve?",
          answer: "We serve a wide range of industries including manufacturing, IT, retail, healthcare, and more. Our solutions are customized to meet the specific compliance needs of each sector.",
        },
      ],
    },
    cta: {
      badge: "Ready to Get Started?",
      title: "Let's Transform Your Compliance Journey",
      description: "Join hundreds of businesses that trust TrusComp for seamless compliance management.",
      primaryButtonText: "Contact Us Today",
      primaryButtonLink: "/contact",
      secondaryButtonText: "View Services",
      secondaryButtonLink: "/services",
    },
  };

  // Customize based on page
  switch (pageKey) {
    case "our-team":
      baseSettings.hero.badge = "Meet Our Team";
      baseSettings.hero.title = "The Team Behind TrusComp";
      baseSettings.hero.description = "At TrusComp, our team is the driving force behind our mission to simplify compliance and deliver transformative solutions.";
      baseSettings.founders = {
        title: "Our Founders",
        subtitle: "Meet the visionary leaders driving TrusComp's success",
        members: [],
      };
      baseSettings.leadership = {
        badge: "Leadership",
        title: "Our Leadership Team",
        subtitle: "Experienced professionals driving excellence in compliance management",
        members: [],
      };
      baseSettings.legacy = {
        title: "A Legacy of Excellence",
        description: "With a legacy of excellence and a team of seasoned leaders, TrusComp delivers unmatched service and expertise.",
        buttonText: "Join Our Team",
        buttonLink: "/careers",
        highlights: [
          "50+ Years Combined Experience",
          "Industry-Leading Expertise",
          "Innovative Solutions",
          "Client-Focused Approach",
          "Proven Track Record"
        ],
      };
      break;
    case "software-architecture":
      baseSettings.hero.badge = "Advanced Technology";
      baseSettings.hero.title = "Software Architecture: The Engine Behind Our Solution";
      baseSettings.hero.description = "At TrusComp, technology powers everything we do. Our advanced software architecture ensures efficient, secure, and scalable compliance solutions.";
      baseSettings.features = {
        title: "Key Features",
        subtitle: "Explore the key technological features that make our platform a leader in compliance management",
        items: [
          {
            icon: "Cloud",
            title: "Cloud-Based Infrastructure",
            description: "Scalable and resilient cloud infrastructure ensuring high availability and seamless access to compliance tools anytime, anywhere.",
          },
          {
            icon: "Shield",
            title: "Data Security",
            description: "Industry-standard encryption, multi-factor authentication, and role-based access control to protect your data.",
          },
        ],
      };
      baseSettings.benefits = {
        title: "Benefits of Our Technology",
        subtitle: "Discover how our advanced software architecture delivers tangible value to your business",
        items: [
          {
            title: "Enhanced Efficiency",
            description: "Streamline compliance processes with automation and modular architecture, reducing manual effort.",
          },
          {
            title: "Improved Security",
            description: "Industry-leading encryption and access controls protect your sensitive data at all times.",
          },
        ],
      };
      baseSettings.why = {
        title: "Why Choose TrusComp?",
        subtitle: "Our technology platform delivers unmatched value through proven expertise and innovation",
        stats: [
          { value: "100+", label: "Trusted Clients" },
          { value: "99.9%", label: "Uptime Guarantee" },
          { value: "24/7", label: "Support Available" },
        ],
        reasons: [
          {
            title: "Proven Expertise",
            description: "Trusted by 100+ clients for secure, efficient compliance solutions backed by years of industry experience.",
          },
        ],
      };
      break;
    case "timelines-milestones":
      baseSettings.hero.badge = "Our Process";
      baseSettings.hero.title = "Timelines & Milestones";
      baseSettings.hero.description = "At TrusComp, we pride ourselves on delivering effective project implementation through a structured approach with clear timelines and milestones.";
      baseSettings.timeline = {
        title: "Phased Project Delivery",
        subtitle: "A proven methodology that ensures successful implementation and lasting compliance",
        badge: "8-9 weeks implementation timeline",
        phases: [
          {
            number: "01",
            title: "Needs Assessment",
            week: "Week 1-2",
            description: "We conduct comprehensive audits of your current compliance status, identify gaps, and understand your specific business requirements.",
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
            description: "Our team establishes a detailed project timeline with clear deliverables and assigns skilled resources.",
            deliverables: [
              "Timeline Development",
              "Milestone Definition",
              "Resource Allocation",
              "Risk Assessment",
            ],
            duration: "1 week",
          },
        ],
      };
      baseSettings.why = {
        title: "Why Choose TrusComp's Phased Approach?",
        subtitle: "Our proven methodology delivers results with minimal risk and maximum efficiency.",
        benefits: [
          {
            title: "Seamless Transition",
            description: "A structured process minimizes disruptions during implementation.",
          },
          {
            title: "Tailored Solutions",
            description: "Customization ensures solutions meet your specific compliance needs.",
          },
        ],
      };
      break;
    case "vision-mission":
      baseSettings.hero.badge = "Our Purpose";
      baseSettings.hero.title = "Vision, Mission & Core Values";
      baseSettings.hero.description = "The principles that guide everything we do.";
      baseSettings.visionMission = {
        vision: {
          badge: "Our Vision",
          title: "Transforming Compliance Management",
          description: "To be the leading force in transforming compliance management in India, enabling organizations to achieve regulatory excellence effortlessly. We aim to set new benchmarks for ethical business practices across industries, fostering trust, transparency, and innovation.",
          image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
        },
        mission: {
          badge: "Our Mission",
          title: "Empowering Business Growth",
          description: "To empower businesses with innovative compliance solutions that simplify regulatory adherence and enhance operational efficiency. We strive to enable organizations to focus on growth with complete trust in their compliance.",
          image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop",
        },
      };
      baseSettings.values = {
        title: "Our Value System",
        subtitle: "The core principles that define who we are and how we operate.",
        items: [
          {
            title: "Trust",
            description: "We build and maintain trust with our clients, employees, and stakeholders. Trust forms the foundation of ethical compliance.",
            icon: "ShieldCheck",
            className: "md:col-span-2 bg-primary/5 border-primary/10",
          },
          {
            title: "Transparency",
            description: "Open and honest communication is at the heart of our operations. Transparency fosters accountability.",
            icon: "Eye",
            className: "md:col-span-1 bg-primary/10 border-primary/20",
          },
          {
            title: "Innovation",
            description: "By embracing cutting-edge technology, we deliver compliance solutions that are efficient and future-ready.",
            icon: "Lightbulb",
            className: "md:col-span-2 bg-primary/10 border-primary/20",
          },
        ],
      };
      break;
  }

  return baseSettings;
}

function getPageName(pageKey) {
  const pageNames = {
    about: "About Us",
    "our-team": "Our Team",
    "software-architecture": "Software Architecture",
    "timelines-milestones": "Timelines & Milestones",
    "vision-mission": "Vision, Mission & Core Values",
  };
  return pageNames[pageKey] || "About Page";
}

export const updateCta = async (req, res) => {
  try {
    const { pageKey } = req.params;
    const ctaData = req.body;

    let settings = await AboutPageSettings.findOne({ pageKey });
    if (!settings) {
      const defaultSettings = getDefaultSettingsForPage(pageKey);
      settings = await AboutPageSettings.create(defaultSettings);
    }

    settings.cta = ctaData;
    await settings.save();

    res.json({
      success: true,
      message: "CTA section updated successfully",
      data: settings.cta,
    });
  } catch (error) {
    console.error("Error updating CTA section:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update CTA section",
      error: error.message,
    });
  }
};

// Update benefits section (for software architecture page)
export const updateBenefits = async (req, res) => {
  try {
    const { pageKey } = req.params;
    const benefitsData = req.body;

    let settings = await AboutPageSettings.findOne({ pageKey });
    if (!settings) {
      const defaultSettings = getDefaultSettingsForPage(pageKey);
      settings = await AboutPageSettings.create(defaultSettings);
    }

    settings.benefits = benefitsData;
    await settings.save();

    res.json({
      success: true,
      message: "Benefits section updated successfully",
      data: settings.benefits,
    });
  } catch (error) {
    console.error("Error updating benefits section:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update benefits section",
      error: error.message,
    });
  }
};

// Update why section (for software architecture and timeline pages)
export const updateWhy = async (req, res) => {
  try {
    const { pageKey } = req.params;
    const whyData = req.body;

    let settings = await AboutPageSettings.findOne({ pageKey });
    if (!settings) {
      const defaultSettings = getDefaultSettingsForPage(pageKey);
      settings = await AboutPageSettings.create(defaultSettings);
    }

    settings.why = whyData;
    await settings.save();

    res.json({
      success: true,
      message: "Why section updated successfully",
      data: settings.why,
    });
  } catch (error) {
    console.error("Error updating why section:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update why section",
      error: error.message,
    });
  }
};

// Update legacy section (for team page)
export const updateLegacy = async (req, res) => {
  try {
    const { pageKey } = req.params;
    const legacyData = req.body;

    let settings = await AboutPageSettings.findOne({ pageKey });
    if (!settings) {
      const defaultSettings = getDefaultSettingsForPage(pageKey);
      settings = await AboutPageSettings.create(defaultSettings);
    }

    settings.legacy = legacyData;
    await settings.save();

    res.json({
      success: true,
      message: "Legacy section updated successfully",
      data: settings.legacy,
    });
  } catch (error) {
    console.error("Error updating legacy section:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update legacy section",
      error: error.message,
    });
  }
};