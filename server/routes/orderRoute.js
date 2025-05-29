import express from "express";
import { authUser } from "../middleware/authUser.js";
import { getAllOrders, getUserOrders, placeOrderCOD, placeOrderStripe } from "../controllers/orderController.js";
import { authSeller } from "../middleware/authSeller.js";

const orderRoute = express.Router();

orderRoute.post("/cod", authUser, placeOrderCOD);
orderRoute.post("/stripe", authUser, placeOrderStripe);

orderRoute.get("/user",authUser,getUserOrders);
orderRoute.get("/seller",authSeller,getAllOrders);

export default orderRoute;