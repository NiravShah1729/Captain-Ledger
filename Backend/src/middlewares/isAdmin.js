import {apiError} from "../utils/apiError.js";

// Middleware to check if the user is an admin
const isAdmin = (req, res, next) => {
  // Make sure the user is authenticated and has a role
  if (!req.user || !req.user.role) {
    throw new apiError(401, "Unauthorized: No user data found");
  }

  // Check if the user is an admin
  if (req.user.role !== "admin") {
    throw new apiError(403, "Access denied: Admins only");
  }

  // User is an admin, proceed
  next();
};

export default isAdmin;
