const express = require("express");
const singleSongCTRoutes = express.Router();
const SingleSongCTController = require("../controller/singleSongCTController");
const multer = require("multer");

// Multer setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === "songPoster") {
            cb(null, "upload");
        } else if (file.fieldname === "audio") {
            cb(null, "upload/audio");
        }
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// Routes
singleSongCTRoutes.post(
    "/create",
    upload.fields([
        { name: "songPoster", maxCount: 1 },
        { name: "audio", maxCount: 1 }
    ]),
    SingleSongCTController.createSingleSongCt
);

singleSongCTRoutes.get("/all", SingleSongCTController.getAllSongs);

module.exports = singleSongCTRoutes;
