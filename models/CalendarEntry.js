import mongoose from 'mongoose';

const CalendarEntrySchema = new mongoose.Schema({
  date: { type: String, required: true }, // e.g. "YYYY-MM-DD"
  title: { type: String, required: true },
  description: { type: String, required: true },
});

const CalendarEntry = mongoose.model('CalendarEntry', CalendarEntrySchema);
export default CalendarEntry;
