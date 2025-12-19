import mongoose from 'mongoose';

const emailConfigurationSchema = new mongoose.Schema({
  smtpHost: {
    type: String,
    required: true,
    default: 'smtp.gmail.com'
  },
  smtpPort: {
    type: String,
    required: true,
    default: '587'
  },
  smtpUsername: {
    type: String, // Allow empty for unauthenticated SMTP (rare but possible)
  },
  smtpPassword: {
    type: String, // Encrypted
  },
  senderEmail: {
    type: String,
    required: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('EmailConfiguration', emailConfigurationSchema);
