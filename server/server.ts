import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Load environment variables from .env file
dotenv.config();

// Import Routes
import authRoutes from './routes/auth.route';
import booksRoutes from './routes/books.route';

const app: Express = express();
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

// Middleware for JSON parser and cors
app.use(express.json());
app.use(cors());

// Set up route paths
app.use('/api/auth', authRoutes);
app.use('/api/books', booksRoutes);

// Connect to MongoDB and Start the server
mongoose
  .connect(MONGO_URL as string)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  });
