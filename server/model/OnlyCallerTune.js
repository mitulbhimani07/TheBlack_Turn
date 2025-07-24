const mongoose = require('mongoose');

const OnlyCallerTuneSchema = new mongoose.Schema({
  songName: { type: String, required: true },
  albumName: { type: String, required: true },
  releaseDate: { type: Date, required: true },
  artwork: { type: String }, // file path or URL
  audio: { type: String },   // file path or URL
  primaryArtist: { type: String, required: true },
  language: { type: String, required: true },
  musicComposer: { type: String, required: true },
  genre: { type: String, required: true },
  callerTuneName1: { type: String, required: true },
  callerTuneStart1: { type: String, required: true },
  callerTuneName2: { type: String },
  callerTuneStart2: { type: String },
  explicitContent: { type: String, enum: ['Yes', 'No'], default: 'No' },
  youtubeContentId: { type: String, enum: ['Yes', 'No'], default: 'Yes' },
  usedAI: { type: String, enum: ['Yes', 'No'], default: 'Yes' },
  originalWork: { type: Boolean, default: false },
  agreeTerms: { type: Boolean, default: false },
  appleSpotifyLinks: { type: String },
  oldISRCUPC: { type: String },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    // required: true
  },
}, { timestamps: true });

module.exports = mongoose.model('OnlyCallerTune', OnlyCallerTuneSchema);
