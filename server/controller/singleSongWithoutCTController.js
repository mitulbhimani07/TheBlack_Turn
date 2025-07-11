const SingleSongWithoutCT = require("../model/singleSongWithoutCTModel");

exports.createSingleSongWithoutCt = async (req, res) => {
  try {
    const artwork = req.files?.artwork?.[0]?.filename || "";
    const audio = req.files?.audio?.[0]?.filename || "";

    const newSong = new SingleSongWithoutCT({
      ...req.body,
      artwork,
      audio,
      userId: req.user
    });

    await newSong.save();
    res.status(201).json({ success: true, message: "Song created", data: newSong });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to create song", error: error.message });
  }
};

exports.getAllSongs = async (req, res) => {
  try {
    const songs = await SingleSongWithoutCT.find();
    res.status(200).json({ success: true, data: songs });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch songs", error: error.message });
  }
};
