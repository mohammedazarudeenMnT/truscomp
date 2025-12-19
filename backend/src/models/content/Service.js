import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    
    // Hero Section (flat structure to match frontend)
    heroTitle: {
      type: String,
      required: true,
      trim: true,
    },
    heroDescription: {
      type: String,
      required: true,
    },
    heroImage: {
      type: String,
      default: "",
    },
    heroButtonText: {
      type: String,
      default: "Get Started",
    },

    // Key Features Section
    keyFeatures: [
      {
        icon: {
          type: String,
          default: "Star",
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

    // Benefits Section
    benefits: [
      {
        icon: {
          type: String,
          default: "CheckCircle",
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

    // Why Choose Section
    whyChoose: [
      {
        icon: {
          type: String,
          default: "Award",
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

    // FAQ Section
    faqs: [
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

    // CTA Section
    cta: {
      badge: {
        type: String,
        default: "Ready to Transform Your Compliance?",
      },
      heading: {
        type: String,
        default: "",
      },
      description: {
        type: String,
        default: "Join hundreds of businesses that trust TrusComp for seamless, automated labor law compliance management.",
      },
      primaryButtonText: {
        type: String,
        default: "Get Started Now",
      },
      primaryButtonHref: {
        type: String,
        default: "/contact",
      },
      secondaryButtonText: {
        type: String,
        default: "Schedule Consultation",
      },
      secondaryButtonHref: {
        type: String,
        default: "/contact",
      },
      isDark: {
        type: Boolean,
        default: true,
      },
    },

    isActive: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },

    // Section Configuration - Control which sections are visible and their order
    sectionConfig: {
      keyFeatures: {
        enabled: {
          type: Boolean,
          default: true,
        },
        order: {
          type: Number,
          default: 1,
        },
        title: {
          type: String,
          default: "Key Features",
        },
        subtitle: {
          type: String,
          default: "",
        },
      },
      benefits: {
        enabled: {
          type: Boolean,
          default: true,
        },
        order: {
          type: Number,
          default: 2,
        },
        title: {
          type: String,
          default: "Benefits",
        },
        subtitle: {
          type: String,
          default: "",
        },
      },
      whyChoose: {
        enabled: {
          type: Boolean,
          default: true,
        },
        order: {
          type: Number,
          default: 3,
        },
        title: {
          type: String,
          default: "Why Choose Us",
        },
        subtitle: {
          type: String,
          default: "",
        },
      },
      faqs: {
        enabled: {
          type: Boolean,
          default: true,
        },
        order: {
          type: Number,
          default: 4,
        },
        title: {
          type: String,
          default: "FAQs",
        },
        subtitle: {
          type: String,
          default: "Common Questions Answered",
        },
        description: {
          type: String,
          default: "Get answers to frequently asked questions about our services and how we can help your business.",
        },
      },
      cta: {
        enabled: {
          type: Boolean,
          default: true,
        },
        order: {
          type: Number,
          default: 5,
        },
      },
    },
  },
  {
    timestamps: true,
  }
);

// Create slug from heroTitle before saving
serviceSchema.pre('validate', function(next) {
  if (this.heroTitle && !this.slug) {
    this.slug = this.heroTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }
  next();
});

export default mongoose.model("Service", serviceSchema);
