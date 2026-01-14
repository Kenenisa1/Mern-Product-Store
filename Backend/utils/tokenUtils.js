import jwt from "jsonwebtoken";

/**
 * Generate authentication token
 * @param {string} userId - User ID to encode
 * @param {boolean} isAdmin - User admin status
 * @returns {string} JWT token
 */
export const generateToken = (userId, isAdmin = false) => {
  if (!process.env.AUTH_SECRET) {
    throw new Error("Authentication secret not configured");
  }

  return jwt.sign(
    {
      id: userId,
      isAdmin: isAdmin,
    },
    process.env.AUTH_SECRET,
    { expiresIn: "30d" }
  );
};

/**
 * Verify and decode authentication token
 * @param {string} token - JWT token to verify
 * @returns {object|null} Decoded token payload or null if invalid
 */
export const verifyToken = (token) => {
  try {
    if (!process.env.AUTH_SECRET) {
      throw new Error("Authentication secret not configured");
    }

    if (!token) {
      return null;
    }

    return jwt.verify(token, process.env.AUTH_SECRET);
  } catch (error) {
    return null;
  }
};

/**
 * Decode token without verification
 * @param {string} token - JWT token to decode
 * @returns {object|null} Decoded token payload
 */
export const decodeToken = (token) => {
  return jwt.decode(token);
};
