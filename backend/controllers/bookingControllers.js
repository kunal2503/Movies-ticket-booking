const Booking = require("../model/booking");
const Movies = require("../model/movie");
const User =  require("../model/user");


exports.getAllBookings = async(req,res) =>{
    try{

    } catch(error){
        res.status(500).json({message : "Internal server error"});
    }
}
exports.bookMovie = async(req,res) =>{
     try{
        const {movieId,userId} = req.body;
        if(!movieId || !userId){
            return res.status(400).json({message : "UserId and movieId is required"});
        }
        const movieExist = await Movies.findById({_id : movieId});
        const userExist = await User.findById({_id : userId});
        if(!movieExist || !userExist){
            return res.status(404).josn({message : "Not found"});
        }
        const newBooking = new Booking({
            movieId : movieExist._id,
            userId : userExist._id,
            seatNumbers : "101",
            ticketPrice : 159,
            status : "booked"
        });

        await newBooking.save();

        const userBookedMovie =  await Booking.findOne({movieId : movieExist._id});
        if(!userBookedMovie){
           return res.status(201).json({message : "Movies not booked yet"});
        }
        res.status(200).json({message : "Movie booked", userBookedMovie : userBookedMovie});
    } catch(error){
        console.log(error)
        res.status(500).json({message : "Internal server error"});
    }
}
exports.getAllUserBookings = async(req,res) =>{
     try{
        const {userId} = req.body;
        if(!userId) {
            return res.status(400).json({message : "User id is Required"});
        }
        const userExist =  await User.findById({_id : userId});
        if(!userExist){
            return res.status(404).json({message : "User Not Found"});
        }
        const usersAllBookings =  await Booking.find({userId : userExist._id});
        if(!usersAllBookings){
            return res.status(201).json({message : "User not booked any yet"});
        }

        res.status(200).json({Bookings : usersAllBookings});
    } catch(error){
        res.status(500).json({message : "Internal server error"});
    }
}
exports.cancleBooking = async(req,res) =>{
     try{
        const {id} = req.params;

        res.status(200).json({message : "Booking Cancle"});
    } catch(error){
        res.status(500).json({message : "Internal server error"});
    }
}