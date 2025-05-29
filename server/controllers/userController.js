import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "Missing details!" });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists!" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET, {
            expiresIn: "7d"
        });

        res.cookie("token", token,
            {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
                maxAge: 24 * 60 * 60 * 1000
            }
        );

        return res.status(200).json({
            success: true,
            user: {
                email: user.email,
                name: user.name
            }
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error?.message });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and Password required!" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid email or password!" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            res.status(400).json({ success: false, message: "Invalid email or password!" });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET, {
            expiresIn: "7d"
        });

        res.cookie("token", token,
            {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
                maxAge: 24 * 60 * 60 * 1000
            }
        );

        return res.status(200).json({
            success: true,
            user: {
                email: user.email,
                name: user.name
            }
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error?.message });
    }
}

export const isAuth = async (req, res) => {
    const { userId } = req;
    try {
        const user = await User.findById(userId);
        return res.status(200).json({ success: true, user });
    } catch (error) {
        return res.status(500).json({ success: false, message: error?.message });
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict"
        });

        return res.status(200).json({ success: true, message: "successfully Logout!" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error?.message });
    }
}