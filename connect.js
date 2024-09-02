const mongoose = require("mongoose");
// import dotenv from "dotenv";
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables from .env file

// Define MongoDB connection URL
const mongoURL = process.env.MONGODB_URL_LOCAL;

mongoose
    .connect(mongoURL)
    .then(() => {
        console.log("Connected to MongoDB server ✅");
    })
    .catch((err) => {
        console.log("MongoDB connection error", err);
    });
