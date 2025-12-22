import TestimonialsPageSettings from "../../models/content/TestimonialsPage.js";
import {
  uploadToCloudinary,
  deleteFromCloudinary,
} from "../../utils/cloudinaryHelper.js";

// Get testimonials page settings
export const getTestimonialsPageSettings = async (req, res) => {
  try {
    let settings = await TestimonialsPageSettings.findOne({ pageKey: "client-testimonials" });

    // Create default settings if none exist
    if (!settings) {
      settings = await TestimonialsPageSettings.create({
        pageKey: "client-testimonials",
        pageName: "Client Testimonials",
        hero: {
          badgeText: "Testimonials",
          title: "Trusted by leaders from various industries",
          description: "Learn why professionals trust our solutions to complete their customer journeys.",
          ctaText: "Read Success Stories",
          ctaHref: "#testimonials",
          testimonialImages: Array.from({ length: 15 }, (_, i) => ({
            imgSrc: `https://i.pravatar.cc/150?img=${i + 1}`,
            alt: `Client ${i + 1}`,
          })),
        },
        testimonials: {
          title: "What Our Clients Say",
          subtitle: "Real stories from businesses transformed by our compliance solutions",
          reviews: [],
        },
        whyChoose: {
          title: "Why Choose TrusComp?",
          subtitle: "Discover what sets us apart",
          features: [],
        },
        faqs: {
          badge: "FAQ'S",
          title: "Frequently Asked Questions",
          description: "Find answers to common questions about our compliance services.",
          questions: [],
        },
        cta: {
          badge: "READY TO TRANSFORM?",
          heading: "Take the First Step",
          description: "Join the growing list of satisfied clients who trust TrusComp for their compliance needs. Start your seamless compliance journey today!",
          buttons: [
            {
              text: "Schedule a Free Consultation",
              href: "/contact",
              variant: "secondary",
            },
            {
              text: "Request a Demo",
              href: "/contact",
              variant: "outline",
            },
          ],
          isDark: true,
        },
      });
    }

    res.json({
      success: true,
      data: settings,
    });
  } catch (error) {
    console.error("Error fetching testimonials page settings:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch testimonials page settings",
      error: error.message,
    });
  }
};

// Update Hero Section
export const updateHero = async (req, res) => {
  try {
    const settings = await TestimonialsPageSettings.findOne({ pageKey: "client-testimonials" });
    if (!settings) {
      return res.status(404).json({
        success: false,
        message: "Testimonials page settings not found",
      });
    }

    settings.hero = { ...settings.hero, ...req.body };
    await settings.save();

    res.json({
      success: true,
      message: "Hero section updated successfully",
      data: settings,
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

// Update Testimonials Section
export const updateTestimonials = async (req, res) => {
  try {
    const settings = await TestimonialsPageSettings.findOne({ pageKey: "client-testimonials" });
    if (!settings) {
      return res.status(404).json({
        success: false,
        message: "Testimonials page settings not found",
      });
    }

    settings.testimonials = { ...settings.testimonials, ...req.body };
    await settings.save();

    res.json({
      success: true,
      message: "Testimonials section updated successfully",
      data: settings,
    });
  } catch (error) {
    console.error("Error updating testimonials section:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update testimonials section",
      error: error.message,
    });
  }
};

// Update Why Choose Section
export const updateWhyChoose = async (req, res) => {
  try {
    const settings = await TestimonialsPageSettings.findOne({ pageKey: "client-testimonials" });
    if (!settings) {
      return res.status(404).json({
        success: false,
        message: "Testimonials page settings not found",
      });
    }

    settings.whyChoose = { ...settings.whyChoose, ...req.body };
    await settings.save();

    res.json({
      success: true,
      message: "Why Choose section updated successfully",
      data: settings,
    });
  } catch (error) {
    console.error("Error updating why choose section:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update why choose section",
      error: error.message,
    });
  }
};

// Update FAQ Section
export const updateFaq = async (req, res) => {
  try {
    const settings = await TestimonialsPageSettings.findOne({ pageKey: "client-testimonials" });
    if (!settings) {
      return res.status(404).json({
        success: false,
        message: "Testimonials page settings not found",
      });
    }

    settings.faqs = { ...settings.faqs, ...req.body };
    await settings.save();

    res.json({
      success: true,
      message: "FAQ section updated successfully",
      data: settings,
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

// Update CTA Section
export const updateCta = async (req, res) => {
  try {
    const settings = await TestimonialsPageSettings.findOne({ pageKey: "client-testimonials" });
    if (!settings) {
      return res.status(404).json({
        success: false,
        message: "Testimonials page settings not found",
      });
    }

    settings.cta = { ...settings.cta, ...req.body };
    await settings.save();

    res.json({
      success: true,
      message: "CTA section updated successfully",
      data: settings,
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
