import express from "express";
import { authSeller } from "../middleware/authSeller.js";
import { isSellerAuth, logout, sellerLogin } from "../controllers/sellerController.js";

const userRouter = express.Router();

userRouter.post("/login", sellerLogin);
userRouter.get("/is-auth", authSeller, isSellerAuth);
userRouter.get("/logout", authSeller, logout);

export default userRouter;