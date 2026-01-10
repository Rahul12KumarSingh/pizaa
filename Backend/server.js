const dotenv = require("dotenv");
const connectDB = require("./config/db");
const buildApp = require("./app");

dotenv.config();

const port = process.env.PORT || 5000;
const app = buildApp();

const startServer = async () => {
    try {
        await connectDB();
        app.listen(port, () => {
            console.log(`Server listening on port ${port}`);
        });
    } catch (error) {
        console.error("Failed to start server", error.message);
        process.exit(1);
    }
};

if (require.main === module) {
    startServer();

    process.on("unhandledRejection", (error) => {
        console.error("Unhandled promise rejection", error);
        process.exit(1);
    });
}

module.exports = app;
