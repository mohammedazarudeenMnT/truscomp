import crypto from "crypto";
import EmailConfiguration from "../models/settings/emailConfigurationSchema.js";

// Simple encryption for SMTP password
const ENCRYPTION_KEY =
  process.env.BETTER_AUTH_SECRET || "default-encryption-key-change-this";
const ALGORITHM = "aes-256-cbc";

/**
 * Encrypt SMTP password
 */
export function encryptPassword(password) {
  try {
    // Create a key from the secret (must be 32 bytes for aes-256)
    const key = crypto.createHash("sha256").update(ENCRYPTION_KEY).digest();
    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
    let encrypted = cipher.update(password, "utf8", "hex");
    encrypted += cipher.final("hex");

    // Return iv + encrypted data
    return iv.toString("hex") + ":" + encrypted;
  } catch (error) {
    console.error("Encryption error:", error);
    return password; // Fallback to plain text if encryption fails
  }
}

/**
 * Decrypt SMTP password
 */
export function decryptPassword(encryptedPassword) {
  try {
    if (!encryptedPassword || !encryptedPassword.includes(":")) {
      return encryptedPassword; // Return as-is if not encrypted
    }

    const key = crypto.createHash("sha256").update(ENCRYPTION_KEY).digest();
    const parts = encryptedPassword.split(":");
    const iv = Buffer.from(parts[0], "hex");
    const encrypted = parts[1];

    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
    let decrypted = decipher.update(encrypted, "hex", "utf8");
    decrypted += decipher.final("utf8");

    return decrypted;
  } catch (error) {
    console.error("Decryption error:", error);
    return encryptedPassword; // Return as-is if decryption fails
  }
}

/**
 * Seed default email configuration from .env
 */
export async function seedEmailConfig() {
  try {
    // Check if email config already exists
    const existingConfig = await EmailConfiguration.findOne();

    if (existingConfig) {
      console.log("✅ Email configuration already exists");
      return;
    }

    // Get email config from .env
    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const smtpPort = process.env.SMTP_PORT || "587";
    const smtpUser = process.env.SMTP_USER || "";
    const smtpPass = process.env.SMTP_PASS || "";
    const senderEmail = process.env.SMTP_USER || "";

    // Only seed if SMTP credentials are provided
    if (!smtpUser || !smtpPass) {
      console.log(
        "⚠️  No SMTP credentials in .env, skipping email config seed"
      );
      return;
    }

    // Encrypt the password
    const encryptedPassword = encryptPassword(smtpPass);

    // Create email configuration
    await EmailConfiguration.create({
      smtpHost,
      smtpPort: smtpPort,
      smtpUsername: smtpUser,
      smtpPassword: encryptedPassword,
      senderEmail,
    });

    console.log("✅ Email configuration seeded from .env");
    console.log(`   SMTP Host: ${smtpHost}`);
    console.log(`   SMTP Port: ${smtpPort}`);
    console.log(`   SMTP User: ${smtpUser}`);
    console.log(`   Password: [ENCRYPTED]`);
  } catch (error) {
    console.error("❌ Failed to seed email configuration:", error.message);
  }
}
