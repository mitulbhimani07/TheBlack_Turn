const OnlyCallerTune = require('../model/OnlyCallerTune');
const path = require('path');
const fs = require('fs');

// Add OnlyCallerTune data (requires user login)
module.exports.createOnlyCallerTune = async (req, res) => {
    try {
        // Handle file uploads (audio and artwork)
        let artworkPath = '';
        let audioPath = '';

        if (req.files && req.files.artwork) {
            const artwork = req.files.artwork;
            artworkPath = 'upload/artwork/' + Date.now() + '_' + artwork.name;
            await artwork.mv(path.join(__dirname, '..', artworkPath));
        }

        if (req.files && req.files.audio) {
            const audio = req.files.audio;
            audioPath = 'upload/audio/' + Date.now() + '_' + audio.name;
            await audio.mv(path.join(__dirname, '..', audioPath));
        }

        // Prepare data for MongoDB
        const OnlyCallerTuneData = await OnlyCallerTune.create({
            ...req.body,
            artwork: artworkPath,
            audio: audioPath
        });

        res.status(201).json({
            message: 'OnlyCallerTune created successfully',
            data: OnlyCallerTuneData
        });
    } catch (err) {
        res.status(500).json({
            message: 'Error creating OnlyCallerTune',
            error: err
        });
    }
};
module.exports.viewOnlyCallerTuneData = async (req, res) => {
    try {
        const viewData = await OnlyCallerTune.find()
        
        res.status(200).json({
            message: 'OnlyCallerTune data retrieved successfully',
            data: viewData
        });

    } catch (error) {

    }
}