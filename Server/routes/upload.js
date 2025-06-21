const router = require('express').Router();
const cloudinary = require('cloudinary').v2;
const auth = require('../middlewares/auth');
const authAdmin = require('../middlewares/authAdmin');
const fs = require('fs');
require('dotenv').config();

// Ensure Cloudinary config values exist
if (!process.env.CLOUD_NAME || !process.env.CLOUD_API_KEY || !process.env.CLOUD_API_SECRET) {
  console.error("❌ Cloudinary credentials are missing in .env file");
}

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Upload image route
router.post('/upload', auth, authAdmin, (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ msg: 'No file was uploaded' });
    }

    const file = req.files.file;

    if (!file || !file.tempFilePath) {
      return res.status(400).json({ msg: 'File is missing or not properly uploaded' });
    }

    if (file.size > 1024 * 1024) {
      removeTmp(file.tempFilePath);
      return res.status(400).json({ msg: 'File size too large. Max 1MB allowed.' });
    }

    const allowedTypes = ['image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.mimetype)) {
      removeTmp(file.tempFilePath);
      return res.status(400).json({ msg: 'Only JPEG and PNG formats are allowed.' });
    }

    cloudinary.uploader.upload(file.tempFilePath, { folder: 'test' }, (err, result) => {
      removeTmp(file.tempFilePath);

      if (err) {
        console.error("Cloudinary Upload Error:", err);
        return res.status(500).json({ msg: 'Cloudinary upload failed', error: err.message });
      }

      res.json({
        public_id: result.public_id,
        url: result.secure_url,
      });
    });

  } catch (err) {
    console.error("Upload Route Error:", err);
    return res.status(500).json({ msg: err.message });
  }
});

// Delete image route
router.post('/destroy', auth, authAdmin, (req, res) => {
  try {
    const { public_id } = req.body;
    if (!public_id) return res.status(400).json({ msg: 'No image selected' });

    cloudinary.uploader.destroy(public_id, (err, result) => {
      if (err) {
        console.error("Cloudinary Destroy Error:", err);
        return res.status(500).json({ msg: 'Failed to delete image', error: err.message });
      }

      res.json({ msg: 'Image deleted successfully' });
    });
  } catch (err) {
    console.error("Destroy Route Error:", err);
    return res.status(500).json({ msg: err.message });
  }
});

// Temp file cleaner
const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) console.error("Failed to remove temp file:", err.message);
  });
};

module.exports = router;
