const Booking = require("../models/bookingModel");

async function updateBookingStatus (req, res) {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const booking = await Booking.findByIdAndUpdate(
      id,
      { status:"PROCESS" },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    res.json({ success: true, message: 'Booking status updated', data: booking });
  } catch (error) {
    console.error('Error updating booking status:', error); // Log the error for debugging
    res.status(500).json({ success: false, message: 'Failed to update booking status', error });
  }
  };

  module.exports = updateBookingStatus