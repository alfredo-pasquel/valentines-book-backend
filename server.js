// server.js
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB using the URI from your .env file
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

// Import route files
import authRoutes from './routes/auth.js';
import journalRoutes from './routes/journal.js';
import galleryRoutes from './routes/gallery.js';
import calendarRoutes from './routes/calendar.js';

// Use routes (all routes are prefixed with /api)
app.use('/api/auth', authRoutes);
app.use('/api/journal', journalRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/calendar', calendarRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Express server running on port ${PORT}`));
