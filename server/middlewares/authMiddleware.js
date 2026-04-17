import JWT from "jsonwebtoken";
import userMdoel from "../models/userModel.js";

// USER AUTH
export const isAuth = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).send({
      success: false,
      message: "UnAuthorized User",
    });
  }

  const decodeData = JWT.verify(token, process.env.JWT_SECRET);

  const user = await userMdoel.findById(decodeData._id);

  // ✅ ONLY ADD THIS CHECK (critical fix)
  if (!user) {
    return res.status(401).send({
      success: false,
      message: "User not found",
    });
  }

  req.user = user;
  next();
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