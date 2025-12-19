import GeneralSettings from '../models/settings/GeneralSettings.js';

export const seedSettings = async () => {
  try {
    // Check if settings already exist
    const existingSettings = await GeneralSettings.findOne({ settingsId: 'global' });
    
    if (existingSettings) {
      console.log('⚙️  Settings already exist');
      return;
    }

    // Create default settings
    const defaultSettings = await GeneralSettings.create({
      settingsId: 'global',
      companyName: 'Truscomp',
      companyEmail: 'info@truscomp.com',
      companyPhone: '+91 1234567890',
      companyAddress: '123 Business Street, City, State, PIN',
      companyDescription: 'A transparent system',
    });

    console.log('✅ Default settings created successfully');
    console.log(`   Company: ${defaultSettings.companyName}`);
    console.log(`   Email: ${defaultSettings.companyEmail}`);
  } catch (error) {
    console.error('❌ Settings seeding error:', error.message);
  }
};
