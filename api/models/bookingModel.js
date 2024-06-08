/* eslint-disable prettier/prettier */
const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  roomId: {
    roomNumber: {
      type: Number,
      required: true,
    },
  },
  {timestamps:true,},
});

const BookingModel = mongoose.model("bookings", bookingSchema);

module.exports = BookingModel;
