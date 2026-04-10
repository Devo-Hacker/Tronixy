import express from 'express';
import {getUserProfileController,
  loginController,
  logoutController,
  registerController,
  udpatePasswordController,
  updateProfileController, } from '../controllers/userController.js';
import { isAuth } from "../middlewares/authMiddleware.js";

const router = express.Router();

//register
router.post('/register', registerController);

//login
router.post('/login', loginController);

//profile
router.get('/profile',isAuth, getUserProfileController);

//logout
router.get("/logout", isAuth, logoutController);

// update profile
router.put("/profile-update", isAuth, updateProfileController);

// updte password
router.put("/update-password", isAuth, udpatePasswordController);

export default router;