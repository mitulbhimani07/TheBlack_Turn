const mongoose = require('mongoose');

const SongSchema = new mongoose.Schema({
   albumName: { 
    type: String 
  },
  albumArtwork: { 
    type: String
  },
  songName: { 
    type: String 
  },
  releaseDate: {
     type: Date
  },
  audioFile: {
     type: String 
  }, // file path or URL
  singers: {
     type: String 
  },
  composers: { 
    type: String
  },
  lyricists: {
     type: String 
  },
  language: { 
    type: String 
  },
  genre: { 
    type: String 
  },
  subgenre: { 
    type: String 
  },
  explicitContent: { 
    type: String 
  },
  contentId: { 
    type: String 
  },
  callerTuneStart: { 
    type: String 
  },
  spotifyArtistIds: { 
    type: String 
  },
  newspotifyartist:{
    type:String
  },
  appleArtistIds: { 
    type: String 
  },
  newappleartist:{
    type:String
  },
  producername: { 
    type: String 
  },
  featuredArtist: { 
    type: String 
  },
  editors: { 
    type: String 
  },
  composerAppleId: { 
    type: String 
  },
  composerSpotifyId: { 
    type: String 
  },
  lyricistAppleId: { 
    type: String 
  },
  lyricistSpotifyId: { 
    type: String 
  },
  guitarist: { 
    type: String 
  },
  bassPlayer: { 
    type: String 
  },
  drummer: { 
    type: String 
  },
  harmonicaPlayer: { 
    type: String 
  },
  facebookArtistId: { 
    type: String 
  },
  composerFacebookId: { 
    type: String 
  },
  lyricistFacebookId: { 
    type: String 
  },
  // file path or URL
  couponCode: { 
    type: String 
  },
   price: { 
    type: Number, 
    default: 1999 
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  },
  createdAt: { type: Date, default: Date.now }
});



module.exports = mongoose.model('ReleaseNewAlbum', SongSchema);