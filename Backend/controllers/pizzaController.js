const Pizza = require("../models/Pizza");

const createPizza = async (req, res, next) => {
  try {
    const { title, description, prices, sizes, image, isAvailable = true } = req.body;
    const pizza = await Pizza.create({ title, description, prices, sizes, image, isAvailable });
    return res.status(201).json({ success: true, data: pizza });
  } catch (error) {
    return next(error);
  }
};

const listPizzas = async (req, res, next) => {
  try {
    const pizzas = await Pizza.find({ isAvailable: true }).sort({ createdAt: -1 }).lean();
    return res.status(200).json({ success: true, data: pizzas });
  } catch (error) {
    return next(error);
  }
};

module.exports = { createPizza, listPizzas };
