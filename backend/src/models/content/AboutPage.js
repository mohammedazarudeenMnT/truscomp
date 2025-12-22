import mongoose from "mongoose";

const aboutPageSettingsSchema = new mongoose.Schema(
  {
    pageKey: {
      type: String,
      required: true,
      unique: true,
      enum: ["about", "our-team", "software-architecture", "timelines-milestones", "vision-mission"],
    },
    pageName: {
      type: String,
      required: true,
    },

    // Hero Section (ParallaxHero for sub-pages, custom for main about)
    hero: {
      // For main about page
      badge: {
        type: String,
        default: "About TrusComp",
      },
      title: {
        type: String,
        required: true,
        default: "Who We Are",
      },
      description: {
        type: String,
        required: true,
        default: "TrusComp Private Limited is a trusted leader in compliance solutions.",
      },
      image: {
        type: String,
        default: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop",
      },
      primaryButtonText: {
        type: String,
        default: "Get Started",
      },
      primaryButtonLink: {
        type: String,
        default: "/contact",
      },
      secondaryButtonText: {
        type: String,
        default: "Meet the Team",
      },
      secondaryButtonLink: {
        type: String,
        default: "#founders",
      },
      statsNumber: {
        type: String,
        default: "7+",
      },
      statsTitle: {
        type: String,
        default: "Years of Excellence",
      },
      statsDescription: {
        type: String,
        default: "Trusted by Industry Leaders",
      },
      // For sub-pages (ParallaxHero)
      backgroundImage: {
        type: String,
        default: "",
      },
      subheading: {
        type: String,
        default: "",
      },
      heading: {
        type: String,
        default: "",
      },
      buttons: [
        {
          text: {
            type: String,
            required: true,
          },
          href: {
            type: String,
            required: true,
          },
          icon: {
            type: String,
            default: "",
          },
          variant: {
            type: String,
            enum: ["default", "outline"],
            default: "default",
          },
        },
      ],
    },

    // Founders/Team Section
    founders: {
      title: {
        type: String,
        default: "Our Founders",
      },
      subtitle: {
        type: String,
        default: "Meet the visionary leaders driving TrusComp's success",
      },
      members: [
        {
          name: {
            type: String,
            required: true,
          },
          role: {
            type: String,
            required: true,
          },
          title: {
            type: String,
            default: "",
          },
          bio: {
            type: String,
            required: true,
          },
          image: {
            type: String,
            default: "",
          },
          linkedin: {
            type: String,
            default: "",
          },
          email: {
            type: String,
            default: "",
          },
        },
      ],
    },

    // Leadership Section (for team page)
    leadership: {
      badge: {
        type: String,
        default: "Leadership",
      },
      title: {
        type: String,
        default: "Our Leadership Team",
      },
      subtitle: {
        type: String,
        default: "Experienced professionals driving excellence in compliance management",
      },
      members: [
        {
          name: {
            type: String,
            required: true,
          },
          role: {
            type: String,
            required: true,
          },
          bio: {
            type: String,
            required: true,
          },
          image: {
            type: String,
            default: "",
          },
        },
      ],
    },

    // Legacy Section (for team page)
    legacy: {
      title: {
        type: String,
        default: "A Legacy of Excellence",
      },
      description: {
        type: String,
        default: "With a legacy of excellence and a team of seasoned leaders, TrusComp delivers unmatched service and expertise.",
      },
      buttonText: {
        type: String,
        default: "Join Our Team",
      },
      buttonLink: {
        type: String,
        default: "/careers",
      },
      highlights: [
        {
          type: String,
          default: "",
        },
      ],
    },

    // Impact Section
    impact: {
      title: {
        type: String,
        default: "Our Impact",
      },
      subtitle: {
        type: String,
        default: "Measuring our success through the value we deliver",
      },
      stats: [
        {
          name: {
            type: String,
            required: true,
          },
          description: {
            type: String,
            required: true,
          },
          icon: {
            type: String,
            default: "Star",
          },
          className: {
            type: String,
            default: "md:col-span-1 bg-primary/5 border-primary/10",
          },
        },
      ],
    },

    // Why TrusComp Section
    whySection: {
      title: {
        type: String,
        default: "Why TrusComp?",
      },
      subtitle: {
        type: String,
        default: "We are more than a compliance partner; we are your ally in staying ahead of the curve.",
      },
      features: [
        {
          title: {
            type: String,
            required: true,
          },
          description: {
            type: String,
            required: true,
          },
          icon: {
            type: String,
            default: "Lightbulb",
          },
        },
      ],
      highlights: [
        {
          type: String,
          default: "Pan-India Presence",
        },
      ],
    },

    // Features Section (for architecture page)
    features: {
      title: {
        type: String,
        default: "Key Features",
      },
      subtitle: {
        type: String,
        default: "Explore the key technological features that make our platform a leader",
      },
      items: [
        {
          title: {
            type: String,
            required: true,
          },
          description: {
            type: String,
            required: true,
          },
          icon: {
            type: String,
            default: "Cloud",
          },
        },
      ],
    },

    // Benefits Section (for architecture page)
    benefits: {
      title: {
        type: String,
        default: "Benefits of Our Technology",
      },
      subtitle: {
        type: String,
        default: "Discover how our advanced software architecture delivers tangible value",
      },
      items: [
        {
          title: {
            type: String,
            required: true,
          },
          description: {
            type: String,
            required: true,
          },
        },
      ],
    },

    // Why Section (for architecture and timeline pages - different from whySection)
    why: {
      title: {
        type: String,
        default: "Why Choose TrusComp?",
      },
      subtitle: {
        type: String,
        default: "Our technology platform delivers unmatched value",
      },
      badge: {
        type: String,
        default: "",
      },
      stats: [
        {
          value: {
            type: String,
            required: true,
          },
          label: {
            type: String,
            required: true,
          },
        },
      ],
      reasons: [
        {
          title: {
            type: String,
            required: true,
          },
          description: {
            type: String,
            required: true,
          },
        },
      ],
      benefits: [
        {
          title: {
            type: String,
            required: true,
          },
          description: {
            type: String,
            required: true,
          },
        },
      ],
    },

    // Timeline/Phases Section
    timeline: {
      title: {
        type: String,
        default: "Phased Project Delivery",
      },
      subtitle: {
        type: String,
        default: "A proven methodology that ensures successful implementation",
      },
      badge: {
        type: String,
        default: "8-9 weeks implementation timeline",
      },
      phases: [
        {
          number: {
            type: String,
            required: true,
          },
          title: {
            type: String,
            required: true,
          },
          week: {
            type: String,
            required: true,
          },
          description: {
            type: String,
            required: true,
          },
          deliverables: [
            {
              type: String,
              required: true,
            },
          ],
          duration: {
            type: String,
            required: true,
          },
        },
      ],
    },

    // Vision & Mission Section
    visionMission: {
      vision: {
        title: {
          type: String,
          default: "Transforming Compliance Management",
        },
        description: {
          type: String,
          default: "To be the leading force in transforming compliance management in India.",
        },
        image: {
          type: String,
          default: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
        },
      },
      mission: {
        title: {
          type: String,
          default: "Empowering Business Growth",
        },
        description: {
          type: String,
          default: "To empower businesses with innovative compliance solutions.",
        },
        image: {
          type: String,
          default: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop",
        },
      },
    },

    // Values Section
    values: {
      title: {
        type: String,
        default: "Our Value System",
      },
      subtitle: {
        type: String,
        default: "The core principles that define who we are and how we operate.",
      },
      items: [
        {
          title: {
            type: String,
            required: true,
          },
          description: {
            type: String,
            required: true,
          },
          icon: {
            type: String,
            default: "ShieldCheck",
          },
          className: {
            type: String,
            default: "md:col-span-1 bg-primary/5 border-primary/10",
          },
        },
      ],
    },

    // FAQ Section
    faq: {
      title: {
        type: String,
        default: "Frequently Asked Questions",
      },
      description: {
        type: String,
        default: "Common questions about TrusComp and our services",
      },
      items: [
        {
          question: {
            type: String,
            required: true,
          },
          answer: {
            type: String,
            required: true,
          },
        },
      ],
    },

    // CTA Section
    cta: {
      badge: {
        type: String,
        default: "Ready to Get Started?",
      },
      title: {
        type: String,
        default: "Let's Transform Your Compliance Journey",
      },
      description: {
        type: String,
        default: "Join hundreds of businesses that trust TrusComp for seamless compliance management.",
      },
      primaryButtonText: {
        type: String,
        default: "Contact Us Today",
      },
      primaryButtonLink: {
        type: String,
        default: "/contact",
      },
      secondaryButtonText: {
        type: String,
        default: "View Services",
      },
      secondaryButtonLink: {
        type: String,
        default: "/services",
      },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("AboutPageSettings", aboutPageSettingsSchema);