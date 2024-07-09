const Booking = require('../models/bookingModel');

const allListBooking = async (req, res) => {
  try {
    const allBookingUser = await Booking.find()

    res.json({
      message: "All User ",
      data: allBookingUser,
      success: true,
      error: false
    })
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false
    })
  }
};

module.exports = {
  allListBooking,
};
