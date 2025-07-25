import Product from "../models/Product.js";
import { v2 as cloudinary } from 'cloudinary';

export const addProduct = async (req, res) => {
    try {
        let productData = JSON.parse(req.body.productData);
        const images = req.files;
        let imageUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path,
                    { resource_type: 'image' });
                return result.secure_url
            })
        )

        await Product.create({ ...productData, image: imageUrl });

        res.json({ success: true, message: "product added" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: error?.message });
    }
}

export const productList = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json({ success: true, products })
    } catch (error) {
        return res.status(500).json({ success: false, message: error?.message });
    }
}

export const productById = async (req, res) => {
    try {
        const { id } = req.body;
        const product = await Product.findById(id);
        res.json({ success: true, product });
    } catch (error) {
        return res.status(500).json({ success: false, message: error?.message });
    }

}

export const changeStock = async (req, res) => {
    try {
        const { id, inStock } = req.body;
        await Product.findByIdAndUpdate(id, { inStock });
        res.json({ success: true, message: "Stock updated!" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error?.message });
    }
};
