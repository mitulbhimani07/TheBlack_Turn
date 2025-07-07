const mongoose = require('mongoose');

const SongSchema = new mongoose.Schema({
  songName: { type: String, required: true },
  releaseDate: { type: Date, required: true },
  audioFile: { type: String, required: true }, // file path or URL
  singers: { type: String, required: true },
  composers: { type: String, required: true },
  lyricists: { type: String, required: true },
  language: { type: String, required: true },
  genre: { type: String, required: true },
  subgenre: { type: String, required: true },
  explicitContent: { type: String, required: true },
  contentId: { type: String, required: true },
  callerTuneStart: { type: String },
  spotifyArtistIds: { type: String },
  appleArtistIds: { type: String },
  producer: { type: String },
  featuredArtist: { type: String },
  editors: { type: String },
  composerAppleId: { type: String },
  composerSpotifyId: { type: String },
  lyricistAppleId: { type: String },
  lyricistSpotifyId: { type: String },
  guitarist: { type: String },
  bassPlayer: { type: String },
  drummer: { type: String },
  harmonicaPlayer: { type: String },
  facebookArtistId: { type: String },
  composerFacebookId: { type: String },
  lyricistFacebookId: { type: String }
});

const AlbumSchema = new mongoose.Schema({
  albumName: { type: String, required: true },
  albumArtwork: { type: String, required: true }, // file path or URL
  couponCode: { type: String },
  songs: [SongSchema],
  price: { type: Number, default: 1999 },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ReleaseNewAlbum', AlbumSchema);