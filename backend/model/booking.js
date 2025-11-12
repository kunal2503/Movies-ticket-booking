const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "movie",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  seatNumbers: {
    type: [String],
    required: true,
  },
  showTime: {
    type: Date,
    default : Date.now,
    required: true,
  },
  ticketPrice: {
    type: Number,
    default : 0,
    required: true,
  },
  status: {
    type: String,
    enum: ["booked", "cancelled", "pending"],
    default: "pending",
  },
  date: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });


module.exports = mongoose.model("booking", bookingSchema);
