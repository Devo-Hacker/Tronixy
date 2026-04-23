import express from 'express';
import colors from 'colors';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import cloudinary from "cloudinary";
import Stripe from "stripe";

// config env
dotenv.config();

// DB
connectDB(); 

// Stripe
export const stripe = new Stripe(process.env.STRIPE_API_SECRET);

// Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
}); 

// app
const app = express();

// ================= CORS FIX =================
const allowedOrigins = [
  "http://localhost:5500",
  "http://127.0.0.1:5500",
  "https://tronixy-2.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (Postman, mobile apps, etc.)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("CORS not allowed"));
    }
  },
  credentials: true,
}));
// ===========================================

// middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

// routes
import testRoutes from './routes/testRoutes.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import orderRoutes from "./routes/orderRoutes.js";

app.use("/api/v1", testRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/cat", categoryRoutes);
app.use("/api/v1/order", orderRoutes);

// test route
app.get("/", (req, res) => {  
  return res.status(200).send("<h1>Welcome To Node server</h1>");  
});  

// port  
const PORT = process.env.PORT || 8080;  

// listen  
app.listen(PORT, () => {  
  console.log(`server running on PORT ${PORT} in ${process.env.NODE_ENV}`.bgMagenta.black);  
});