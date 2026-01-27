import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js';
import userRoutes from './routes/user.route.js';
import contactRoutes from './routes/contact.route.js';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';

// Setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();

// Connect to database
connectDB();
// Security middleware for production
if (process.env.NODE_ENV === 'production') {
  app.use(helmet());
  app.use(compression());
}

// Middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// CORS
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL 
    : 'https://marvista-frontend-app.vercel.app',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'S.Market API is running',
    environment: process.env.NODE_ENV
  });
});

app.use('/api/products', productRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/users', userRoutes);

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server healthy',
    timestamp: new Date().toISOString()
  });
});

// 404 Handler
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found'
  });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  
  const status = err.status || 500;
  const response = {
    success: false,
    message: err.message || 'Internal server error'
  };
  
  if (process.env.NODE_ENV === 'development') {
    response.stack = err.stack;
  }
  
  res.status(status).json(response);
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} (${process.env.NODE_ENV})`);
});