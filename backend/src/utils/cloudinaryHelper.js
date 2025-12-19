import cloudinary from './cloudinary.js';

/**
 * Uploads a base64 image (or URL) to Cloudinary
 * @param {string} fileStr - Base64 string or URL
 * @param {string} folder - Cloudinary folder name
 * @returns {Promise<{public_id: string, url: string}>}
 */
export const uploadToCloudinary = async (fileStr, folder = 'truscomp') => {
  try {
    if (!fileStr) return null;

    // Check if it's already a Cloudinary URL (no change needed)
    if (fileStr.includes('cloudinary.com')) {
      return null; // Indicates no upload needed
    }

    const result = await cloudinary.uploader.upload(fileStr, {
      folder: folder,
      resource_type: 'auto'
    });

    return {
      public_id: result.public_id,
      url: result.secure_url
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error('Image upload failed');
  }
};

/**
 * Deletes an image from Cloudinary
 * @param {string} publicId - Public ID of the image
 */
export const deleteFromCloudinary = async (publicId) => {
  try {
    if (!publicId) return;
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    // Don't throw here, just log failure (fail safe)
  }
};
