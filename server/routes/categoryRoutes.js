import express from "express";
import { isAuth } from "./../middlewares/authMiddleware.js";
import {
  createCategory,
  deleteCategoryController,
  getAllCategoriesController,
  updateCategoryController,
} from "../controllers/categoryController.js";

const router = express.Router();

//create category
router.post("/create", isAuth, createCategory);

//get all category controller
router.get("/get-all", getAllCategoriesController);

//delete category controller
router.delete("/delete/:id", isAuth, deleteCategoryController);

//update the category
router.put("/update/:id", isAuth, updateCategoryController);

export default router;