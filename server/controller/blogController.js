const BlogModel = require('../model/blogModel');
const multer = require('multer');

// Set up multer storage for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'upload/'); // Directory to save uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Unique filename
    }
});

const upload = multer({ storage: storage }); // Use the custom storage

// For handling image upload, use this middleware in your route:
// Example: router.post('/blog', upload.single('image'), createBlog);

module.exports.upload = upload; // Export for use in your routes

module.exports.createBlog = async (req, res) => {
    try {
        const { title, content, author,Description,publishDate } = req.body;
        let image = req.body.image;

        // If image is uploaded as a file
        if (req.file) {
            image = req.file.path; // Save the uploaded file path
        }

        // Create new blog
        const newBlog = await BlogModel.create({
            image,
            title,
            content,
            author,
            Description,
            publishDate
        });

        res.status(201).json({ message: 'Blog created successfully', data: newBlog });
        console.log('Received request to add blog:', req.body);
    } catch (error) {
        console.error('Error adding blog:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
module.exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await BlogModel.find();
        console.log('Received request to get all blogs');
        res.status(200).json({ message: 'Blogs retrieved successfully', data: blogs });
    } catch (error) {
        console.error('Error retrieving blogs:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
module.exports.getBlogById = async (req, res) => {
    try {
        const blogId = req.params.id;
        const blog = await BlogModel.findById(blogId);
        console.log('Received request to get blog by id:', blogId);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.status(200).json({ message: 'Blog retrieved successfully', data: blog });
    } catch (error) {
        console.error('Error retrieving blog by id:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}