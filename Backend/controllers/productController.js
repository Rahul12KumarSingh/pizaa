const Product = require("../models/Product");


/**
 * @desc    Create a new product
 * @route   POST /api/products
 * @access  Private/Admin
 */
const createProduct = async (req, res, next) => {
    try {
        const { title, description, category, price, variants, image, isAvailable, displayOrder, tags } = req.body;

        const product = await Product.create({
            title,
            description,
            category,
            price,
            variants,
            image,
            isAvailable,
            displayOrder,
            tags,
        });

        return res.status(201).json({ success: true, data: product });
    } catch (error) {
        return next(error);
    }
};



/**
 * @desc    Get products grouped by category
 * @route   GET /api/products/menu
 * @access  Public
 */
const getMenu = async (req, res, next) => {
    try {
        const products = await Product.aggregate([
            { $match: { isAvailable: true } },
            {
                $lookup: {
                    from: "categories",
                    localField: "category",
                    foreignField: "_id",
                    as: "categoryInfo",
                },
            },
            { $unwind: "$categoryInfo" },
            { $match: { "categoryInfo.isActive": true } },
            { $sort: { "categoryInfo.displayOrder": 1, displayOrder: 1 } },
            {
                $group: {
                    _id: "$category",
                    categoryName: { $first: "$categoryInfo.name" },
                    categorySlug: { $first: "$categoryInfo.slug" },
                    categoryOrder: { $first: "$categoryInfo.displayOrder" },
                    products: {
                        $push: {
                            _id: "$_id",
                            title: "$title",
                            description: "$description",
                            price: "$price",
                            variants: "$variants",
                            image: "$image",
                            tags: "$tags",
                        },
                    },
                },
            },
            { $sort: { categoryOrder: 1 } },
            {
                $project: {
                    _id: 0,
                    categoryId: "$_id",
                    categoryName: 1,
                    categorySlug: 1,
                    products: 1,
                },
            },
        ]);

        return res.status(200).json({ success: true, data: products });
    } catch (error) {
        return next(error);
    }
};


module.exports = {
    createProduct,
    getMenu,
};
