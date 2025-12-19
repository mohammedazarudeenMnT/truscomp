import express from 'express';
import { requireAdmin } from '../../middleware/auth.middleware.js';
import {
  getServicesPageSettings,
  updateHero,
  updateWhySection,
  updateFaq
} from '../../controllers/content/servicesPage.controller.js';

const router = express.Router();

// Public route
router.get('/', getServicesPageSettings);

// Admin routes
router.put('/hero', requireAdmin, updateHero);
router.put('/why-section', requireAdmin, updateWhySection);
router.put('/faq', requireAdmin, updateFaq);

export default router;
