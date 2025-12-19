import User from '../models/auth/User.js';
import { getAuth } from '../lib/auth.js';

export const register = async (req, res) => {
  try {
    return res.status(501).json({ message: "Registration disabled." });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Login with email
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    const auth = getAuth();
    
    const result = await auth.api.signInEmail({
        body: {
          email,
          password
        },
        asResponse: true
    });

    if (!result.ok) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Forward cookies from Better Auth to the client (REQUIRED for session to work)
    if (result.headers) {
        result.headers.forEach((value, key) => {
            res.setHeader(key, value);
        });
    }

    const data = await result.json();

    // Check if user is banned
    if (data.user?.banned) {
      return res.status(403).json({
        success: false,
        message: 'Your account has been banned'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      data: data
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    });
  }
};

// Logout
export const logout = async (req, res) => {
  try {
    const auth = getAuth();
    const result = await auth.api.signOut({
      headers: req.headers,
      asResponse: true
    });

    if (!result.ok) {
      return res.status(500).json({
        success: false,
        message: 'Logout failed'
      });
    }

    // Forward cookies (clearing them)
    if (result.headers) {
        result.headers.forEach((value, key) => {
            res.setHeader(key, value);
        });
    }

    return res.status(200).json({
      success: true,
      message: 'Logout successful'
    });
  } catch (error) {
    console.error('Logout error:', error);
    return res.status(500).json({
      success: false,
      message: 'Logout failed'
    });
  }
};

// Get current user session
export const getSession = async (req, res) => {
  try {
    const auth = getAuth();
    const result = await auth.api.getSession({
      headers: req.headers,
      asResponse: true
    });

    if (!result.ok) {
      return res.status(401).json({
        success: false,
        message: 'No active session'
      });
    }

    // Forward cookies (session verification/refresh)
     if (result.headers) {
        result.headers.forEach((value, key) => {
            res.setHeader(key, value);
        });
    }

    const data = await result.json();

    return res.status(200).json({
      success: true,
      data: data
    });
  } catch (error) {
    console.error('Get session error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to get session'
    });
  }
};

// Forget Password
export const forgetPassword = async (req, res) => {
  try {
    const { email, redirectTo } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email'
      });
    }

    const auth = getAuth();
    
    // Using Better Auth's requestPasswordReset endpoint
    await auth.api.requestPasswordReset({
        body: {
          email,
          redirectTo: redirectTo || `${process.env.FRONTEND_URL}/reset-password`
        }
    });

    // Always return success for security (don't reveal if email exists)
    return res.status(200).json({
      success: true,
      message: 'If an account exists with this email, a password reset link has been sent'
    });

  } catch (error) {
    console.error('Forget password error:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred'
    });
  }
};

// Reset Password
export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Please provide token and new password'
      });
    }

    const auth = getAuth();
    
    // Using Better Auth's resetPassword API
    try {
      const result = await auth.api.resetPassword({
          body: {
            token,
            newPassword
          }
      });

      console.log('✅ Password reset successful');
      
      return res.status(200).json({
        success: true,
        message: 'Password reset successful'
      });
    } catch (apiError) {
      console.error('❌ Better Auth reset password error:', apiError);
      return res.status(400).json({
        success: false,
        message: apiError.message || 'Invalid or expired reset token'
      });
    }

  } catch (error) {
    console.error('Reset password error:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred'
    });
  }
};
