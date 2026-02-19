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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

// 1. Connect to Database
connectDB();

// 2. Security & Optimization
if (process.env.NODE_ENV === 'production') {
  // Disable CSP in Helmet to prevent it from blocking Frontend assets
  app.use(helmet({
    contentSecurityPolicy: false,
  }));
  app.use(compression());
}

// 3. Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// 4. Updated CORS
// Added more common Vercel naming patterns to be safe
app.use(cors({
  origin: [
    'https://marvista-app.vercel.app',
    'https://marvista-frontend-app.vercel.app', 
    'http://localhost:5173'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static uploads (Note: Vercel is temporary; files will disappear after 15-30 mins)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 5. Routes
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'MarVista API is running',
    environment: process.env.NODE_ENV
  });
});

app.use('/api/products', productRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/users', userRoutes);

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Server healthy' });
});

app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found'
  });
});

app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

export default app;

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running locally on ${PORT}`));
}