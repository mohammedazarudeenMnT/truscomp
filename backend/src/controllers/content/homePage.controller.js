import HomePageSettings from "../../models/content/HomePage.js";
import {
  uploadToCloudinary,
} from "../../utils/cloudinaryHelper.js";

// Get home page settings
export const getHomePageSettings = async (req, res) => {
  try {
    let settings = await HomePageSettings.findOne();

    // Create default settings if none exist
    if (!settings) {
      settings = await HomePageSettings.create({
        hero: {
          sections: [
            {
              title: "Welcome to TrusComp",
              text: "Comprehensive Compliance Solutions",
              description: "Transforming regulatory adherence through innovation and expertise. Guided by Trust, Transparency, and Transformation.",
              buttonText: "Get Started",
              buttonLink: "/contact",
              img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&h=1080&fit=crop&crop=center"
            }
          ]
        },
        whySection: {
          title: "Why Choose TrusComp?",
          subtitle: "Choose TrusComp for effortless, future-ready compliance. Let us handle the complexity, so you can focus on growth!",
          features: [
            {
              icon: "Shield",
              title: "Comprehensive Compliance",
              description: "End-to-end management, risk assessments, and training programs tailored to your needs."
            }
          ],
          stats: [
            {
              number: "100+",
              label: "Trusted Clients",
              className: "bg-primary/5 border-primary/10"
            }
          ],
          trustIndicators: ["Amara Raja", "Blue Star", "Dr. Reddy's", "Ola Electric", "Reckitt Benckiser"]
        },
        faq: {
          badge: "FAQ",
          title: "Frequently Asked Questions",
          description: "Common questions about our compliance management solutions.",
          items: [
            {
              question: "What is compliance management, and why is it important?",
              answer: "Compliance management is the process of ensuring your organization adheres to all relevant laws, regulations, and industry standards."
            }
          ]
        },
        cta: {
          badge: "Ready to Get Started?",
          heading: "Transform Your Compliance Journey Today",
          description: "Join hundreds of businesses that trust TrusComp for seamless, automated compliance management.",
          buttons: [
            {
              text: "Get Started Now",
              href: "/contact",
              variant: "secondary",
              icon: "ArrowRight"
            }
          ]
        }
      });
    }

    res.json({
      success: true,
      data: settings,
    });
  } catch (error) {
    console.error("Error fetching home page settings:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch home page settings",
      error: error.message,
    });
  }
};

// Update hero section
export const updateHero = async (req, res) => {
  try {
    const { sections } = req.body;

    let settings = await HomePageSettings.findOne();
    if (!settings) {
      settings = await HomePageSettings.create({ hero: {} });
    }

    // Handle image uploads for sections
    if (sections && Array.isArray(sections)) {
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        if (section.imageFile) {
          try {
            const result = await uploadToCloudinary(section.imageFile, "home-hero");
            section.img = result.secure_url;
            delete section.imageFile;
          } catch (uploadError) {
            console.error("Image upload failed:", uploadError);
          }
        }
      }
    }

    settings.hero.sections = sections;
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

// Update why section
export const updateWhySection = async (req, res) => {
  try {
    const { title, subtitle, features, stats, trustIndicators } = req.body;

    let settings = await HomePageSettings.findOne();
    if (!settings) {
      settings = await HomePageSettings.create({ whySection: {} });
    }

    settings.whySection = {
      title,
      subtitle,
      features: features || [],
      stats: stats || [],
      trustIndicators: trustIndicators || [],
    };

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
    const { badge, title, subtitle, description, image, items } = req.body;

    let settings = await HomePageSettings.findOne();
    if (!settings) {
      settings = await HomePageSettings.create({ faq: {} });
    }

    // Handle image upload
    if (req.body.imageFile) {
      try {
        const result = await uploadToCloudinary(req.body.imageFile, "home-faq");
        settings.faq.image = result.secure_url;
      } catch (uploadError) {
        console.error("Image upload failed:", uploadError);
      }
    } else if (image) {
      settings.faq.image = image;
    }

    settings.faq = {
      ...settings.faq,
      badge,
      title,
      subtitle,
      description,
      items: items || [],
    };

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

// Update CTA section
export const updateCta = async (req, res) => {
  try {
    const { badge, heading, description, buttons, isDark } = req.body;

    let settings = await HomePageSettings.findOne();
    if (!settings) {
      settings = await HomePageSettings.create({ cta: {} });
    }

    settings.cta = {
      badge,
      heading,
      description,
      buttons: buttons || [],
      isDark: isDark !== undefined ? isDark : true,
    };

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