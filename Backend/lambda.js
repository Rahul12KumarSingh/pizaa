const serverless = require("serverless-http");
const dotenv = require("dotenv");
const buildApp = require("./app");
const connectDB = require("./config/db");

dotenv.config();

const app = buildApp();
const serverlessHandler = serverless(app);
let isDatabaseReady = false;

const ensureDatabase = async () => {
    if (isDatabaseReady) {
        return;
    }
    await connectDB();
    isDatabaseReady = true;
};

module.exports.handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    await ensureDatabase();
    return serverlessHandler(event, context);
};
