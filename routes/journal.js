// routes/journal.js
import express from 'express';
import JournalEntry from '../models/JournalEntry.js';
import authMiddleware from '../utils/authMiddleware.js';

const router = express.Router();

// GET /api/journal?date=YYYY-MM-DD (protected)
router.get('/', authMiddleware, async (req, res) => {
  const { date } = req.query;
  try {
    const entries = await JournalEntry.find({ date });
    res.json(entries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
