// app.js

import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';

dotenv.config();

// Initialize Express app
const app = express();

// Middleware for logging and parsing
app.use(morgan('dev'));
app.use(bodyParser.json());

// Database connection
connectDB();

// Routes
app.use('/api/users', userRoutes);
app.use('/api/admins', adminRoutes);

// Error handler
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});