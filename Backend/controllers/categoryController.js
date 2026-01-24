const Category = require("../models/Category");


const createCategory = async (req, res, next) => {
    try {
        const { name, description, image, displayOrder } = req.body;

        const existingCategory = await Category.findOne({ name: { $regex: new RegExp(`^${name}$`, "i") } });
        if (existingCategory) {
            return res.status(400).json({ success: false, message: "Category already exists" });
        }

        const category = await Category.create({ name, description, image, displayOrder });
        return res.status(201).json({ success: true, data: category });
    } catch (error) {
        return next(error);
    }
};


const listCategories = async (req, res, next) => {
    try {
        const categories = await Category.find({ isActive: true })
            .sort({ displayOrder: 1, createdAt: -1 })
            .lean();

        return res.status(200).json({ success: true, data: categories });
    } catch (error) {
        return next(error);
    }
};






module.exports = {
    createCategory,
    listCategories,
};
