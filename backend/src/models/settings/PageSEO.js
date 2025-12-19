import mongoose from 'mongoose';

const pageSEOSchema = new mongoose.Schema({
  pageKey: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  pageName: {
    type: String,
    required: true,
    trim: true
  },
  metaTitle: {
    type: String,
    trim: true
  },
  metaDescription: {
    type: String,
    trim: true
  },
  keywords: {
    type: String,
    trim: true
  },
  ogImage: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

export default mongoose.model('PageSEO', pageSEOSchema);
