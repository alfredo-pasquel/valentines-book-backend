import express from 'express';
import CalendarEntry from '../models/CalendarEntry.js';
import authMiddleware from '../utils/authMiddleware.js';

const router = express.Router();

// GET /api/calendar?date=YYYY-MM-DD
router.get('/', authMiddleware, async (req, res) => {
  const { date } = req.query;
  try {
    const entries = await CalendarEntry.find({ date });
    res.json(entries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/calendar/month?month=YYYY-MM (protected)
router.get('/month', authMiddleware, async (req, res) => {
    const { month } = req.query; // e.g., "2025-02"
    try {
      const entries = await CalendarEntry.find({ date: { $regex: `^${month}` } });
      res.json(entries);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
// POST /api/calendar
router.post('/', authMiddleware, async (req, res) => {
  const { date, title, description } = req.body;
  try {
    const newEntry = new CalendarEntry({ date, title, description });
    await newEntry.save();
    res.json(newEntry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
