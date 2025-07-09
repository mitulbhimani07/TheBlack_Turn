const express = require('express');
const route = express.Router();
const AlbumController = require('../controller/ReleseNewAlbumController');
const Auth =require('../Middleware/jwt')

// Create album
route.post('/create',AlbumController.upload.fields([
     { name: 'albumArtwork', maxCount: 1 },
    { name: 'audioFile', maxCount: 20 },
]) ,Auth,AlbumController.createAlbum);

// Get all albums
route.get('/all', AlbumController.getAllAlbums);

// Get album by id
route.get('/:id', AlbumController.getAlbumById);

module.exports = route