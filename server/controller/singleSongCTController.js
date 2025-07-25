const SingleSongCT = require("../model/singleSongWithCT");

module.exports.createSingleSongCt = async (req, res) => {
    try {
        const songPoster = req.files?.songPoster?.[0]?.filename || "";
        const audio = req.files?.audio?.[0]?.filename || "";

        const newSong = new SingleSongCT({
            ...req.body,
            songPoster,
            audio,
            userId: req.user

        });

        await newSong.save();
        res.status(201).json({ success: true, message: "Song created successfully", data: newSong });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error creating song", error: error.message });
    }
};


module.exports.getAllSongs = async (req, res) => {
  try {
    const userId = req.user;  // must be set by JWT middleware
    const songs = await SingleSongCT.find({ userId });
    res.status(200).json({ success: true, data: songs });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching songs", error: error.message });
  }
};
module.exports.getSingleSongCTById = async (req, res) => {
    try {
        const song = await SingleSongCT.findById(req.params.id);
        res.status(200).json({ success: true, data: song });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching song", error: error.message });
    }
};