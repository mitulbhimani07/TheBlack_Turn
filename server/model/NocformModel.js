const mongoose = require('mongoose');

const NOCForm=new mongoose.Schema({
    fullname:{
        type:String
    },
    labelname:{
        type:String
    },
    email:{
        type:String
    },
    phoneno:{
        type:String
    },
    accountholdername:{
        type:String
    },
    bankName:{
        type:String
    },
    accountNo:{
        type:String
    },
    IFSCcode:{
        type:String
    },
    PANCardphoto:{
        type:String
    },
    AadharCardFront:{
        type:String
    },
    AadharCardBack:{
        type:String
    },
    cancelledPassbook:{
        type:String
    },
    Signature:{
        type:String
    }
})

module.exports=mongoose.model('NOCForm',NOCForm)