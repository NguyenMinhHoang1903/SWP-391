const Refund = require("../models/refundModel");
//const Booking = require("../models/bookingModel");

const indexRefund = (req, res) => {
  res.send("<h1>This is Refund page</h1>");
};

// CREATE
const createRefund = async (req, res) => {
  //let query = { bookingID: req.body.bookingID };

  //const existingBookingID = await Refund.findOne(query);

  //if (existingBookingID) res.json({ message: 0 });
  /*else*/ {
    const newRefundData = {
      userName: req.body.userName,
      //bookingID: req.body.bookingID,
      reason: req.body.reason,
      bank: req.body.bank,
      bankNumber: req.body.bankNumber,
      holder: req.body.holder,
      amount: req.body.amount,
      status: req.body.status || "Pending", // Set default status to "Pending"
    };

    const newRefund = new Refund(newRefundData);
    await newRefund
      .save()
      .then((result) => {
        res.send(result);
      })
      .catch((err) => console.log(err));
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