import express from 'express';
import { requireAdmin } from '../../middleware/auth.middleware.js';
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory
} from '../../controllers/content/category.controller.js';

const router = express.Router();

// Public routes
router.get('/', getCategories);

// Admin routes
router.post('/', requireAdmin, createCategory);
router.put('/:id', requireAdmin, updateCategory);
router.delete('/:id', requireAdmin, deleteCategory);

export default router;
