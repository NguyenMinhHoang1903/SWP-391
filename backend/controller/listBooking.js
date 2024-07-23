const Booking = require('../models/bookingModel');
const moment = require('moment');

const allListBooking = async (req, res) => {
  try {
    const currentTime = moment();
    const deleteBeforeTime = currentTime.add(30, 'minutes').toDate();

    const deleteOlderThanTime = currentTime.subtract(2, 'hours').toDate();
    await Booking.deleteMany({
      status: 'PENDING',
      date: { $lte: deleteBeforeTime }
    });

    await Booking.deleteMany({
      status: 'PENDING',
      createdAt: { $lte: deleteOlderThanTime }
    });

    const cancelTime = Booking.date.subtract(30, 'minutes').toDate();
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

module.exports = {
  allListBooking,
};
