const express = require('express');
const route = express.Router();
const BlogController = require('../controller/blogController');
route.post('/create', BlogController.createBlog);
console.log('Blog model loaded successfully');

module.exports = route;