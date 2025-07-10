const mongoose = require('mongoose');

const NOCForm = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    fullname: {
        type: String
    },
    labelname: {
        type: String
    },
    email: {
        type: String
    },
    phoneno: {
        type: String
    },
    accountholdername: {
        type: String
    },
    bankName: {
        type: String
    },
    accountNo: {
        type: String
    },
    IFSCcode: {
        type: String
    },
    PANCardNo: {
        type: String
    },
    AadhaarCardNo: {
        type: String
    },
    PANCardphoto: {
        type: String
    },
    AadharCardFront: {
        type: String
    },
    AadharCardBack: {
        type: String
    },
    cancelledPassbook: {
        type: String
    },
    Signature: {
        type: String
    }
})

module.exports = mongoose.model('NOCForm', NOCForm)