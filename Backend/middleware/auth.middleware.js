import { verifyToken } from "../utils/tokenUtils.js";
import User from "../models/user.model.js";

// Authentication middleware - validates JWT tokens
export const protect = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const decoded = verifyToken(token);

    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: "Account disabled",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth error:", error.message);
    return res.status(401).json({
      success: false,
      message: "Authentication failed",
    });
  }
};

// Admin authorization middleware
export const admin = (req, res, next) => {
  if (!req.user?.isAdmin) {
    return res.status(403).json({
      success: false,
      message: "Admin access required",
    });
  }
  next();
};

// Optional authentication for public routes with user context
export const optionalAuth = async (req, res, next) => {
  try {
    if (req.headers.authorization?.startsWith("Bearer")) {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = verifyToken(token);

      if (decoded) {
        const user = await User.findById(decoded.id).select("-password");
        if (user?.isActive) {
          req.user = user;
        }
      }
    }
    next();
  } catch (error) {
    // Silent failure for optional authentication
    next();
  }
};
