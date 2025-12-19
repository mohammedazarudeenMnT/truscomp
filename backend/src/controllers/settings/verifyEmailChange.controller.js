import GeneralSettings from "../../models/settings/GeneralSettings.js";
import User from "../../models/auth/User.js";

/**
 * Verify email change and update admin user's email
 * This endpoint is called when admin clicks the verification link
 */
export const verifyEmailChange = async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Verification token is required",
      });
    }

    console.log(`🔍 Verifying email change with token: ${token}`);

    // First, check if settings exist at all
    const allSettings = await GeneralSettings.findOne({ settingsId: "global" });
    console.log(`📋 Current settings token: ${allSettings?.emailVerificationToken}`);
    console.log(`📋 Pending email: ${allSettings?.pendingEmailChange}`);

    // Find settings with this verification token
    const settings = await GeneralSettings.findOne({
      settingsId: "global",
      emailVerificationToken: token,
    });

    if (!settings) {
      console.error(`❌ Invalid verification token`);
      console.error(`❌ Expected: ${token}`);
      console.error(`❌ Found in DB: ${allSettings?.emailVerificationToken}`);
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification token",
      });
    }

    // Check if token has expired
    if (
      !settings.emailVerificationExpiry ||
      new Date() > settings.emailVerificationExpiry
    ) {
      console.error(`❌ Verification token expired`);
      return res.status(400).json({
        success: false,
        message:
          "Verification token has expired. Please request a new email change.",
      });
    }

    // Check if there's a pending email change
    if (!settings.pendingEmailChange) {
      console.error(`❌ No pending email change found`);
      return res.status(400).json({
        success: false,
        message: "No pending email change found",
      });
    }

    const newEmail = settings.pendingEmailChange;
    const oldEmail = settings.companyEmail;

    console.log(`✅ Token verified. Updating email: ${oldEmail} → ${newEmail}`);

    // Find the admin user who initiated this change (stored in lastUpdatedBy)
    let adminUser = null;

    if (settings.lastUpdatedBy) {
      adminUser = await User.findById(settings.lastUpdatedBy);
      console.log(`🔍 Found admin user by lastUpdatedBy: ${adminUser?.email}`);
    }

    // Fallback: try to find by old email
    if (!adminUser) {
      adminUser = await User.findOne({ email: oldEmail, role: "admin" });
      console.log(`🔍 Found admin user by old email: ${adminUser?.email}`);
    }

    // Fallback: find any admin user
    if (!adminUser) {
      adminUser = await User.findOne({ role: "admin" });
      console.log(`🔍 Found first admin user: ${adminUser?.email}`);
    }

    if (!adminUser) {
      console.error(`❌ No admin user found in the system`);
      return res.status(404).json({
        success: false,
        message: "Admin user not found",
      });
    }

    // Update user email and mark as verified
    const previousEmail = adminUser.email;
    adminUser.email = newEmail;
    adminUser.emailVerified = true;
    await adminUser.save();

    console.log(`✅ Admin user email updated: ${previousEmail} → ${newEmail}`);

    // Update company email in settings
    settings.companyEmail = newEmail;
    settings.pendingEmailChange = null;
    settings.emailVerificationToken = null;
    settings.emailVerificationExpiry = null;
    await settings.save();

    console.log(`✅ Company email updated in settings`);

    // Return HTML success page
    return res.status(200).send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verified Successfully</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
          }
          .container {
            background: white;
            border-radius: 16px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            max-width: 500px;
            width: 100%;
            padding: 40px;
            text-align: center;
          }
          .success-icon {
            width: 80px;
            height: 80px;
            background: #10b981;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 24px;
          }
          .success-icon svg {
            width: 48px;
            height: 48px;
            color: white;
          }
          h1 {
            color: #1f2937;
            font-size: 28px;
            margin-bottom: 16px;
          }
          p {
            color: #6b7280;
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 12px;
          }
          .email-info {
            background: #f3f4f6;
            border-radius: 8px;
            padding: 16px;
            margin: 24px 0;
          }
          .email-info p {
            margin: 8px 0;
            font-size: 14px;
          }
          .email-info strong {
            color: #1f2937;
          }
          .btn {
            display: inline-block;
            background: #4f46e5;
            color: white;
            padding: 12px 32px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            margin-top: 24px;
            transition: background 0.3s;
          }
          .btn:hover {
            background: #4338ca;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="success-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h1>Email Verified Successfully!</h1>
          <p>Your admin email has been updated and verified.</p>
          <div class="email-info">
            <p><strong>Previous Email:</strong> ${previousEmail}</p>
            <p><strong>New Email:</strong> ${newEmail}</p>
          </div>
          <p>You can now login with your new email address.</p>
          <a href="${
            process.env.FRONTEND_URL || "http://localhost:3000"
          }/login" class="btn">
            Go to Login
          </a>
        </div>
      </body>
      </html>
    `);
  } catch (error) {
    console.error("Verify email change error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to verify email change",
      error: error.message,
    });
  }
};
