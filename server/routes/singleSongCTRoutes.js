const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const SingleSongCTController = require("../controller/singleSongCTController");
const Auth=require("../Middleware/jwt")

// Multer setup (all uploads in one folder)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload"); // simpler — one folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// Upload route with files
router.post(
  "/create",
  upload.fields([
    { name: "songPoster", maxCount: 1 },
    { name: "audio", maxCount: 1 }
  ]),
  Auth,SingleSongCTController.createSingleSongCt
);

// Get all songs
router.get("/all", SingleSongCTController.getAllSongs);

module.exports = router;
