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


/**
 * @desc    Update an existing product
 * @route   PUT /api/products/:id
 * @access  Private/Admin
 */
const updateProduct = async (req, res, next) => {
    try {
        const { title, description, category, price, variants, image, isAvailable, displayOrder, tags } = req.body;

        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        if (title !== undefined) product.title = title;
        if (description !== undefined) product.description = description;
        if (category !== undefined) product.category = category;
        if (image !== undefined) product.image = image;
        if (isAvailable !== undefined) product.isAvailable = isAvailable;
        if (displayOrder !== undefined) product.displayOrder = displayOrder;
        if (tags !== undefined) product.tags = tags;

        // Handle pricing type switch
        if (variants !== undefined && variants.length > 0) {
            product.variants = variants;
            product.price = null;
        } else if (price !== undefined && price !== null) {
            product.price = price;
            product.variants = [];
        }

        await product.save();

        return res.status(200).json({ success: true, data: product });
    } catch (error) {
        return next(error);
    }
};


module.exports = {
    createProduct,
    getMenu,
    updateProduct,
};
