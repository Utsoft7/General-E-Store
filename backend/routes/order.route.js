import express from "express";
import {
  createOrder,
  getAllOrders,
  getCustomerOrders,
  getOrder,
} from "../controllers/order.controller.js";

const router = express.Router();

router.post("/", createOrder);
router.get("/", getAllOrders);
router.get("/customer/:email", getCustomerOrders);
router.get("/:orderId", getOrder);

export default router;
