const Booking = require('../models/bookingModel');
const moment = require('moment');

// Read booking list
const allMyBooking = async (req, res) => {
  try {
    const currentTime = moment();

    console.log(`Current Time: ${currentTime.format()}`);

    const deleteBeforeTime = currentTime.add(30, 'minutes').toDate();
    await Booking.deleteMany({
      status: 'PENDING',
      date: { $lte: deleteBeforeTime }
    });

    const deleteOlderThanTime = currentTime.subtract(2, 'hours').toDate();
    await Booking.deleteMany({
      status: 'PENDING',
      createdAt: { $lte: deleteOlderThanTime }
    });

    const cancelTime = currentTime.subtract(30, 'minutes').toDate();
    await Booking.updateMany({
      status: 'PROCESS',
      date: { $lte: cancelTime }
    }, {
      $set: { status: 'CANCELLED' }
    });

    const allBookingUser = await Booking.find();

    res.json({
      message: "All User",
      data: allBookingUser,
      success: true,
      error: false
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false
    });
  }
};

// Read one Booking
const readOneBooking = async (req, res) => {
  try {
    const id = req.params.id;
    const booking = await Booking.findOne({ _id: id });
    
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
