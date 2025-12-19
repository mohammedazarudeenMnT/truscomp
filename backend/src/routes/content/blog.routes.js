import express from 'express';
import { requireAdmin } from '../../middleware/auth.middleware.js';
import {
  getBlogPosts,
  getBlogPostBySlug,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost
} from '../../controllers/content/blog.controller.js';

const router = express.Router();

router.get('/', getBlogPosts);
router.get('/slug/:slug', getBlogPostBySlug);
router.post('/', requireAdmin, createBlogPost);
router.get('/:id', requireAdmin, getBlogPostBySlug);
router.put('/:id', requireAdmin, updateBlogPost);
router.delete('/:id', requireAdmin, deleteBlogPost);

export default router;
