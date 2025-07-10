const mongoose = require("mongoose");

const SingleSongWithoutCT = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    couponCode: {
        type: String,
        default: ""
    },
    songName: {
        type: String,
        required: true
    },
    albumName: {
        type: String,
        required: true
    },
    releaseDate: {  // Fixed typo from releseDate
        type: Date,
        required: true
    },
    songPoster: {
        type: String,
        required: true
    },
    audio: {
        type: String,
        required: true
    },
    singer: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    explicitContent: {
        type: String,
        enum: ['Yes', 'No'],
        default: 'No'
    },
    genre: {
        type: String,
        required: true
    },
    musicComposer: {
        type: String,
        required: true
    },
    youTubeContentID: {
        type: String,
        enum: ['Yes', 'No'],
        default: 'Yes'
    },
    songWriter: {
        type: String,
        required: true
    },
    subGenre: {
        type: String,
        required: true
    },
    useAI: {
        type: String,
        enum: ['Yes', 'No'],
        default: 'No'
    },
    additionalCredit: {
        type: String
    },
    description: {
        type: String
    },
    originalWork: {
        type: Boolean,
        default: false
    },
    agreeTerms: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model("SingleSongWithoutCT", SingleSongWithoutCT);