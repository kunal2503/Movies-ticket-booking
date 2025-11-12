const express = require("express");
const {getAllBookings,bookMovie,cancleBooking, getAllUserBookings} = require("../controllers/bookingControllers");

const router = express.Router();

router.get("/bookings",getAllBookings);
router.post("/bookings",bookMovie);
router.get("/bookings/:id",getAllUserBookings);
router.delete("/bookings/:id",cancleBooking);

module.exports =  router;