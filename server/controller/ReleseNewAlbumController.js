const Album = require('../model/ReleseNewAlbumModel');
const multer = require('multer');
const qs = require('qs'); // for nested parsing

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'upload/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });
module.exports.upload = upload;

// Normalize file path
const normalizePath = (file) => {
  return file ? file.path.replace(/\\\\/g, '/') : '';
};

module.exports.createAlbum = async (req, res) => {
  try {
    // Parse nested fields correctly
    const parsedBody = qs.parse(req.body);

    const albumArtwork = normalizePath(req.files?.albumArtwork?.[0]);
    const audioFiles = req.files?.audioFile || [];

    // parsedBody.songs is an array of song objects
    if (!Array.isArray(parsedBody.songs)) {
      return res.status(400).json({ message: 'Invalid songs format' });
    }

    const songs = parsedBody.songs.map((song, idx) => ({
      ...song,
      albumName: parsedBody.albumName,
      albumArtwork: albumArtwork,
      couponCode: parsedBody.couponCode,
      price: parsedBody.price,
      audioFile: normalizePath(audioFiles[idx]), // match index to file
      userId: req.user,
    }));

    const saved = await Album.insertMany(songs);

    res.status(200).json({
      status: 'Success',
      message: 'Album created with multiple songs',
      data: saved,
    });
  } catch (error) {
    console.error('Error in createAlbum:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all albums
module.exports.getAllAlbums = async (req, res) => {
  try {
    const albums = await Album.find();
    res.status(200).json({ message: 'Albums fetched successfully', data: albums });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching albums', error: error.message });
  }
};

// Get album by ID
module.exports.getAlbumById = async (req, res) => {
  try {
    const album = await Album.findById(req.params.id);
    if (!album) return res.status(404).json({ message: 'Album not found' });
    res.status(200).json({ message: 'Album fetched successfully', data: album });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching album', error: error.message });
  }
};