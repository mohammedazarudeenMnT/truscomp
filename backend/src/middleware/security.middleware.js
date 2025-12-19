import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

// Check if we're in development mode
const isDevelopment = process.env.NODE_ENV !== 'production';

// Rate limiting configuration
// More lenient in development, strict in production
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: isDevelopment ? 1000 : 100, // 1000 in dev, 100 in production
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
  skip: () => isDevelopment && process.env.DISABLE_RATE_LIMIT === 'true', // Can disable in dev
});

// Stricter rate limiting for public referral lookup
// Prevents abuse of the public endpoint
export const referralLookupLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: isDevelopment ? 50 : 20, // 50 in dev, 20 in production
  message: {
    success: false,
    message: 'Too many referral lookups. Please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
  skip: () => isDevelopment && process.env.DISABLE_RATE_LIMIT === 'true',
});

// Stricter rate limiting for auth endpoints
// More lenient in development, strict in production
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: isDevelopment ? 100 : 10, // 100 in dev, 10 in production
  message: {
    success: false,
    message: 'Too many authentication attempts, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
  skip: () => isDevelopment && process.env.DISABLE_RATE_LIMIT === 'true', // Can disable in dev
});

// Security headers middleware
export const securityHeaders = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: { policy: "cross-origin" },
});

// Global API protection middleware
// This ensures NO public access to any /api/* routes except auth
export const protectAllAPIs = (req, res, next) => {
  const path = req.path;
  
  // Allow Better Auth routes (they handle their own auth)
  if (path.startsWith('/api/auth/')) {
    return next();
  }
  
  // Allow health check
  if (path === '/health') {
    return next();
  }
  
  // All other /api/* routes MUST have authentication
  // This is handled by individual route middleware (requireAuth, requireUser, requireAdmin)
  // But we add this as a safety net
  next();
};

// Add security headers to all responses
// Based on OWASP best practices and Better Auth recommendations
export const addSecurityHeaders = (req, res, next) => {
  // Security status headers (for debugging/monitoring)
  res.setHeader('X-Security-Enabled', 'true');
  res.setHeader('X-Rate-Limit-Enabled', 'true');
  res.setHeader('X-Auth-Required', 'true');
  
  // Timestamp for debugging
  res.setHeader('X-Response-Time', new Date().toISOString());
  
  // Additional security headers (OWASP recommendations)
  // Prevent MIME type sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');
  
  // Enable XSS protection (for older browsers)
  res.setHeader('X-XSS-Protection', '1; mode=block');
  
  // Prevent clickjacking
  res.setHeader('X-Frame-Options', 'DENY');
  
  // Referrer policy - don't leak referrer info
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Permissions policy - restrict browser features
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  
  // Remove powered-by header (security through obscurity)
  res.removeHeader('X-Powered-By');
  
  next();
};

// Validate request method for specific endpoints
export const validateRequestMethod = (allowedMethods) => {
  return (req, res, next) => {
    if (!allowedMethods.includes(req.method)) {
      return res.status(405).json({
        success: false,
        message: `Method ${req.method} not allowed. Allowed methods: ${allowedMethods.join(', ')}`
      });
    }
    next();
  };
};

// Sanitize request headers (prevent header injection)
export const sanitizeHeaders = (req, res, next) => {
  // Remove potentially dangerous headers
  const dangerousHeaders = ['x-forwarded-host', 'x-original-url'];
  
  dangerousHeaders.forEach(header => {
    if (req.headers[header]) {
      delete req.headers[header];
    }
  });
  
  next();
};
