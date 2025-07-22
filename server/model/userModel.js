const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    fname: {
        type: String,
        // required: true,
        trim: true
    },
    lname:{
        type:String
    },
    name:{
        type:String
    },
    email: {
        type: String,
        unique:true,
        required: true,
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
    profilepic:{
        type:String
    },
    About:{
        type:String
    },
    address:{
        type:String
    },
    city:{
        type:String
    },
    state:{
        type:String
    },
    pincode:{
        type:String
    },
    country:{
        type:String
    },
    phone:{
        type:String
    },

}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);