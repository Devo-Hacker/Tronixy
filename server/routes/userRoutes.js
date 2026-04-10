import express from 'express';
import { registerController, loginController, getUserProfileController, logoutController } from '../controllers/userController.js';
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

export default router;