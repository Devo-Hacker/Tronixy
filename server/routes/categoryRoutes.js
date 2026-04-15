import express from "express";
import { isAuth } from "./../middlewares/authMiddleware.js";
import {
  createCategory,
//  deleteCategoryController,
//  getAllCategoriesController,
//  updateCategoryController,
} from "../controllers/categoryController.js";

const router = express.Router();

//create category
router.post("/create", isAuth, createCategory);

export default router;