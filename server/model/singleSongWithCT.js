
const mongoose = require("mongoose")

const SingleSongCT = new mongoose.Schema({
    songName: {
        type: String
    },
    albumName: {
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
    musicComposer: {
        type: String
    },
    songWriter: {
        type: String
    },
    language: {
        type: String
    },
    genre: {
        type: String
    },
    subGenre: {
        type: String
    },
    firstCallerTune: {
        type: String
    },
    firstCallerTuneTime: {
        type: String
    },
    secondCallerTune: {
        type: String
    },
    secondCallerTuneTime: {
        type: String
    },
    explicitContent: {
        type: String
    },
    youTubeContentID: {
        type: String
    },
    useAI: {
        type: String
    },
    description: {
        type: String
    },
     originalWork: {
        type: String
    },
    agreeTerms: {
        type: String
    }





})

module.exports = mongoose.model("SingleSongCT", SingleSongCT)