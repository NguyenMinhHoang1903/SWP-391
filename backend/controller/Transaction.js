const Refund = require('../models/refundModel');

// Read booking list
const allRefund = async (req, res) => {
  try {
    const allBooking = await Refund.find();
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
const readOneRefund = async (req, res) => {
  try {
    const id = req.params.id;
    const booking = await Refund.findOne({ _id: id });
    
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
    allRefund,
    readOneRefund,
};
