const Album = require('../model/ReleseNewAlbumModel');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'upload/'); // Save to upload/ folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

module.exports.upload = upload;

const normalizePath = (file) => {
    return file ? file.path.replace(/\\/g, '/') : '';
};

// Create a new album
module.exports.createAlbum = async (req, res) => {
    try {
        const { body, files } = req;

        // Convert all file paths to forward slashes
        const albumArtwork = normalizePath(files['albumArtwork']?.[0]);
        const audioFile = normalizePath(files['audioFile']?.[0]);

        const AlbumData = {
          userId:req.user,
            ...body,
            albumArtwork,
            audioFile,
        };

        const data = await Album.create(AlbumData);

        res.status(200).json({
            status: "Relese New Album Successfully add",
            data
        });
    } catch (error) {
        console.error('Error adding NOC Information:', error);
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