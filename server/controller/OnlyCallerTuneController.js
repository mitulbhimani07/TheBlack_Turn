const OnlyCallerTune = require('../model/OnlyCallerTune');
const path = require('path');

module.exports.createOnlyCallerTune = async (req, res) => {
    try {
        // ✅ Get file paths from multer
        const artworkPath = req.files?.artwork?.[0]?.path || '';
        const audioPath = req.files?.audio?.[0]?.path || '';

        // ✅ Save to MongoDB
        const OnlyCallerTuneData = await OnlyCallerTune.create({
            ...req.body,
            artwork: artworkPath,
            audio: audioPath,
            originalWork: req.body.originalWork === 'true',
            agreeTerms: req.body.agreeTerms === 'true',
        });

        res.status(201).json({
            message: 'OnlyCallerTune created successfully',
            data: OnlyCallerTuneData
        });
    } catch (err) {
        console.error('❌ Error in OnlyCallerTuneController:', err);
        res.status(500).json({
            message: 'Error creating OnlyCallerTune',
            error: err.message
        });
    }
};

module.exports.viewOnlyCallerTuneData = async (req, res) => {
    try {
        const viewData = await OnlyCallerTune.find();

        res.status(200).json({
            message: 'OnlyCallerTune data retrieved successfully',
            data: viewData
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving OnlyCallerTune data',
            error: error.message
        });
    }
};
