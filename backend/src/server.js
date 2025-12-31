import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { toNodeHandler } from "better-auth/node";
import { connectDB } from "./config/database.js";
import { initAuth, getAuth } from "./lib/auth.js";
import { seedAdmin } from "./utils/seedAdmin.js";
import { seedSettings } from "./utils/seedSettings.js";
// import { seedEmailConfig } from "./utils/seedEmailConfig.js";
// import { seedRanks } from "./utils/seedRanks.js";
// import { seedSampleUsers } from "./utils/seedSampleUsers.js";
// import { rebuildAllLegArrays } from "./utils/updateLegArrays.js";
import registerRoutes from "./routes/index.js";
import {
  apiLimiter,
  authLimiter,
  securityHeaders,
  protectAllAPIs,
  addSecurityHeaders,
  sanitizeHeaders,
} from "./middleware/security.middleware.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security headers - apply first
app.use(securityHeaders);

// CORS configuration - dynamic based on environment
const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? [process.env.FRONTEND_URL]
    : [
        process.env.FRONTEND_URL,
        "https://kk5n0x75-3000.inc1.devtunnels.ms",
        "https://kk5n0x75-3001.inc1.devtunnels.ms",
        "http://localhost:5000",
      ];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, Postman, etc.)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();

  // Log when response finishes
  res.on("finish", () => {
    const duration = Date.now() - start;
    const statusColor =
      res.statusCode >= 500 ? "🔴" : res.statusCode >= 400 ? "🟡" : "🟢";
    const path = req.originalUrl || req.url;
    console.log(
      `${statusColor} ${res.statusCode} ${req.method} ${path} - ${duration}ms`
    );
  });

  next();
});

// Apply JSON middleware FIRST (needed for our custom routes)
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Sanitize request headers (prevent header injection attacks)
app.use(sanitizeHeaders);

// Add security headers to all responses (OWASP best practices)
app.use(addSecurityHeaders);

// Apply rate limiting to all API routes
app.use("/api/", apiLimiter);

// Stricter rate limiting for auth routes
app.use("/api/auth/", authLimiter);

// Global API protection - ensures no public access
app.use(protectAllAPIs);

// Register custom routes BEFORE Better Auth handler
// This allows our custom /api/auth/admin/* routes to work
registerRoutes(app);

// Better Auth handler - catches remaining /api/auth/* routes
// Express v5 uses *splat for catch-all routes
app.all("/api/auth/*splat", (req, res) => {
  const auth = getAuth();
  return toNodeHandler(auth)(req, res);
});

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "trustcomp  Backend is running",
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.originalUrl,
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

// Start server
const startServer = async () => {
  try {
    // Connect to database
    await connectDB();

    // Initialize Better Auth after database connection
    initAuth();
    console.log("✅ Better Auth initialized");

    // Seed admin user
    await seedAdmin();

    // Seed default settings
    await seedSettings();

    // Seed email configuration from .env
    // await seedEmailConfig();

    // Seed rank settings
    // await seedRanks();

    // Seed sample users (only in development)
    // if (process.env.NODE_ENV === 'development') {
    //   await seedSampleUsers();
    // }

    // Rebuild leg arrays on startup (fixes existing data)
    // console.log('🔄 Rebuilding leg arrays...');
    // await rebuildAllLegArrays();

    // Start listening
    app.listen(PORT, () => {
      console.log(`\n🚀 Server running on port ${PORT}`);
      console.log(`📍 API: http://localhost:${PORT}`);
      console.log(`🔐 Auth: http://localhost:${PORT}/api/auth`);
      console.log(`\n✨ Ready to accept requests!\n`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
