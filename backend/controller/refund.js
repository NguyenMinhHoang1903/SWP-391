const Refund = require("../models/refundModel");
const Booking = require("../models/bookingModel");

const indexRefund = (req, res) => {
  res.send("<h1>This is Refund page</h1>");
};

// CREATE
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

    const newRefundData = {
      userName: req.body.userName,
      bookingID: id,
      reason: req.body.reason,
      bank: req.body.bank,
      bankNumber: req.body.bankNumber,
      holder: req.body.holder,
      amount: req.body.amount,
      status: req.body.status || "Pending", // Set default status to "Pending"
    };

    const newRefund = new Refund(newRefundData);
    const result = await newRefund.save();

    await Booking.updateOne({ _id: id }, { status: "Cancelled" });

    res.status(201).json({ success: true, message: "Refund created successfully", data: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to create refund" });
  }
};

module.exports = {
  indexRefund,
  createRefund,
};
