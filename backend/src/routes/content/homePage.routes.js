import express from 'express';
import { requireAdmin } from '../../middleware/auth.middleware.js';
import {
  getHomePageSettings,
  updateHero,
  updateWhySection,
  updateFaq,
  updateCta
} from '../../controllers/content/homePage.controller.js';

const router = express.Router();

// Public route
router.get('/', getHomePageSettings);

// Admin routes
router.put('/hero', requireAdmin, updateHero);
router.put('/why-section', requireAdmin, updateWhySection);
router.put('/faq', requireAdmin, updateFaq);
router.put('/cta', requireAdmin, updateCta);

export default router;