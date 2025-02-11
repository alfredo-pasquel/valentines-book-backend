import mongoose from 'mongoose';

const GalleryImageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  key: { type: String, required: true },
  description: { type: String, default: '' },
  uploadedAt: { type: Date, default: Date.now }
});

const GalleryImage = mongoose.model('GalleryImage', GalleryImageSchema);
export default GalleryImage;
