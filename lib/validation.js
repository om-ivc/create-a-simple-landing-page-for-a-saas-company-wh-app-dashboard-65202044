/**
 * Email validation regex pattern
 * Matches standard email formats
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Password validation requirements:
 * - Minimum 8 characters
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one number
 */
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

/**
 * Validate email format
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if email is valid, false otherwise
 */
export function validateEmail(email) {
  if (!email || typeof email !== 'string') {
    return false;
  }
  
  const trimmedEmail = email.trim();
  
  if (trimmedEmail.length === 0) {
    return false;
  }
  
  return EMAIL_REGEX.test(trimmedEmail);
}

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {Object} - Object with valid (boolean) and error (string) properties
 */
export function validatePassword(password) {
  if (!password || typeof password !== 'string') {
    return {
      valid: false,
      error: 'Password is required',
    };
  }

  if (password.length < 8) {
    return {
      valid: false,
      error: 'Password must be at least 8 characters long',
    };
  }

  if (!/[a-z]/.test(password)) {
    return {
      valid: false,
      error: 'Password must contain at least one lowercase letter',
    };
  }

  if (!/[A-Z]/.test(password)) {
    return {
      valid: false,
      error: 'Password must contain at least one uppercase letter',
    };
  }

  if (!/\d/.test(password)) {
    return {
      valid: false,
      error: 'Password must contain at least one number',
    };
  }

  return {
    valid: true,
    error: null,
  };
}

/**
 * Validate name (minimum 2 characters)
 * @param {string} name - Name to validate
 * @returns {Object} - Object with valid (boolean) and error (string) properties
 */
export function validateName(name) {
  if (!name || typeof name !== 'string') {
    return {
      valid: false,
      error: 'Name is required',
    };
  }

  const trimmedName = name.trim();

  if (trimmedName.length < 2) {
    return {
      valid: false,
      error: 'Name must be at least 2 characters long',
    };
  }

  if (trimmedName.length > 100) {
    return {
      valid: false,
      error: 'Name must not exceed 100 characters',
    };
  }

  return {
    valid: true,
    error: null,
  };
}

/**
 * Validate message (minimum 10 characters for contact form)
 * @param {string} message - Message to validate
 * @returns {Object} - Object with valid (boolean) and error (string) properties
 */
export function validateMessage(message) {
  if (!message || typeof message !== 'string') {
    return {
      valid: false,
      error: 'Message is required',
    };
  }

  const trimmedMessage = message.trim();

  if (trimmedMessage.length < 10) {
    return {
      valid: false,
      error: 'Message must be at least 10 characters long',
    };
  }

  if (trimmedMessage.length > 1000) {
    return {
      valid: false,
      error: 'Message must not exceed 1000 characters',
    };
  }

  return {
    valid: true,
    error: null,
  };
}

/**
 * Validate role (must be one of the allowed roles)
 * @param {string} role - Role to validate
 * @returns {Object} - Object with valid (boolean) and error (string) properties
 */
export function validateRole(role) {
  const allowedRoles = ['admin', 'user', 'viewer'];

  if (!role || typeof role !== 'string') {
    return {
      valid: false,
      error: 'Role is required',
    };
  }

  if (!allowedRoles.includes(role)) {
    return {
      valid: false,
      error: `Role must be one of: ${allowedRoles.join(', ')}`,
    };
  }

  return {
    valid: true,
    error: null,
  };
}

/**
 * Sanitize user input to prevent XSS attacks
 * @param {string} input - User input to sanitize
 * @returns {string} - Sanitized input
 */
export function sanitizeInput(input) {
  if (!input || typeof input !== 'string') {
    return '';
  }

  // Remove potential HTML tags and script content
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .trim();
}

/**
 * Validate rating (1-5 stars)
 * @param {number} rating - Rating to validate
 * @returns {Object} - Object with valid (boolean) and error (string) properties
 */
export function validateRating(rating) {
  if (typeof rating !== 'number') {
    return {
      valid: false,
      error: 'Rating must be a number',
    };
  }

  if (!Number.isInteger(rating)) {
    return {
      valid: false,
      error: 'Rating must be an integer',
    };
  }

  if (rating < 1 || rating > 5) {
    return {
      valid: false,
      error: 'Rating must be between 1 and 5',
    };
  }

  return {
    valid: true,
    error: null,
  };
}

/**
 * Validate price (must be positive number)
 * @param {number} price - Price to validate
 * @returns {Object} - Object with valid (boolean) and error (string) properties
 */
export function validatePrice(price) {
  if (typeof price !== 'number') {
    return {
      valid: false,
      error: 'Price must be a number',
    };
  }

  if (price < 0) {
    return {
      valid: false,
      error: 'Price must be a positive number',
    };
  }

  if (!Number.isFinite(price)) {
    return {
      valid: false,
      error: 'Price must be a valid number',
    };
  }

  return {
    valid: true,
    error: null,
  };
}

/**
 * Validate UUID format
 * @param {string} uuid - UUID to validate
 * @returns {boolean} - True if UUID is valid, false otherwise
 */
export function validateUUID(uuid) {
  if (!uuid || typeof uuid !== 'string') {
    return false;
  }

  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}