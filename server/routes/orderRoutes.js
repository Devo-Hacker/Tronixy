import express from "express";
import { isAdmin, isAuth } from "./../middlewares/authMiddleware.js";
import {
  createOrderController,
  getMyOrdersController,
  singleOrderDetrailsController,
  paymetsController,
  getAllOrdersController,
  changeOrderStatusController,
} from "../controllers/orderController.js";

const router = express.Router();

//rroutes
// ============== ORDERS ROUTES ==================

// CREATE ORDERS
router.post("/create", isAuth, createOrderController);

//  GET ALL ORDERS
router.get("/my-orders", isAuth, getMyOrdersController);

//get single order
router.get("/my-orders/:id", isAuth, singleOrderDetrailsController);

//ACCEPTpayments
router.post("/payments", isAuth, paymetsController)

//admin manages all orders
router.get("/admin/get-all-orders", isAuth, isAdmin, getAllOrdersController);

// change order status
router.put("/admin/order/:id", isAuth, isAdmin, changeOrderStatusController);




export default router