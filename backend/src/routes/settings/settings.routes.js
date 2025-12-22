import express from "express";
import { requireAdmin, requireAuth } from "../../middleware/auth.middleware.js";
import {
  getSettings,
  updateGeneralSettings,
} from "../../controllers/settings/settings.controller.js";
import {
  getEmailConfiguration,
  updateEmailConfiguration,
  testEmailConfiguration,
} from "../../controllers/settings/emailConfiguration/emailConfigurationController.js";
import { verifyEmailChange } from "../../controllers/settings/verifyEmailChange.controller.js";

const router = express.Router();

// Email verification route - requires authentication
router.get("/verify-email-change", verifyEmailChange);

// Admin only routes
router.get("/", requireAdmin, getSettings);
router.put("/general", requireAdmin, updateGeneralSettings);

// Public route for getting company logo and basic info
router.get("/public", async (req, res) => {
  try {
    const { getPublicSettings } = await import("../../controllers/settings/settings.controller.js");
    return getPublicSettings(req, res);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch public settings"
    });
  }
});

// Email configuration routes
router.get("/email-configuration", requireAdmin, getEmailConfiguration);
router.post("/email-configuration", requireAdmin, updateEmailConfiguration);
router.put("/email-configuration", requireAdmin, testEmailConfiguration);

export default router;
