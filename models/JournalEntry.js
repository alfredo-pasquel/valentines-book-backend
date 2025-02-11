// models/JournalEntry.js
import mongoose from 'mongoose';

const JournalEntrySchema = new mongoose.Schema({
  date: { type: String, required: true }, // Format: YYYY-MM-DD
  title: { type: String, required: true },
  content: { type: String, required: true },
});

const JournalEntry = mongoose.model('JournalEntry', JournalEntrySchema);
export default JournalEntry;
