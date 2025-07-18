import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    cartItems: {
        type: Object,
        required: true,
        default: {}
    }
}, { minimize: false }
)

const User = mongoose.models.User || new mongoose.model("user", userSchema);

export default User;