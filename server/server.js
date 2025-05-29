import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import userRoute from "./routes/userRoute.js";
import sellerRoute from "./routes/sellerRoute.js"
import connectCloudinary from "./config/cloudinary.js";
import productRoute from "./routes/productRoute.js";
import cartRoute from "./routes/cartRoute.js";
import addressRoute from "./routes/addressRoute.js";
import orderRoute from "./routes/orderRoute.js";
import { stripeWebhooks } from "./controllers/orderController.js";

const app = express();

const allowedOrigins = ['http://localhost:5173', 'https://ecommerce-webapp-tp34.vercel.app'];

//create DB connection
await connectDB(process.env.MONGODB_URI);
await connectCloudinary();

app.post("/stripe", stripeWebhooks);

//middleware configaration
app.use(cors({
    credentials: true,
    origin: allowedOrigins
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRoute);
app.use("/api/seller", sellerRoute);
app.use("/api/product", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/address", addressRoute);
app.use("/api/order", orderRoute);


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("server is running on port:", port);
})