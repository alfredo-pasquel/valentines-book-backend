// routes/journal.js
import express from 'express';
import JournalEntry from '../models/JournalEntry.js';
import authMiddleware from '../utils/authMiddleware.js';

const router = express.Router();

// GET /api/journal?date=YYYY-MM-DD (protected)
// Returns the shared journal document for the specified date.
router.get('/', authMiddleware, async (req, res) => {
  const { date } = req.query;
  try {
    const entry = await JournalEntry.findOne({ date });
    // If no entry exists, return an object with empty content.
    res.json(entry || { date, content: '' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/journal (protected)
// Upsert the shared journal entry for the specified date.
// The request body should include: { date, content }
// The content is expected to contain all contributions (e.g. HTML markup with colored spans).
router.post('/', authMiddleware, async (req, res) => {
  const { date, content } = req.body;
  try {
    const entry = await JournalEntry.findOneAndUpdate(
      { date },
      { content },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    res.json(entry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
