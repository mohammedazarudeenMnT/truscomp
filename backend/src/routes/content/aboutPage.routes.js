import express from 'express';
import { requireAdmin } from '../../middleware/auth.middleware.js';
import {
  getAboutPageSettings,
  getAllAboutPages,
  updateHero,
  updateFounders,
  updateLeadership,
  updateImpact,
  updateWhySection,
  updateFeatures,
  updateBenefits,
  updateWhy,
  updateTimeline,
  updateVisionMission,
  updateValues,
  updateLegacy,
  updateFaq,
  updateCta
} from '../../controllers/content/aboutPage.controller.js';

const router = express.Router();

// Public routes
router.get('/', getAllAboutPages);
router.get('/:pageKey', getAboutPageSettings);

// Admin routes - organized by section
router.put('/:pageKey/hero', requireAdmin, updateHero);
router.put('/:pageKey/founders', requireAdmin, updateFounders);
router.put('/:pageKey/leadership', requireAdmin, updateLeadership);
router.put('/:pageKey/impact', requireAdmin, updateImpact);
router.put('/:pageKey/why-section', requireAdmin, updateWhySection);
router.put('/:pageKey/why', requireAdmin, updateWhy);
router.put('/:pageKey/features', requireAdmin, updateFeatures);
router.put('/:pageKey/benefits', requireAdmin, updateBenefits);
router.put('/:pageKey/timeline', requireAdmin, updateTimeline);
router.put('/:pageKey/vision-mission', requireAdmin, updateVisionMission);
router.put('/:pageKey/values', requireAdmin, updateValues);
router.put('/:pageKey/legacy', requireAdmin, updateLegacy);
router.put('/:pageKey/faq', requireAdmin, updateFaq);
router.put('/:pageKey/cta', requireAdmin, updateCta);

export default router;