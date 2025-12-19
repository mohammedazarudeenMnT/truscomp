import { getAuth } from '../lib/auth.js';

// Middleware to verify authentication
export const requireAuth = async (req, res, next) => {
  try {
    const auth = getAuth();
    
    // Explicitly pass headers to better-auth
    const result = await auth.api.getSession({
      headers: req.headers,
      asResponse: true
    });

    if (!result.ok) {
      console.log('🔒 Auth blocked:', req.method, req.path, '- No valid session');
      return res.status(401).json({
        success: false,
        message: 'Unauthorized - Please login'
      });
    }

    const data = await result.json();
    
    if (!data || !data.user) {
       console.log('🔒 Auth blocked: No session data found');
       return res.status(401).json({
        success: false,
        message: 'Unauthorized - Please login'
      });
    }

    req.user = data.user;
    req.session = data.session;
    
    // Add security info to response headers
    res.setHeader('X-Authenticated', 'true');
    res.setHeader('X-User-Role', data.user.role || 'user');
    
    // console.log('✅ Auth passed:', req.method, req.path, '- User:', data.user.email);
    next();
  } catch (error) {
    console.log('🔒 Auth error:', req.method, req.path, '- Error:', error.message);
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired session'
    });
  }
};

// Middleware to verify admin role
export const requireAdmin = async (req, res, next) => {
  try {
    const auth = getAuth();
    const result = await auth.api.getSession({
      headers: req.headers,
      asResponse: true
    });

    if (!result.ok) {
      console.log('🔒 Admin auth blocked:', req.method, req.path, '- No valid session');
      return res.status(401).json({
        success: false,
        message: 'Unauthorized - Please login'
      });
    }

    const data = await result.json();

    if (!data || !data.user) {
      console.log('🔒 Admin auth blocked: No session data found');
      return res.status(401).json({
        success: false,
        message: 'Unauthorized - Please login'
      });
    }

    if (!data || !data.user) {
       console.log('🔒 Admin Auth blocked: No user data in session');
       return res.status(401).json({
        success: false,
        message: 'Unauthorized - Invalid session data'
      });
    }

    if (data.user.role !== 'admin') {
      console.log('🔒 Admin auth blocked:', req.method, req.path, '- User is not admin:', data.user.email);
      return res.status(403).json({
        success: false,
        message: 'Forbidden - Admin access required'
      });
    }

    req.user = data.user;
    req.session = data.session;
    
    // Add admin security info to response headers
    res.setHeader('X-Authenticated', 'true');
    res.setHeader('X-User-Role', 'admin');
    res.setHeader('X-Admin-Access', 'granted');
    
    // console.log('✅ Admin auth passed:', req.method, req.path, '- Admin:', data.user.email);
    next();
  } catch (error) {
    console.log('🔒 Admin auth error:', req.method, req.path, '- Error:', error.message);
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired session'
    });
  }
};

// Middleware to verify user role
export const requireUser = async (req, res, next) => {
  try {
    const auth = getAuth();
    const result = await auth.api.getSession({
      headers: req.headers,
      asResponse: true
    });

    if (!result.ok) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized - Please login'
      });
    }

    const data = await result.json();

    if (data.user.role !== 'user' && data.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Forbidden - User access required'
      });
    }

    req.user = data.user;
    req.session = data.session;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired session'
    });
  }
};
