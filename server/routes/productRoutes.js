import express from "express";
import {
//   createProductController,
//   deleteProductController,
//   deleteProductImageController,
  getAllProductsController,
  getSingleProductController,
//   getTopProductsController,
//   productReviewController,
//   updateProductController,
//   updateProductImageController,
} from "../controllers/productController.js";

const router = express.Router();

//routes
//get all products
router.get("/get-all", getAllProductsController);

// // GET TOP PRODUCTS
// router.get("/top", getTopProductsController);

// GET SINGLE PRODUCTS
router.get("/:id", getSingleProductController);

export default router