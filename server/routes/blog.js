const express = require('express');
const route = express.Router();
const BlogController = require('../controller/blogController');

// Use BlogController.upload.single('image') for file upload middleware
route.post('/create', BlogController.upload.single('image'), BlogController.createBlog);

console.log('Blog route loaded successfully');
module.exports = route;