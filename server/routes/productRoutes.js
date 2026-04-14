import express from "express";
import { isAuth } from "./../middlewares/authMiddleware.js";
import {
  createProductController,
//   deleteProductController,
//   deleteProductImageController,
  getAllProductsController,
  getSingleProductController,
//   getTopProductsController,
//   productReviewController,
   updateProductController,
//   updateProductImageController,
} from "../controllers/productController.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

//routes
//get all products
router.get("/get-all", getAllProductsController);

// // GET TOP PRODUCTS
// router.get("/top", getTopProductsController);

// GET SINGLE PRODUCTS
router.get("/:id", getSingleProductController);

// CREATE PRODUCT
router.post("/create", isAuth, singleUpload, createProductController);

//Update products
router.put("/:id", isAuth,  updateProductController);

export default router