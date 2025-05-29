import express from "express";
import { register, login, isAuth, logout } from "../controllers/userController.js";
import { authUser } from "../middleware/authUser.js";

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/is-auth", authUser, isAuth);
userRouter.post("/logout", authUser, logout);

export default userRouter;