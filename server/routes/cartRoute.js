import express from "express";
import { cartUpdate } from "../controllers/cartController.js";
import { authUser } from "../middleware/authUser.js";

const cartRouter = express.Router();

cartRouter.put("/update", authUser, cartUpdate);

export default cartRouter;