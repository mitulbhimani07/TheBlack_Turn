const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const multer = require('multer');

// ✅ Require controller (DO NOT change this path)
const OnlyCallerTuneCTR = require('../controller/OnlyCallerTuneController');

// ✅ Ensure folders exist
const ensureUploadDirs = () => {
    const artworkDir = path.join(__dirname, '..', 'upload', 'artwork');
    const audioDir = path.join(__dirname, '..', 'upload', 'audio');
    if (!fs.existsSync(artworkDir)) fs.mkdirSync(artworkDir, { recursive: true });
    if (!fs.existsSync(audioDir)) fs.mkdirSync(audioDir, { recursive: true });
};
ensureUploadDirs();

// ✅ Multer setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const folder = file.fieldname === 'artwork' ? 'artwork' : 'audio';
        cb(null, path.join(__dirname, '..', 'upload', folder));
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + '_' + file.originalname.replace(/\s+/g, '_');
        cb(null, uniqueName);
    }
});

const upload = multer({ storage });

// ✅ Add route using multer middleware
router.post(
    '/create',
    upload.fields([
        { name: 'artwork', maxCount: 1 },
        { name: 'audio', maxCount: 1 }
    ]),
    OnlyCallerTuneCTR.createOnlyCallerTune
);

module.exports = router;
