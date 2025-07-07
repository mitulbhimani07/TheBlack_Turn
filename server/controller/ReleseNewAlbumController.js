const Album = require('../model/ReleseNewAlbumModel');

// Create a new album
module.exports.createAlbum = async (req, res) => {
  try {
    const album = new Album(req.body);
    console.log(req.body);
    await album.save();
    res.status(201).json({ message: 'Album created successfully', data: album });
  } catch (error) {
    res.status(500).json({ message: 'Error creating album', error: error.message });
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