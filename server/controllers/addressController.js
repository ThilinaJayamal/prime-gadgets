import Address from "../models/Address.js";

export const addAddress = async (req, res) => {
    try {
        const { address } = req.body;
        const { userId } = req;
        await Address.create({ ...address, userId });
        res.json({ success: true, message: "Address added successfully!" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error?.message });
    }
}

export const getAddresses = async (req, res) => {
    try {
        const { userId } = req;
        const addresses = await Address.find({ userId });
        res.status(200).json({ success: true, addresses });
    } catch (error) {
        return res.status(500).json({ success: false, message: error?.message });
    }
}