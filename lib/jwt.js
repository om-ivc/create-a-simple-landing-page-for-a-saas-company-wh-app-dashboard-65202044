import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRES_IN = '7d'; // 7 days

/**
 * Hash a password using bcrypt
 * @param {string} password - Plain text password
 * @returns {Promise<string>} - Hashed password
 */
export async function hashPassword(password) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.error('Error hashing password:', error);
    throw new Error('Failed to hash password');
  }
}

/**
 * Verify a password against a hash
 * @param {string} password - Plain text password
 * @param {string} hash - Hashed password
 * @returns {Promise<boolean>} - True if password matches, false otherwise
 */
export async function verifyPassword(password, hash) {
  try {
    const isValid = await bcrypt.compare(password, hash);
    return isValid;
  } catch (error) {
    console.error('Error verifying password:', error);
    return false;
  }
}

/**
 * Generate a JWT token
 * @param {Object} payload - Data to encode in the token
 * @param {string} payload.userId - User ID
 * @param {string} payload.email - User email
 * @param {string} payload.role - User role
 * @returns {Promise<string>} - JWT token
 */
export async function generateToken(payload) {
  try {
    const token = jwt.sign(
      {
        userId: payload.userId,
        email: payload.email,
        role: payload.role,
        iat: Math.floor(Date.now() / 1000),
      },
      JWT_SECRET,
      {
        expiresIn: JWT_EXPIRES_IN,
        algorithm: 'HS256',
      }
    );
    return token;
  } catch (error) {
    console.error('Error generating token:', error);
    throw new Error('Failed to generate authentication token');
  }
}

/**
 * Verify and decode a JWT token
 * @param {string} token - JWT token
 * @returns {Promise<Object|null>} - Decoded token payload or null if invalid
 */
export async function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET, {
      algorithms: ['HS256'],
    });
    return decoded;
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      console.error('Token has expired');
    } else if (error.name === 'JsonWebTokenError') {
      console.error('Invalid token');
    } else {
      console.error('Error verifying token:', error);
    }
    return null;
  }
}

/**
 * Extract token from request cookies or headers
 * @param {Request} request - Next.js request object
 * @returns {string|null} - Token or null if not found
 */
export function extractToken(request) {
  try {
    // Try to get token from cookies
    const cookieToken = request.cookies.get('auth_token')?.value;
    if (cookieToken) {
      return cookieToken;
    }

    // Try to get token from Authorization header
    const authHeader = request.headers.get('authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      return authHeader.substring(7);
    }

    return null;
  } catch (error) {
    console.error('Error extracting token:', error);
    return null;
  }
}

/**
 * Middleware helper to verify authentication
 * @param {Request} request - Next.js request object
 * @returns {Promise<Object|null>} - User data from token or null if invalid
 */
export async function authenticateRequest(request) {
  try {
    const token = extractToken(request);
    if (!token) {
      return null;
    }

    const decoded = await verifyToken(token);
    if (!decoded) {
      return null;
    }

    return {
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role,
    };
  } catch (error) {
    console.error('Error authenticating request:', error);
    return null;
  }
}

/**
 * Check if user has required role
 * @param {string} userRole - User's role
 * @param {string[]} allowedRoles - Array of allowed roles
 * @returns {boolean} - True if user has required role
 */
export function hasRole(userRole, allowedRoles) {
  if (!userRole || !Array.isArray(allowedRoles)) {
    return false;
  }
  return allowedRoles.includes(userRole);
}