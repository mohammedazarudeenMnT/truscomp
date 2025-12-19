import ServicesPageSettings from "../../models/content/ServicesPage.js";
import {
  uploadToCloudinary,
  deleteFromCloudinary,
} from "../../utils/cloudinaryHelper.js";

// Get services page settings
export const getServicesPageSettings = async (req, res) => {
  try {
    let settings = await ServicesPageSettings.findOne();

    // Create default settings if none exist
    if (!settings) {
      settings = await ServicesPageSettings.create({
        hero: {
          title: "TrusComp Compliance Solutions",
          subtitle:
            "Comprehensive compliance management solutions designed to streamline your operations",
          primaryButtonText: "Explore Services",
          secondaryButtonText: "Contact Us",
        },
        whySection: {
          title: "Why Choose TrusComp?",
          subtitle: "Experience the TrusComp advantage",
          features: [],
        },
        faq: {
          title: "Frequently Asked Questions",
          description: "Find answers to common questions about our services",
          items: [],
        },
      });
    }

    return res.status(200).json({
      success: true,
      data: settings,
    });
  } catch (error) {
    console.error("Get services page settings error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch services page settings",
    });
  }
};

// Update hero section
export const updateHero = async (req, res) => {
  try {
    const {
      title,
      subtitle,
      backgroundImage,
      primaryButtonText,
      secondaryButtonText,
    } = req.body;

    let settings = await ServicesPageSettings.findOne();
    if (!settings) {
      settings = await ServicesPageSettings.create({ hero: {} });
    }

    // Handle background image upload
    if (
      backgroundImage &&
      typeof backgroundImage === "string" &&
      !backgroundImage.includes("cloudinary.com")
    ) {
      const uploadResult = await uploadToCloudinary(
        backgroundImage,
        "truscomp/services/hero"
      );
      if (uploadResult) {
        settings.hero.backgroundImage = uploadResult.url; // Save only URL
      }
    } else if (backgroundImage) {
      settings.hero.backgroundImage = backgroundImage; // Already a URL
    }

    // Update hero fields
    if (title) settings.hero.title = title;
    if (subtitle) settings.hero.subtitle = subtitle;
    if (primaryButtonText) settings.hero.primaryButtonText = primaryButtonText;
    if (secondaryButtonText)
      settings.hero.secondaryButtonText = secondaryButtonText;

    await settings.save();

    return res.status(200).json({
      success: true,
      message: "Hero section updated successfully",
      data: settings,
    });
  } catch (error) {
    console.error("Update hero error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update hero section",
    });
  }
};

// Update why section
export const updateWhySection = async (req, res) => {
  try {
    const { title, subtitle, features } = req.body;

    let settings = await ServicesPageSettings.findOne();
    if (!settings) {
      settings = await ServicesPageSettings.create({ whySection: {} });
    }

    // Update why section fields
    if (title) settings.whySection.title = title;
    if (subtitle) settings.whySection.subtitle = subtitle;
    if (features) settings.whySection.features = features;

    await settings.save();

    return res.status(200).json({
      success: true,
      message: "Why section updated successfully",
      data: settings,
    });
  } catch (error) {
    console.error("Update why section error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update why section",
    });
  }
};

// Update FAQ section
export const updateFaq = async (req, res) => {
  try {
    const { title, description, items } = req.body;

    let settings = await ServicesPageSettings.findOne();
    if (!settings) {
      settings = await ServicesPageSettings.create({ faq: {} });
    }

    // Update FAQ fields
    if (title) settings.faq.title = title;
    if (description) settings.faq.description = description;
    if (items) settings.faq.items = items;

    await settings.save();

    return res.status(200).json({
      success: true,
      message: "FAQ section updated successfully",
      data: settings,
    });
  } catch (error) {
    console.error("Update FAQ error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update FAQ section",
    });
  }
};
