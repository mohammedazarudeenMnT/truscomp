import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  // Better Auth Core Fields
  // Note: 'id' field is managed by Better Auth, not defined in schema
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: false,
    unique: true,
    sparse: true,
    lowercase: true
  },
  emailVerified: {
    type: Boolean,
    default: false
  },
  image: String,
  

  // Admin Plugin Fields
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  banned: {
    type: Boolean,
    default: false
  },
  banReason: String,
  banExpires: Date,
  
  // Status
  isActive: {
    type: Boolean,
    default: true
  },
  
  // Password Reset Fields (Admin only)
  resetPasswordToken: {
    type: String,
    default: null
  },
  resetPasswordExpiry: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

// Indexes for Better Auth
userSchema.index({ email: 1 });

// Use 'user' collection (singular) to match Better Auth
export default mongoose.model('User', userSchema, 'user');
