const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    image : {
        type: String,
        // required: true,
        trim: true
        },
    title: {
        type: String,
        // required: true,
        trim: true
    },
    content: {
        type: String,
        // required: true,
        trim: true
        },
    author: {
        type: String,
        // required: true,
        trim: true
    },
    Description:{
        type:String,
    },
     publishDate: {
        type: Date,
        default: Date.now
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Blog', blogSchema);