// routes/calendar.js
import express from 'express';
import CalendarEntry from '../models/CalendarEntry.js';
import authMiddleware from '../utils/authMiddleware.js';

const router = express.Router();

// GET /api/calendar?date=YYYY-MM-DD (protected)
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
  const { month } = req.query;
  try {
    const entries = await CalendarEntry.find({ date: { $regex: `^${month}` } });
    res.json(entries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/calendar (protected)
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

// DELETE /api/calendar/:id (protected)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const entry = await CalendarEntry.findById(req.params.id);
    if (!entry) {
      return res.status(404).json({ error: 'Calendar event not found' });
    }
    await entry.deleteOne();
    res.json({ message: 'Calendar event deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
