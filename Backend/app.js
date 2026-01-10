const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const pizzaRoutes = require("./routes/pizzaRoutes");
const orderRoutes = require("./routes/orderRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const buildApp = () => {
    const app = express();

    app.use(helmet());
    app.use(cors());
    app.use(express.json({ limit: "1mb" }));
    app.use(express.urlencoded({ extended: true }));

    if (process.env.NODE_ENV !== "test") {
        app.use(morgan("dev"));
    }

    app.get("/health", (req, res) => {
        res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
    });

    app.use("/api/pizzas", pizzaRoutes);
    app.use("/api/orders", orderRoutes);

    app.use(notFound);
    app.use(errorHandler);

    return app;
};

module.exports = buildApp;
