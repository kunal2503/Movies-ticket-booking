const mongo = require("mongoose");


const connectDb = async() =>{
    try{
        await mongo.connect("mongodb://localhost:27017/movies-booking-system");
    } catch(error){
        console.log(error);
    }
}

module.exports =  connectDb;