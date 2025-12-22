import GeneralSettings from "../../models/settings/GeneralSettings.js";
import User from "../../models/auth/User.js";
import nodemailer from "nodemailer";
import { getEmailConfig } from "../../config/utils/sendmail.js";

// Get all settings (General/Email only)
export const getSettings = async (req, res) => {
  try {
    let generalSettings = await GeneralSettings.findOne({
      settingsId: "global",
    });

    // Create default settings if they don't exist
    if (!generalSettings) {
      generalSettings = await GeneralSettings.create({
        settingsId: "global",
        companyName: "Truscomp",
        companyEmail: process.env.ADMIN_EMAIL || "info@truscomp.com",
        companyPhone: "+91 1234567890",
        companyAddress: "123 Business Street, City, State, PIN",
        companyDescription:
          "At TrusComp, we transform complex labor law compliance and regulatory challenges into seamless solutions, empowering businesses to focus on growth and  innovation. With cuttingedge technology, unmatched expertise, and a steadfast commitment to trust, transparency, and transformation, we ensure your compliance needs are met efficiently and effectively.",
        companyLogo: "/images/logo/logo.webp",
      });
    }

    return res.status(200).json({
      success: true,
      data: generalSettings,
    });
  } catch (error) {
    console.error("Get settings error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch settings",
      error: error.message,
    });
  }
};

// Update general settings
export const updateGeneralSettings = async (req, res) => {
  try {
    const {
      companyName,
      companyEmail,
      companyPhone,
      companyAddress,
      companyDescription,
      companyLogo,
    } = req.body;

    // Validate required fields
    if (
      !companyName ||
      !companyEmail ||
      !companyPhone ||
      !companyAddress ||
      !companyDescription
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }



    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(companyEmail)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    let settings = await GeneralSettings.findOne({ settingsId: "global" });

    // Use ADMIN_EMAIL from .env as fallback if no email in DB
    const oldEmail = settings?.companyEmail || process.env.ADMIN_EMAIL;
    const emailChanged = oldEmail && oldEmail !== companyEmail;

    if (!settings) {
      // Create new settings if doesn't exist
      settings = await GeneralSettings.create({
        settingsId: "global",
        companyName,
        companyEmail: emailChanged ? oldEmail : companyEmail, // Don't update email if changed
        companyPhone,
        companyAddress,
        companyDescription,
        companyLogo: companyLogo || null,
        lastUpdatedBy: req.user.id,
      });
    } else {
      // Update existing settings (but NOT email if it changed)
      settings.companyName = companyName;
      // Only update email if it hasn't changed
      if (!emailChanged) {
        settings.companyEmail = companyEmail;
      }
      settings.companyPhone = companyPhone;
      settings.companyAddress = companyAddress;
      settings.companyDescription = companyDescription;
      if (companyLogo !== undefined) {
        settings.companyLogo = companyLogo;
      }

      settings.lastUpdatedBy = req.user.id;

      await settings.save();
    }

    // If email changed, DON'T update immediately - send verification first
    if (emailChanged) {
      console.log(`🔄 Email change requested: ${oldEmail} → ${companyEmail}`);
      
      try {
        // Find the admin user (the one making this request)
        console.log(`🔍 Looking for admin user with id: ${req.user.id}`);
        const adminUser = await User.findById(req.user.id);

        if (!adminUser) {
          console.error(`❌ Admin user not found with id: ${req.user.id}`);
          throw new Error('Admin user not found');
        }

        if (adminUser.role !== "admin") {
          console.error(`❌ User is not an admin: ${adminUser.role}`);
          throw new Error('User is not an admin');
        }

        console.log(`✅ Admin user found: ${adminUser.email}`);

        // Generate a verification token
        const verificationToken = Math.random().toString(36).substring(2, 15) + 
                                 Math.random().toString(36).substring(2, 15);
        
        // Store all email verification data in one save operation
        settings.pendingEmailChange = companyEmail;
        settings.emailVerificationToken = verificationToken;
        settings.emailVerificationExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
        await settings.save();

        console.log(`✅ Token saved: ${verificationToken}`);
        console.log(`📧 Sending verification email via Better Auth...`);
        
        // Use Better Auth's sendVerificationEmail to send verification to NEW email
        try {
          const emailConfig = await getEmailConfig();
          const transporter = nodemailer.createTransport(emailConfig);

          const verificationUrl = `${process.env.BETTER_AUTH_URL}/api/settings/verify-email-change?token=${verificationToken}`;

          const mailOptions = {
            from: emailConfig.from,
            to: companyEmail, // Send to NEW email
            subject: "Verify Your New Admin Email Address",
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #333;">Verify Your New Email Address</h2>
                <p>Hello,</p>
                <p>You requested to change the admin email for <strong>${companyName}</strong> to this email address.</p>
                <p><strong>Current Email:</strong> ${oldEmail}</p>
                <p><strong>New Email:</strong> ${companyEmail}</p>
                <p><strong>Important:</strong> Click the button below to verify this email address and complete the change.</p>
                <div style="text-align: center; margin: 30px 0;">
                  <a href="${verificationUrl}" style="background-color: #4F46E5; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
                    Verify Email Address
                  </a>
                </div>
                <p style="color: #666; font-size: 14px;">Or copy and paste this link into your browser:</p>
                <p style="color: #4F46E5; word-break: break-all; font-size: 12px;">${verificationUrl}</p>
                <p style="color: #999; font-size: 12px; margin-top: 30px;">This link will expire in 24 hours. If you did not request this change, please ignore this email.</p>
                <hr style="border: 1px solid #eee; margin: 20px 0;">
                <p style="color: #666; font-size: 12px;">This is an automated message from ${companyName}.</p>
              </div>
            `,
          };

          await transporter.sendMail(mailOptions);

          console.log(`✅ Verification email sent successfully to: ${companyEmail}`);
          console.log(`⏳ Email will be updated only after verification`);
          
        } catch (emailSendError) {
          console.error(`❌ Failed to send verification email:`, emailSendError.message);
          throw emailSendError;
        }

      } catch (emailError) {
        console.error(`❌ Email verification process failed:`, emailError.message);
        
        // Return with warning but don't fail the settings update
        return res.status(200).json({
          success: true,
          message: "General settings updated successfully, but failed to send verification email.",
          data: settings,
          emailChanged,
          warning: `Failed to send verification email: ${emailError.message}. Please configure email settings in the Email Configuration tab.`,
        });
      }
    }

    return res.status(200).json({
      success: true,
      message: emailChanged
        ? "General settings updated successfully. Verification email sent to new admin email."
        : "General settings updated successfully",
      data: settings,
      emailChanged,
    });
  } catch (error) {
    console.error("Update general settings error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update general settings",
      error: error.message,
    });
  }
};

// Get public settings (for frontend without authentication)
export const getPublicSettings = async (req, res) => {
  try {
    const generalSettings = await GeneralSettings.findOne({ settingsId: "global" }).select(
        "companyName companyEmail companyPhone companyAddress companyDescription companyLogo"
    );

    // Combine all settings or return defaults
    const combinedSettings = {
      companyName: generalSettings?.companyName || "Truscomp",
      companyEmail: generalSettings?.companyEmail || "info@truscomp.com",
      companyPhone: generalSettings?.companyPhone || "+91 1234567890",
      companyAddress:
        generalSettings?.companyAddress ||
        "123 Business Street, City, State, PIN",
      companyDescription:
        generalSettings?.companyDescription ||
        "A transparent, automated MLM system built on Binary + PV earning model",
      companyLogo: generalSettings?.companyLogo || '/images/logo/logo.webp',
    };

    return res.status(200).json({
      success: true,
      data: combinedSettings,
    });
  } catch (error) {
    console.error("Get public settings error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch public settings",
      error: error.message,
    });
  }
};
