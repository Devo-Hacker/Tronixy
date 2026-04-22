import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

// USER AUTH
export const isAuth = async (req, res, next) => {
  try {
    // Read from cookie first, fallback to Authorization header
    let token = req.cookies.token;

    if (!token && req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1]; // "Bearer <token>"
    }

    if (!token) {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized User",
      });
    }

    const decodeData = JWT.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decodeData._id);

    if (!user) {
      return res.status(401).send({
        success: false,
        message: "User not found",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).send({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

// ADMIN PANEL
export const isAdmin = async (req, res, next) => {
  // ✅ ONLY ADD THIS SAFE CHECK
  if (!req.user || req.user.role !== "admin") {
    return res.status(401).send({
      success: false,
      message: "Your are restricted coz this is admin panel",
    });
  }

  next();
};