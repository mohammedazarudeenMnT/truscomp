import mongoose from "mongoose";

const servicesPageSettingsSchema = new mongoose.Schema(
  {
    // Hero Section
    hero: {
      title: {
        type: String,
        required: true,
        default: "TrusComp Compliance Solutions",
      },
      subtitle: {
        type: String,
        required: true,
        default: "Comprehensive compliance management solutions",
      },
      backgroundImage: {
        type: String,
        default: "",
      },
      primaryButtonText: {
        type: String,
        default: "Explore Services",
      },
      secondaryButtonText: {
        type: String,
        default: "Contact Us",
      },
    },

    // Why Choose Section
    whySection: {
      title: {
        type: String,
        default: "Why Choose TrusComp?",
      },
      subtitle: {
        type: String,
        default: "Experience the TrusComp advantage",
      },
      features: [
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
    },

    // FAQ Section
    faq: {
      title: {
        type: String,
        default: "Frequently Asked Questions",
      },
      description: {
        type: String,
        default: "Find answers to common questions",
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
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("ServicesPageSettings", servicesPageSettingsSchema);
