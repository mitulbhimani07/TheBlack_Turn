
const mongoose=require("mongoose")

const SingleSongCT=new mongoose.Schema({
    songName:{
        type:String
    },
    albumName:{
        type:String
    },
    releseDate:{
        type:String
    }

})

module.exports=mongoose.model("SingleSongCT",SingleSongCT)