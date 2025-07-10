const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const singleSongWithoutCTController = require("../controller/singleSongWithoutCTController");
const Auth = require("../Middleware/jwt");

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads"); // Make sure this directory exists
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ 
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Create a new song without caller tune
router.post(
  "/create",
  Auth,
  upload.fields([
    { name: "songPoster", maxCount: 1 },
    { name: "audio", maxCount: 1 }
  ]),
  singleSongWithoutCTController.createSingleSongWithoutCt // Fixed function name
);

// Get all songs
router.get("/all", singleSongWithoutCTController.getAllSongs);

module.exports = router;