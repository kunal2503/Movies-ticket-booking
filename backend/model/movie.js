const mongoose = require("mongoose");

const moviesSchema =  mongoose.Schema({
    movieName : {
        type : String,
        required  : true
    },
    category : {
        type : String,
        require: true,
        // enum : []
    },
    description : {
        type :String,
        require : true,
    },
    image : {
        type : String,
    },
    releaseDate : {
        type : Date,
        default : Date.now,
        require : true,
    },
    language : {
        type : String,
        require : true,
    },
    likes : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "like"
    }
})

module.exports =  mongoose.model("movie",moviesSchema);

