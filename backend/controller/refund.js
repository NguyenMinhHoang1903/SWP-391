// refundController.js

const Refund = require("../models/refundModel");
const Booking = require("../models/bookingModel");
const User = require("../models/userModel");


// Controller to create a new refund request
const createRefund = async (req, res) => {
  const id = req.params.id;

  try {
    // Find the booking by ID
    const existingBooking = await Booking.findById(id);
    if (!existingBooking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    // Check if refund already requested for this booking
    const existingRefund = await Refund.findOne({ bookingID: id });
    if (existingRefund) {
      return res.status(400).json({ success: false, message: "Refund already requested for this booking" });
    }

    // Find the user requesting the refund
    const existingUser = await User.findOne({ name: req.body.userName });
    if (!existingUser) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    // Calculate refund amount based on booking cancellation policy
    const refundAmount = calculateRefundAmount(existingBooking);

    // Check if user has sufficient balance in wallet
    if (existingUser.wallet < refundAmount) {
      return res.status(400).json({ success: false, message: "Insufficient balance in wallet for refund" });
    }

    // Deduct refundAmount from user's wallet
    const updatedUser = await User.findOneAndUpdate(
      { name: req.body.userName },
      { $inc: { wallet: refundAmount } }, // Increase wallet amount
      { new: true } // Return updated document
    );

    if (!updatedUser) {
      return res.status(500).json({ success: false, message: "Failed to update user's wallet" });
    }

    // Create new refund record
    const newRefundData = {
      userName: req.body.userName,
      bookingID: id,
      reason: req.body.reason,
      bank: req.body.bank,
      bankNumber: req.body.bankNumber,
      holder: req.body.holder,
      amount: refundAmount,
      status: req.body.status || "PENDING",
    };

    const newRefund = new Refund(newRefundData);
    const result = await newRefund.save();

    // Update booking status to "CANCELLED"
    await Booking.updateOne({ _id: id }, { status: "CANCELLED" });

    // Respond with success message and data
    res.status(201).json({ success: true, message: "Refund created successfully", data: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to create refund" });
  }
};

// Helper function to calculate refund amount based on booking cancellation policy
const calculateRefundAmount = (booking) => {
  const bookingDate = new Date(booking.date);
  const currentTime = new Date();
  const hoursDiff = (bookingDate - currentTime) / (1000 * 60 * 60);

  if (hoursDiff > 12) {
    return booking.total; // 100% refund
  } else {
    return booking.total * 0.7; // 70% refund
  }
};

module.exports = {
  createRefund,
};
