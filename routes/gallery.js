// routes/gallery.js
import express from 'express';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import aws from 'aws-sdk';
import GalleryImage from '../models/GalleryImage.js';
import authMiddleware from '../utils/authMiddleware.js';

const router = express.Router();

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Configure AWS S3 using environment variables
const s3 = new aws.S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

// GET /api/gallery - fetch images (protected)
// This endpoint generates presigned URLs for each image so that only authenticated users can access them.
router.get('/', authMiddleware, async (req, res) => {
  try {
    const images = await GalleryImage.find();
    const presignedImages = await Promise.all(
      images.map(async (image) => {
        const signedUrl = await s3.getSignedUrlPromise('getObject', {
          Bucket: process.env.BUCKET_NAME,
          Key: image.key,
          Expires: 60 * 60, // 1 hour validity
        });
        return { ...image.toObject(), url: signedUrl };
      })
    );
    res.json(presignedImages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/gallery/upload - upload image to S3 and save URL & key (protected)
router.post('/upload', authMiddleware, upload.single('image'), async (req, res) => {
  const file = req.file;
  const key = `${uuidv4()}-${file.originalname}`;
  try {
    const uploadResult = await s3.upload({
      Bucket: process.env.BUCKET_NAME,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
      // Do not set ACL if the bucket is private.
    }).promise();

    const newImage = new GalleryImage({ url: uploadResult.Location, key });
    await newImage.save();
    res.json(newImage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/gallery/:id - delete image (protected)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const image = await GalleryImage.findById(req.params.id);
    if (!image) return res.status(404).json({ error: 'Image not found' });

    // Optionally, delete the object from S3:
    // const key = image.key;
    // await s3.deleteObject({
    //   Bucket: process.env.BUCKET_NAME,
    //   Key: key,
    // }).promise();

    await image.deleteOne();
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
