import express from 'express';
import { requireAdmin } from '../../middleware/auth.middleware.js';
import {
  getThemeSettings,
  updateThemeSettings
} from '../../controllers/settings/themeSettings.controller.js';

const router = express.Router();

// Public route
router.get('/', getThemeSettings);

// Admin route
router.put('/', requireAdmin, updateThemeSettings);

export default router;
