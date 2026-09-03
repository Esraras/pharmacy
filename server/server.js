import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js';
import { errorHandler } from './middlewares/errorHandler.js';

import authRoutes from './routes/authRoutes.js';
import storeRoutes from './routes/storeRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// API Endpoints
app.use('/api/user', authRoutes);
app.use('/api/stores', storeRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

// Mock Endpoint for Reviews
app.get('/api/customer-reviews', (req, res) => {
  res.json([
    {
      _id: '1',
      name: 'Maria Tkachuk',
      testimonial: 'I recently used this medical platform to book an appointment with a specialist, and I was impressed by how easy and user-friendly the process was. Highly recommended!',
      avatar: 'https://i.pravatar.cc/150?img=1'
    },
    {
      _id: '2',
      name: 'John Doe',
      testimonial: 'Fast delivery and excellent response from local pharmacy providers.',
      avatar: 'https://i.pravatar.cc/150?img=2'
    }
  ]);
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use(errorHandler);

if (process.env.NODE_ENV !== 'production') {
  app.listen(5000, () => console.log('Server running locally'));
}