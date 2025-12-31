import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { admin } from "better-auth/plugins";
import mongoose from "mongoose";
import { sendEmail } from "../config/utils/sendmail.js";

let authInstance = null;

export const initAuth = () => {
  if (authInstance) return authInstance;

  authInstance = betterAuth({
    database: mongodbAdapter(mongoose.connection.getClient().db("truscomp")),

    session: {
      expiresIn: 60 * 60 * 24 * 7, // 7 days
      updateAge: 60 * 60 * 24, // Only update session once per day (reduces DB writes)
      cookieCache: {
        enabled: true,
        maxAge: 5 * 60, // Cache for 5 minutes
      },
    },

    emailAndPassword: {
      enabled: true,
      minPasswordLength: 6,
      maxPasswordLength: 128,
      resetPasswordTokenExpiresIn: 3600, // 1 hour
      sendResetPassword: async ({ user, url, token }, request) => {
        console.log(`📧 Password reset requested for: ${user.email}`);
        console.log(`🔗 Reset URL: ${url}`);

        // Only allow password reset for admin users
        if (user.role !== "admin") {
          console.log(
            `⚠️ Password reset denied: User ${user.email} is not an admin`
          );
          return; // Don't send email for non-admin users
        }

        // Send email using our email configuration
        try {
          const emailHtml = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Reset Your Password</h2>
            <p>Hello ${user.name || user.username},</p>
            <p>Click the button below to reset your password:</p>
            <a href="${url}" style="display: inline-block; background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 20px 0;">
              Reset Password
            </a>
            <p>Or copy this link: ${url}</p>
            <p>This link will expire in 1 hour.</p>
            <p>If you didn't request this, please ignore this email.</p>
          </div>
        `;

          await sendEmail(user.email, "Reset Your Password", emailHtml);

          console.log(`✅ Password reset email sent to: ${user.email}`);
        } catch (error) {
          console.error(`❌ Failed to send reset email:`, error);
        }
      },
    },

    plugins: [
      admin({
        // Admin user IDs will be set after seeding
        adminUserIds: [],
      }),
    ],

    emailVerification: {
      sendVerificationEmail: async ({ user, url, token }) => {
        console.log(`📧 Sending verification email to: ${user.email}`);
        console.log(`🔗 Verification URL: ${url}`);
        // Email sending will be handled by the settings controller
        // This is just to enable the verification feature
      },
      autoSignInAfterVerification: true,
    },

    user: {
      changeEmail: {
        enabled: true,
        updateEmailWithoutVerification: false,
      },
      additionalFields: {
        isActive: {
          type: "boolean",
          required: false,
          defaultValue: true,
        },
      },
    },

    secret: process.env.BETTER_AUTH_SECRET,
    baseURL: process.env.BETTER_AUTH_URL,

    trustedOrigins: [
      process.env.FRONTEND_URL,
      "https://kk5n0x75-3000.inc1.devtunnels.ms",
      "https://kk5n0x75-3001.inc1.devtunnels.ms",
    ],
  });

  return authInstance;
};

export const getAuth = () => {
  if (!authInstance) {
    throw new Error("Auth not initialized. Call initAuth() first.");
  }
  return authInstance;
};

// For backward compatibility
export const auth = new Proxy(
  {},
  {
    get(target, prop) {
      return getAuth()[prop];
    },
  }
);
