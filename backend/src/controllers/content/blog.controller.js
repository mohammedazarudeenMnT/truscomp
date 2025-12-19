import BlogPost from '../../models/content/BlogPost.js';
import Category from '../../models/content/Category.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../../utils/cloudinaryHelper.js';

// Get all blog posts with pagination, search, and category filter
export const getBlogPosts = async (req, res) => {
  try {
    const isAdmin = req.user && req.user.role === 'admin';
    const { page, limit, search = '', category = '' } = req.query;
    
    // Build query - only published posts for non-admin
    const query = isAdmin ? {} : { status: 'published' };
    
    // Add category filter if provided
    if (category) {
      query.category = category;
    }
    
    // Add search if provided
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { subtitle: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    // If pagination params are provided (admin dashboard)
    if (page && limit) {
      const pageNum = parseInt(page);
      const limitNum = parseInt(limit);
      const skip = (pageNum - 1) * limitNum;
      
      const total = await BlogPost.countDocuments(query);
      const posts = await BlogPost.find(query)
        .sort({ publishedAt: -1, createdAt: -1 })
        .skip(skip)
        .limit(limitNum);
      
      return res.status(200).json({
        success: true,
        data: posts,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          totalPages: Math.ceil(total / limitNum)
        }
      });
    }
    
    // No pagination - return all matching posts (for public pages)
    const posts = await BlogPost.find(query)
      .sort({ publishedAt: -1, createdAt: -1 });
    
    return res.status(200).json({
      success: true,
      data: posts
    });
  } catch (error) {
    console.error('Get blog posts error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch blog posts'
    });
  }
};

// Get single post by slug or ID
export const getBlogPostBySlug = async (req, res) => {
  try {
    const { slug, id } = req.params;
    const identifier = slug || id;
    const isAdmin = req.user && req.user.role === 'admin';
    
    let post;
    if (identifier.match(/^[0-9a-fA-F]{24}$/)) {
      post = await BlogPost.findById(identifier);
    } else {
      const query = isAdmin ? { slug: identifier } : { slug: identifier, status: 'published' };
      post = await BlogPost.findOne(query);
    }

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    return res.status(200).json({
      success: true,
      data: post
    });
  } catch (error) {
    console.error('Get blog post error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch blog post'
    });
  }
};

// Create new blog post
export const createBlogPost = async (req, res) => {
  try {
    const { 
      title, 
      subtitle, 
      description, 
      content, 
      category, 
      tags, 
      featuredImage, 
      status, 
      isFeatured
    } = req.body;

    // Validate required fields
    if (!title || !content || !category) {
      return res.status(400).json({
        success: false,
        message: 'Title, content, and category are required'
      });
    }

    // Check if category exists, if not create it
    let categoryDoc = await Category.findOne({ name: category });
    if (!categoryDoc) {
      categoryDoc = await Category.create({ name: category });
    }

    // Handle image upload
    let imageData = null;
    if (featuredImage && !featuredImage.includes('cloudinary.com')) {
      const uploadResult = await uploadToCloudinary(featuredImage, 'truscomp/blog');
      if (uploadResult) {
        imageData = uploadResult;
      }
    } else if (featuredImage) {
      // Image already uploaded, just store the URL
      imageData = { url: featuredImage };
    }

    // Process tags
    const processedTags = tags 
      ? (Array.isArray(tags) ? tags : tags.split(',').map(t => t.trim()).filter(Boolean))
      : [];

    // Create blog post
    const newPost = await BlogPost.create({
      title,
      subtitle: subtitle || '',
      description: description || '',
      content,
      category,
      tags: processedTags,
      featuredImage: imageData,
      status: status || 'draft',
      isFeatured: isFeatured || false,
      publishedAt: status === 'published' ? new Date() : undefined
    });

    return res.status(201).json({
      success: true,
      message: 'Blog post created successfully',
      data: newPost
    });
  } catch (error) {
    console.error('Create blog post error:', error);
    
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'A blog post with this title already exists'
      });
    }
    
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to create blog post'
    });
  }
};

// Update blog post
export const updateBlogPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      title, 
      subtitle, 
      description, 
      content, 
      category, 
      tags, 
      featuredImage, 
      status, 
      isFeatured
    } = req.body;

    // Find post
    let post = await BlogPost.findById(id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    const oldCategory = post.category;

    // Handle image update
    if (featuredImage && !featuredImage.includes('cloudinary.com')) {
      // New image upload
      if (post.featuredImage?.public_id) {
        await deleteFromCloudinary(post.featuredImage.public_id);
      }
      const uploadResult = await uploadToCloudinary(featuredImage, 'truscomp/blog');
      if (uploadResult) {
        post.featuredImage = uploadResult;
      }
    } else if (featuredImage === null) {
      // Remove image
      if (post.featuredImage?.public_id) {
        await deleteFromCloudinary(post.featuredImage.public_id);
      }
      post.featuredImage = undefined;
    }

    // Force regenerate slug if title changed
    if (title && title !== post.title) {
      post.slug = undefined;
    }

    // Update fields
    if (title) post.title = title;
    if (subtitle !== undefined) post.subtitle = subtitle;
    if (description !== undefined) post.description = description;
    if (content) post.content = content;
    
    // Handle category change
    if (category && category !== oldCategory) {
      // Check if new category exists, if not create it
      let categoryDoc = await Category.findOne({ name: category });
      if (!categoryDoc) {
        categoryDoc = await Category.create({ name: category });
      }
      post.category = category;
    }
    
    // Process tags
    if (tags !== undefined) {
      post.tags = tags 
        ? (Array.isArray(tags) ? tags : tags.split(',').map(t => t.trim()).filter(Boolean))
        : [];
    }
    
    // Handle status change
    if (status && status !== post.status) {
      post.status = status;
      if (status === 'published' && !post.publishedAt) {
        post.publishedAt = new Date();
      }
    }
    
    if (isFeatured !== undefined) {
      post.isFeatured = isFeatured;
    }

    await post.save();

    return res.status(200).json({
      success: true,
      message: 'Blog post updated successfully',
      data: post
    });
  } catch (error) {
    console.error('Update blog post error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to update blog post'
    });
  }
};

// Delete blog post
export const deleteBlogPost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await BlogPost.findById(id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    // Delete image from cloudinary
    if (post.featuredImage?.public_id) {
      await deleteFromCloudinary(post.featuredImage.public_id);
    }

    await post.deleteOne();

    return res.status(200).json({
      success: true,
      message: 'Blog post deleted successfully'
    });
  } catch (error) {
    console.error('Delete blog post error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete blog post'
    });
  }
};
