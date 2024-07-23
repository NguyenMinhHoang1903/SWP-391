const Refund = require("../models/refundModel");
const Booking = require("../models/bookingModel");
const User = require("../models/userModel");


const createRefund = async (req, res) => {
  const id = req.params.id;

  try {
    const existingBooking = await Booking.findById(id);
    if (!existingBooking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    const existingRefund = await Refund.findOne({ bookingID: id });
    if (existingRefund) {
      return res.status(400).json({ success: false, message: "Refund already requested for this booking" });
    }

    const existingUser = await User.findOne({ name: req.body.userName });
    if (!existingUser) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    const refundAmount = calculateRefundAmount(existingBooking);

    if (existingUser.wallet < refundAmount) {
      return res.status(400).json({ success: false, message: "Insufficient balance in wallet for refund" });
    }

    const updatedUser = await User.findOneAndUpdate(
      { name: req.body.userName },
      { $inc: { wallet: refundAmount } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(500).json({ success: false, message: "Failed to update user's wallet" });
    }

    const newRefundData = {
      userName: req.body.userName,
      bookingID: id,
      reason: req.body.reason,
      amount: refundAmount,
    };

    const newRefund = new Refund(newRefundData);
    const result = await newRefund.save();

    await Booking.updateOne({ _id: id }, { status: "CANCELLED" });

    res.status(201).json({ success: true, message: "Refund created successfully", data: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to create refund" });
  }
};

const calculateRefundAmount = (booking) => {
  const bookingDate = new Date(booking.date);
  const currentTime = new Date();
  const hoursDiff = (bookingDate - currentTime) / (1000 * 60 * 60);

  if (hoursDiff > 12) {
    return booking.total;
  } else {
    return booking.total * 0.7;
  }
};

module.exports = {
  createRefund,
};
