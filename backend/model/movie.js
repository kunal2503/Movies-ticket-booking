const mongoose = require("mongoose");

const moviesSchema =  mongoose.Schema({
    moviesName : {
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
    images : {
        type : String,
    }
})

const movie =  mongoose.model("movie",moviesSchema);

module.exports = movie;