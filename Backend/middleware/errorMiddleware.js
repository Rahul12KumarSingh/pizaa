const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    error.status = 404;
    next(error);
};

const errorHandler = (err, req, res, next) => {
    const status = err.status || 500;
    if (process.env.NODE_ENV !== "test") {
        // eslint-disable-next-line no-console
        console.error(err);
    }
    res.status(status).json({
        success: false,
        message: err.message || "Internal server error",
    });
};

module.exports = { notFound, errorHandler };
