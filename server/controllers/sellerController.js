import jwt from "jsonwebtoken";

export const sellerLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (password !== process.env.SELLER_PASSWORD || email !== process.env.SELLER_EMAIL) {
            return res.status(401).json({
                success: false,
                message: "Not authorized"
            });
        }

        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.cookie("sellerToken", token,
            {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
                maxAge: 24 * 60 * 60 * 1000
            }
        );

        return res.status(200).json({
            success: true,
            message: "Logged In"
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error?.message });
    }
}

export const isSellerAuth = async (req, res) => {
    try {
        return res.status(200).json({ success: true });
    } catch (error) {
        return res.status(500).json({ success: false, message: error?.message });
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie("sellerToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict"
        });

        return res.status(200).json({ success: true, message: "successfully Logout!" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error?.message });
    }
}