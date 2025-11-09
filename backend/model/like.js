const mongoose = require("mongoose");


const likeSchema =  new mongoose.Schema({
   movieId : {
        type :  mongoose.Schema.Types.ObjectId,
        ref : "movie",
        required : true
   },
   likedBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        required : true
   },
   likeAt : {
     type : Date,
     default :  Date.now
   }
})

module.exports =  mongoose.model("like",likeSchema);