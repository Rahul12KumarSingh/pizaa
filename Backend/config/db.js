const mongoose = require("mongoose");

let cachedConnection = null;

const connectDB = async () => {
  if (cachedConnection && mongoose.connection.readyState === 1) {
    return cachedConnection;
  }

  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      autoIndex: false,
    });
    cachedConnection = connection;
    console.log(`MongoDB connected: ${connection.connection.host}`);
    return connection;
  } catch (error) {
    console.error("Mongo connection error", error.message);
    throw error;
  }
};

module.exports = connectDB;
