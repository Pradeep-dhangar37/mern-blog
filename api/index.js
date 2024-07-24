import express from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import UserRoute from './routes/user.route.js';
import authRoute from './routes/auth.route.js';

const app = express();
dotenv.config(); // Load environment variables from .env file

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO).then(() => {
    console.log("Connected successfully to MongoDB");
}).catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit process with failure
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Routes
app.use('/api/user', UserRoute);
app.use('/api/auth', authRoute);
