import express from "express";
import {isAdmin, isAuth } from "./../middlewares/authMiddleware.js";
import {
  createCategory,
  deleteCategoryController,
  getAllCategoriesController,
  updateCategoryController,
} from "../controllers/categoryController.js";

const router = express.Router();

//create category
router.post("/create", isAuth, isAdmin, createCategory);

//get all category controller
router.get("/get-all", getAllCategoriesController);

//delete category controller
router.delete("/delete/:id", isAuth, isAdmin, deleteCategoryController);

//update the category
router.put("/update/:id", isAuth, isAdmin, updateCategoryController);

export default router;