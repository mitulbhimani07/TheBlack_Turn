const qs = require('qs');
const Album = require('../model/ReleseNewAlbumModel');
const multer = require('multer');

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'upload/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });
module.exports.upload = upload;

const normalizePath = (file) => file ? file.path.replace(/\\\\/g, '/').replace(/\\/g, '/') : '';

module.exports.createAlbum = async (req, res) => {
  try {
    const parsedBody = qs.parse(req.body); // Deep parse nested form-data
    const albumArtwork = normalizePath(req.files?.albumArtwork?.[0]);
    const audioFiles = req.files?.audioFile || [];

    // Debug logging
    console.log('Total songs sent:', parsedBody.songs ? Object.keys(parsedBody.songs).length : 0);
    console.log('Total audio files uploaded:', audioFiles.length);

    const rawSongs = parsedBody.songs;

    // Convert songs to array
    const songsArray = Array.isArray(rawSongs)
      ? rawSongs
      : typeof rawSongs === 'object' && rawSongs !== null
        ? Object.values(rawSongs)
        : [];

    if (!songsArray.length || songsArray.length !== audioFiles.length) {
      return res.status(400).json({
        message: 'Invalid songs format or mismatched audio files'
      });
    }

    // Combine each song with its corresponding audio file
    const songs = songsArray.map((song, idx) => ({
      ...song,
      audioFile: normalizePath(audioFiles[idx])
    }));

    // Create the album with one record and nested songs
    const album = await Album.create({
      albumName: parsedBody.albumName,
      albumArtwork,
      couponCode: parsedBody.couponCode,
      price: parsedBody.price,
      userId: req.user,
      songs
    });

    res.status(201).json({
      status: 'Success',
      message: 'Album and songs uploaded successfully',
      data: album
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      message: 'Internal server error',
      error: error.message
    });
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