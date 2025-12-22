import mongoose from "mongoose";

const testimonialsPageSchema = new mongoose.Schema(
  {
    pageKey: {
      type: String,
      required: true,
      unique: true,
      default: "client-testimonials",
    },
    pageName: {
      type: String,
      default: "Client Testimonials",
    },

    // Hero Section
    hero: {
      badgeText: { type: String, default: "Testimonials" },
      title: { type: String, default: "Trusted by leaders from various industries" },
      description: { type: String, default: "Learn why professionals trust our solutions to complete their customer journeys." },
      ctaText: { type: String, default: "Read Success Stories" },
      ctaHref: { type: String, default: "#testimonials" },
      testimonialImages: [
        {
          imgSrc: String,
          alt: String,
        },
      ],
    },

    // Testimonials Slider Section
    testimonials: {
      title: { type: String, default: "What Our Clients Say" },
      subtitle: { type: String, default: "Real stories from businesses transformed by our compliance solutions" },
      reviews: [
        {
          name: { type: String, required: true },
          affiliation: { type: String, required: true },
          quote: { type: String, required: true },
          imageSrc: String,
          thumbnailSrc: String,
          rating: { type: Number, default: 5, min: 1, max: 5 },
          isActive: { type: Boolean, default: true },
        },
      ],
    },

    // Why Choose Section
    whyChoose: {
      title: { type: String, default: "Why Choose TrusComp?" },
      subtitle: { type: String, default: "Discover what sets us apart" },
      features: [
        {
          title: String,
          description: String,
          icon: String,
        },
      ],
    },

    // FAQ Section
    faqs: {
      badge: { type: String, default: "FAQ'S" },
      title: { type: String, default: "Frequently Asked Questions" },
      subtitle: String,
      description: { type: String, default: "Find answers to common questions about our compliance services." },
      image: String,
      questions: [
        {
          question: { type: String, required: true },
          answer: { type: String, required: true },
          isActive: { type: Boolean, default: true },
        },
      ],
    },

    // CTA Section
    cta: {
      badge: { type: String, default: "READY TO TRANSFORM?" },
      heading: { type: String, default: "Take the First Step" },
      description: { type: String, default: "Join the growing list of satisfied clients who trust TrusComp for their compliance needs. Start your seamless compliance journey today!" },
      buttons: [
        {
          text: String,
          href: String,
          variant: { type: String, enum: ["default", "secondary", "outline"], default: "secondary" },
          icon: String,
        },
      ],
      isDark: { type: Boolean, default: true },
    },
  },
  {
    timestamps: true,
  }
);

const TestimonialsPageSettings = mongoose.model(
  "TestimonialsPageSettings",
  testimonialsPageSchema
);

export default TestimonialsPageSettings;
