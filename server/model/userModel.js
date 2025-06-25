const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        // required: true,
        trim: true
    },
    email: {
        type: String,
        // required: true,
        trim: true
    },
    password: {
        type: String,
        // required: true,
        trim: true
    },
    conPassword: {
        type: String,
    },

}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);