const mongoose = require('mongoose');
require('dotenv').config(); // This line reads your .env file

const connectDB = async () => {
    try {
        // We use process.env to pull the secret link safely
        await mongoose.connect(process.env.MONGO_URI);
        console.log("🚀 MongoDB Connected from .env variables!");
    } catch (err) {
        console.error("❌ Connection error:", err.message);
        process.exit(1);
    }
};

module.exports = connectDB;