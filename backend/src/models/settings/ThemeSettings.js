import mongoose from 'mongoose';

const themeSettingsSchema = new mongoose.Schema({
  primaryColor: {
    type: String,
    default: '#ff9d01'
  },
  // Store exact OKLCH color scale
  primaryScale: {
    50: String,
    100: String,
    200: String,
    300: String,
    400: String,
    500: String,
    600: String,
    700: String,
    800: String,
    900: String,
    950: String,
    1000: String
  }
}, {
  timestamps: true
});

export default mongoose.model('ThemeSettings', themeSettingsSchema);
