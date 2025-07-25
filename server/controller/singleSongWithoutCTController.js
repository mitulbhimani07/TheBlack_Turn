const SingleSongWithoutCT = require("../model/singleSongWithoutCTModel");

exports.createSingleSongWithoutCt = async (req, res) => {
  try {
    const artwork = req.files?.artwork?.[0]?.filename || "";
    const audio = req.files?.audio?.[0]?.filename || "";
    console.log('FILES:', req.files);

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
    const userId = req.user; 
    const songs = await SingleSongWithoutCT.findOne({ userId });
    res.status(200).json({ success: true, data: songs });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch songs", error: error.message });
  }
};

exports.viewSingleSongWithoutCT = async (req, res) => {
  try {
    const song = await SingleSongWithoutCT.findById(req.params.id);
    if (!song) {
      return res.status(404).json({ success: false, message: "Song not found" });
    }
    res.status(200).json({ success: true, data: song });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch song", error: error.message });
  }
}
