const express = require('express');
const route = express.Router();
const AlbumController = require('../controller/ReleseNewAlbumController');

// Create album
route.post('/create', AlbumController.createAlbum);

// Get all albums
route.get('/all', AlbumController.getAllAlbums);

// Get album by id
route.get('/:id', AlbumController.getAlbumById);

module.exports = route