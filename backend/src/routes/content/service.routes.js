import express from 'express';
import { requireAdmin } from '../../middleware/auth.middleware.js';
import {
  getServices,
  getServiceBySlug,
  createService,
  updateService,
  deleteService
} from '../../controllers/content/service.controller.js';

const router = express.Router();

router.get('/', getServices);
router.get('/slug/:slug', getServiceBySlug);
router.post('/', requireAdmin, createService);
router.get('/:id', requireAdmin, getServiceBySlug); // ID route after specific routes
router.put('/:id', requireAdmin, updateService);
router.delete('/:id', requireAdmin, deleteService);

export default router;
