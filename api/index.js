import express from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import UserRoute from './routes/user.route.js';
import authRoute from './routes/auth.route.js';
import postRoute from './routes/post.route.js';
import commentRoute from './routes/comment.route.js';

import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

app.use(express.json());
app.use(cookieParser());


mongoose.connect(process.env.MONGO).then(() => {
    console.log("Connected successfully to MongoDB");
}).catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1); 
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


app.use('/api/user', UserRoute);
app.use('/api/auth', authRoute);
app.use('/api/post', postRoute);
app.use('/api/comment', commentRoute);



app.use((err, req, res, next) =>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error";
    res.status(statusCode).json({
        success: false,
        statusCode, message
    })
})
