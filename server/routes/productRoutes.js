import express from "express";
import { isAdmin, isAuth } from "./../middlewares/authMiddleware.js";
import {
  createProductController,
  deleteProductController,
  deleteProductImageController,
  getAllProductsController,
  getSingleProductController,
//   getTopProductsController,
   productReviewController,
   updateProductController,
   updateProductImageController,
   searchProductController,
    recommendProductController
} from "../controllers/productController.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

//routes
//get all products
router.get("/get-all", getAllProductsController);

//search product
router.get("/search", searchProductController);

//recommendation of product
router.get("/recommend/:id", recommendProductController);

// // GET TOP PRODUCTS
// router.get("/top", getTopProductsController);

// GET SINGLE PRODUCTS
router.get("/:id", getSingleProductController);

// CREATE PRODUCT
router.post("/create", isAuth, singleUpload, isAdmin, createProductController);

//Update products
router.put("/:id", isAuth, isAdmin,  updateProductController);

//update product image
router.put("/image/:id", isAuth, singleUpload, isAdmin, updateProductImageController);

//delete product image
router.delete("/delete-image/:id", isAuth, isAdmin, deleteProductImageController);

//delete product
router.delete("/delete/:id", isAuth, isAdmin, deleteProductController);

// REVIEW PRODUCT
router.put("/:id/review", isAuth, productReviewController);



export default router