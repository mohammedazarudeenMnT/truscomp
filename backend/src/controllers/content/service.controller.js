import Service from '../../models/content/Service.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../../utils/cloudinaryHelper.js';

// Get all services with pagination and search
export const getServices = async (req, res) => {
  try {
    const isAdmin = req.user && req.user.role === 'admin';
    const { page, limit, search = '' } = req.query;
    
    // Build query - only active services for non-admin
    const query = isAdmin ? {} : { isActive: true };
    
    // Add search if provided
    if (search) {
      query.$or = [
        { heroTitle: { $regex: search, $options: 'i' } },
        { heroDescription: { $regex: search, $options: 'i' } },
        { slug: { $regex: search, $options: 'i' } }
      ];
    }
    
    // If pagination params are provided (admin dashboard)
    if (page && limit) {
      const pageNum = parseInt(page);
      const limitNum = parseInt(limit);
      const skip = (pageNum - 1) * limitNum;
      
      const total = await Service.countDocuments(query);
      const services = await Service.find(query)
        .sort({ order: 1, createdAt: -1 })
        .skip(skip)
        .limit(limitNum);
      
      return res.status(200).json({
        success: true,
        data: services,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          totalPages: Math.ceil(total / limitNum)
        }
      });
    }
    
    // No pagination - return all matching services (for public pages)
    const services = await Service.find(query)
      .sort({ order: 1, createdAt: -1 });
    
    return res.status(200).json({
      success: true,
      data: services
    });
  } catch (error) {
    console.error('Get services error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch services'
    });
  }
};

// Get single service by slug or ID
export const getServiceBySlug = async (req, res) => {
  try {
    const { slug, id } = req.params;
    const identifier = slug || id; // Handle both slug and id parameters
    const isAdmin = req.user && req.user.role === 'admin';
    
    let service;
    if (identifier.match(/^[0-9a-fA-F]{24}$/)) {
      service = await Service.findById(identifier);
    } else {
      const query = isAdmin ? { slug: identifier } : { slug: identifier, isActive: true };
      service = await Service.findOne(query);
    }

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    return res.status(200).json({
      success: true,
      data: service
    });
  } catch (error) {
    console.error('Get service error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch service'
    });
  }
};

// Create new service
export const createService = async (req, res) => {
  try {
    const { 
      heroTitle,
      heroDescription,
      heroImage,
      heroButtonText,
      keyFeatures,
      benefits,
      whyChoose,
      faqs,
      cta,
      isActive, 
      order
    } = req.body;

    if (!heroTitle || !heroDescription) {
      return res.status(400).json({
        success: false,
        message: 'Please provide required fields: heroTitle and heroDescription'
      });
    }

    // Handle hero image upload
    let heroImageUrl = heroImage;
    if (heroImage && typeof heroImage === 'string' && !heroImage.includes('cloudinary.com')) {
      const uploadResult = await uploadToCloudinary(heroImage, 'truscomp/services/hero');
      if (uploadResult) {
        heroImageUrl = uploadResult.url; // Save only URL
      }
    }

    const service = await Service.create({
      heroTitle,
      heroDescription,
      heroImage: heroImageUrl,
      heroButtonText: heroButtonText || 'Get Started',
      keyFeatures: keyFeatures || [],
      benefits: benefits || [],
      whyChoose: whyChoose || [],
      faqs: faqs || [],
      cta: cta || {},
      isActive: isActive !== undefined ? isActive : true,
      order: order || 0
    });

    return res.status(201).json({
      success: true,
      message: 'Service created successfully',
      data: service
    });
  } catch (error) {
    console.error('Create service error:', error);
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Service with this slug already exists'
      });
    }
    return res.status(500).json({
      success: false,
      message: 'Failed to create service'
    });
  }
};

// Update service
export const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      heroTitle,
      heroDescription,
      heroImage,
      heroButtonText,
      keyFeatures,
      benefits,
      whyChoose,
      faqs,
      cta,
      isActive,
      order
    } = req.body;

    let service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    // Force regenerate slug if heroTitle changed
    if (heroTitle && heroTitle !== service.heroTitle) {
      service.slug = undefined;
    }

    // Handle hero image update
    if (heroImage && typeof heroImage === 'string' && !heroImage.includes('cloudinary.com')) {
      const uploadResult = await uploadToCloudinary(heroImage, 'truscomp/services/hero');
      if (uploadResult) {
        service.heroImage = uploadResult.url; // Save only URL
      }
    } else if (heroImage) {
      service.heroImage = heroImage; // Already a URL
    }

    // Update fields
    if (heroTitle) service.heroTitle = heroTitle;
    if (heroDescription) service.heroDescription = heroDescription;
    if (heroButtonText) service.heroButtonText = heroButtonText;
    if (keyFeatures) service.keyFeatures = keyFeatures;
    if (benefits) service.benefits = benefits;
    if (whyChoose) service.whyChoose = whyChoose;
    if (faqs) service.faqs = faqs;
    if (cta) service.cta = cta;
    if (isActive !== undefined) service.isActive = isActive;
    if (order !== undefined) service.order = order;

    await service.save();

    return res.status(200).json({
      success: true,
      message: 'Service updated successfully',
      data: service
    });
  } catch (error) {
    console.error('Update service error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update service'
    });
  }
};

// Delete service
export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findById(id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    // Note: We only store URLs now, so no Cloudinary deletion needed
    // Images remain in Cloudinary for CDN benefits

    await service.deleteOne();

    return res.status(200).json({
      success: true,
      message: 'Service deleted successfully'
    });
  } catch (error) {
    console.error('Delete service error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete service'
    });
  }
};
