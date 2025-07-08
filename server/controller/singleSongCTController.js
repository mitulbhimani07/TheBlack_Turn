const SingleSongCT = require("../model/singleSongWithCT");
const path = require("path");

// Create new song entry
module.exports.createSingleSongCt = async (req, res) => {
    try {
        const {
            songName,
            albumName,
            releseDate,
            singer,
            musicComposer,
            songWriter,
            language,
            genre,
            subGenre,
            firstCallerTune,
            firstCallerTuneTime,
            secondCallerTune,
            secondCallerTuneTime,
            explicitContent,
            youTubeContentID,
            useAI,
            description
        } = req.body;

        const songPoster = req.files?.songPoster?.[0]?.filename || "";
        const audio = req.files?.audio?.[0]?.filename || "";

        const newSong = new SingleSongCT({
            songName,
            albumName,
            releseDate,
            songPoster,
            audio,
            singer,
            musicComposer,
            songWriter,
            language,
            genre,
            subGenre,
            firstCallerTune,
            firstCallerTuneTime,
            secondCallerTune,
            secondCallerTuneTime,
            explicitContent,
            youTubeContentID,
            useAI,
            description
        });

        await newSong.save();
        res.status(201).json({ success: true, message: "Song created successfully", data: newSong });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error creating song", error: error.message });
    }
};

// Get all songs
module.exports.getAllSongs = async (req, res) => {
    try {
        const songs = await SingleSongCT.find();
        res.status(200).json({ success: true, data: songs });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching songs", error: error.message });
    }
};
