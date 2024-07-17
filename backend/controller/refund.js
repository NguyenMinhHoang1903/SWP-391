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

    const bookingDate = new Date(existingBooking.date);
    const currentTime = new Date();
    const hoursDiff = (bookingDate - currentTime) / (1000 * 60 * 60);

    let refundAmount = 0;
    if (hoursDiff > 12) {
      refundAmount = existingBooking.total; // 100% refund
    } else {
      refundAmount = existingBooking.total * 0.7; // 70% refund
    }

    const newRefundData = {
      userName: req.body.userName,
      bookingID: id,
      reason: req.body.reason,
      bank: req.body.bank,
      bankNumber: req.body.bankNumber,
      holder: req.body.holder,
      amount: refundAmount, // Set the calculated refund amount
      status: req.body.status || "PROCESS", // Set default status to "PROCESS"
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


// Uncomment the other functions if needed
/*
const readAllRefund = async (req, res) => {
  await Refund.find()
    .sort({ userName: 1 })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

const readOneRefund = async (req, res) => {
  let query = { _id: req.params.id.toString() };

  await Refund.findOne(query)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

const readAllServiceOfRefund = async (req, res) => {
  let query1 = { _id: req.params.id.toString() };
  const refund = await Refund.findOne(query1);

  let query2 = { _id: { $in: refund.bookingID } };
  await Booking.find(query2)
    .sort({ name: 1 })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};
*/

module.exports = {
  indexRefund,
  createRefund,
  // readAllRefund,
  // readOneRefund,
  // readAllServiceOfRefund,
};