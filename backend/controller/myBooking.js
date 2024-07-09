const Booking = require('../models/bookingModel');

// Read booking list
const allMyBooking = async (req, res) => {
  try {
    const allBooking = await Booking.find();
    res.json({
      message: "All User Bookings",
      data: allBooking,
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

// Read one Booking
const readOneBooking = async (req, res) => {
  try {
    const id = req.params.id;
    const booking = await Booking.findOne({ _id: id });
    console.log("Booking"+booking)
    console.log("Booking"+req.params.id)
    if (booking) {
      res.json({
        message: "Booking Found",
        data: booking,
        success: true,
        error: false,
      });
    } else {
      res.status(404).json({
        message: "Booking not found",
        error: true,
        success: false,
      });
    }
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = {
  allMyBooking,
  readOneBooking,
};
