const BlogModel = require('../model/blogModel');
module.exports.createBlog = async (req, res) => {
    try {
        // Validate request body
        const newBlogData = BlogModel.create(req.body);
        res.status(201).json({ message: 'Blog created successfully', data: newBlogData });
        console.log('Received request to add blog:', req.body);
    } catch (error) {
        console.error('Error adding blog:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}