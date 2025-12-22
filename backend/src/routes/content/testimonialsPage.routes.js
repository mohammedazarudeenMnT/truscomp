import express from 'express';
import { requireAdmin } from '../../middleware/auth.middleware.js';
import {
  getTestimonialsPageSettings,
  updateHero,
  updateTestimonials,
  updateWhyChoose,
  updateFaq,
  updateCta
} from '../../controllers/content/testimonialsPage.controller.js';

const router = express.Router();

// Public routes
router.get('/', getTestimonialsPageSettings);

// Admin routes - organized by section
router.put('/hero', requireAdmin, updateHero);
router.put('/testimonials', requireAdmin, updateTestimonials);
router.put('/why-choose', requireAdmin, updateWhyChoose);
router.put('/faq', requireAdmin, updateFaq);
router.put('/cta', requireAdmin, updateCta);

export default router;
