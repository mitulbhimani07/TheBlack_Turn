const mongoose = require("mongoose");

const SingleSongWithoutCTSchema = new mongoose.Schema({
  userId: { type: String },
  couponCode: { type: String },
  songName: { type: String },
  albumName: { type: String },
  releaseDate: { type: String },
  artwork: { type: String },
  audio: { type: String },
  singer: { type: String },
  language: { type: String },
  explicitContent: { type: String },
  genre: { type: String },
  musicComposer: { type: String },
  youTubeContentID: { type: String },
  songWriter: { type: String },
  subGenre: { type: String },
  useAI: { type: String },
  additionalCredit: { type: String },
  description: { type: String },
  originalWork: { type: Boolean },
  agreeTerms: { type: Boolean }
}, { timestamps: true });

module.exports = mongoose.model("SingleSongWithoutCT", SingleSongWithoutCTSchema);
