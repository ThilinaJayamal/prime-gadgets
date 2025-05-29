import mongoose from "mongoose";

export const connectDB = async (uri) => {
    try {
        const res = await mongoose.connect(uri);
        console.log("DB connected!");
    } catch (error) {
        console.log(error?.message);
        process.exit(1);
    }
}