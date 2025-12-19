import express from 'express';
import { requireAdmin } from '../../middleware/auth.middleware.js';
import {
  getPageSEO,
  getAllPageSEO,
  upsertPageSEO,
  deletePageSEO
} from '../../controllers/settings/pageSEO.controller.js';

const router = express.Router();

router.get('/', requireAdmin, getAllPageSEO);
router.get('/:pageKey', getPageSEO);
router.post('/', requireAdmin, upsertPageSEO);
router.delete('/:pageKey', requireAdmin, deletePageSEO);

export default router;
