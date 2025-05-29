import User from "../models/User.js";

export const cartUpdate = async (req, res) => {
    try {
        const {cartItems} = req.body;
        const {userId} = req;
        await User.findByIdAndUpdate(userId, { cartItems })
        res.json({ success: true, message: "Cart updated!" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error?.message });
    }
}