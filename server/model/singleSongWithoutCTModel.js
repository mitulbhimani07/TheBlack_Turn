const mongoose = require("mongoose")

const SingleSongWithoutCT = new mongoose.Schema({
    couponCode: {
        type: String
    },
    songName: {
        type: String
    },
    aboutName: {
        type: String
    },
    releseDate: {
        type: String
    },
    songPoster: {
        type: String
    },
    audio: {
        type: String
    },
    singer: {
        type: String
    },
    language: {
        type: String
    },
    explicitContent: {
        type: String
    },
    genre: {
        type: String
    },
    musicComposer: {
        type: String
    },
    youTubeContentID: {
        type: String
    },
    songWriter: {
        type: String
    },
    subGenre: {
        type: String
    },
    useAI: {
        type: String
    },
    additionalCredit: {
        type: String
    },
    description: {
        type: String
    },
    explicitContent: {
        type: String
    },
    originalWork: {
        type: String
    },
    agreeTerms: {
        type: String
    }
})

module.exports = mongoose.model("SingleSongWithoutCT", SingleSongWithoutCT)
