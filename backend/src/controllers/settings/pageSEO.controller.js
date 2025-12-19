import PageSEO from '../../models/settings/PageSEO.js';

// Get SEO settings for a page
export const getPageSEO = async (req, res) => {
  try {
    const { pageKey } = req.params;
    let seo = await PageSEO.findOne({ pageKey });

    // Return empty object if not found (for public API)
    if (!seo) {
      return res.status(200).json({
        success: true,
        data: null
      });
    }

    return res.status(200).json({
      success: true,
      data: seo
    });
  } catch (error) {
    console.error('Get page SEO error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch page SEO'
    });
  }
};

// Get all page SEO settings (Admin)
export const getAllPageSEO = async (req, res) => {
  try {
    const pages = await PageSEO.find().sort({ pageName: 1 });
    return res.status(200).json({
      success: true,
      data: pages
    });
  } catch (error) {
    console.error('Get all page SEO error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch page SEO settings'
    });
  }
};

// Create or update page SEO (Admin)
export const upsertPageSEO = async (req, res) => {
  try {
    const { pageKey, pageName, metaTitle, metaDescription, keywords, ogImage } = req.body;

    if (!pageKey || !pageName) {
      return res.status(400).json({
        success: false,
        message: 'pageKey and pageName are required'
      });
    }

    const seo = await PageSEO.findOneAndUpdate(
      { pageKey },
      { pageKey, pageName, metaTitle, metaDescription, keywords, ogImage },
      { upsert: true, new: true }
    );

    return res.status(200).json({
      success: true,
      message: 'Page SEO updated successfully',
      data: seo
    });
  } catch (error) {
    console.error('Upsert page SEO error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update page SEO'
    });
  }
};

// Delete page SEO (Admin)
export const deletePageSEO = async (req, res) => {
  try {
    const { pageKey } = req.params;
    await PageSEO.findOneAndDelete({ pageKey });

    return res.status(200).json({
      success: true,
      message: 'Page SEO deleted successfully'
    });
  } catch (error) {
    console.error('Delete page SEO error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete page SEO'
    });
  }
};
