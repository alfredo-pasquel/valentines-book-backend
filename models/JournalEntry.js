// models/JournalEntry.js
import mongoose from 'mongoose';

const JournalEntrySchema = new mongoose.Schema({
  date: { type: String, required: true }, // Format: YYYY-MM-DD
  content: { type: String, required: true } // Shared content (e.g. HTML with colored spans)
});

const JournalEntry = mongoose.model('JournalEntry', JournalEntrySchema);
export default JournalEntry;
