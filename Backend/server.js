import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js"; 
import userRoutes from './routes/user.route.js'
import path from 'path';
import cors from 'cors'

dotenv.config();

const app = express();

// CORS middleware
app.use(cors({
  origin: 'http://localhost:5000',
  credentials: true
}))

app.use(express.json());
app.use(express.urlencoded({extended: true}))
const _dirname = path.resolve();
app.use('/uploads', express.static(path.join(_dirname, '/uploads')));

app.use("/api/products", productRoutes);
app.use('/api/users', userRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on localhost:${PORT}`);
});