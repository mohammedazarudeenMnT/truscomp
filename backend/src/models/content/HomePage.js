import mongoose from "mongoose";

const homePageSettingsSchema = new mongoose.Schema(
  {
    // Hero Section (Animated Sections)
    hero: {
      sections: [
        {
          title: {
            type: String,
            required: true,
            default: "Welcome to TrusComp",
          },
          text: {
            type: String,
            required: true,
            default: "Comprehensive Compliance Solutions",
          },
          description: {
            type: String,
            required: true,
            default:
              "Transforming regulatory adherence through innovation and expertise.",
          },
          buttonText: {
            type: String,
            default: "Get Started",
          },
          buttonLink: {
            type: String,
            default: "/contact",
          },
          img: {
            type: String,
            default: "",
          },
        },
      ],
    },

    // Why Choose Section
    whySection: {
      title: {
        type: String,
        default: "Why Choose TrusComp?",
      },
      subtitle: {
        type: String,
        default: "Choose TrusComp for effortless, future-ready compliance.",
      },
      features: [
        {
          icon: {
            type: String,
            default: "Shield",
          },
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
      stats: [
        {
          number: {
            type: String,
            required: true,
          },
          label: {
            type: String,
            required: true,
          },
          className: {
            type: String,
            default: "bg-primary/5 border-primary/10",
          },
        },
      ],
      trustIndicators: [
        {
          type: String,
          default: "Amara Raja",
        },
      ],
    },

    // FAQ Section
    faq: {
      badge: {
        type: String,
        default: "FAQ",
      },
      title: {
        type: String,
        default: "Frequently Asked Questions",
      },
      subtitle: {
        type: String,
        default: "",
      },
      description: {
        type: String,
        default: "Common questions about our compliance management solutions.",
      },
      image: {
        type: String,
        default:
          "https://images.unsplash.com/photo-1555212697-194d092e3b8f?q=80&w=830&h=844&auto=format&fit=crop",
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
      imageSrc: {
        type: String,
        default: "/images/cta-compliance.jpg",
      },
      title: {
        type: String,
        default: "Ready to Get Started?",
      },
      subtitle: {
        type: String,
        default: "Transform Your Compliance Journey Today",
      },
      description: {
        type: String,
        default:
          "Join hundreds of businesses that trust TrusComp for seamless compliance management.",
      },
      buttonText: {
        type: String,
        default: "Get Started Now",
      },
      buttonLink: {
        type: String,
        default: "/contact",
      },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("HomePageSettings", homePageSettingsSchema);
