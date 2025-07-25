const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const singleSongWithoutCTController = require("../controller/singleSongWithoutCTController");
const Auth = require("../Middleware/jwt");

// Ensure uploads folder exists
const uploadDir = "upload";
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const upload = multer({ storage });

// Create song route
router.post(
  "/create",
  Auth,
  upload.fields([
    { name: "artwork", maxCount: 1 },
    { name: "audio", maxCount: 1 }
  ]),
  singleSongWithoutCTController.createSingleSongWithoutCt
);

// Get all songs route
router.get("/all", Auth,singleSongWithoutCTController.getAllSongs);
router.get(
  "/:id",
  Auth,singleSongWithoutCTController.viewSingleSongWithoutCT
);

module.exports = router;
