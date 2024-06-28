const Booking = require("../models/bookingModel");


// CREATE
const createBooking = async (req, res) => {
  const newBooking = new Booking({
    customerName: req.body.customerName,
    phoneNumber: req.body.phoneNumber,
    petName: req.body.petName,
    petType: req.body.petType,
    date: req.body.date,
    services: req.body.services,
    combo: req.body.combo,
  });

  await newBooking
    .save()
    .then(() => {
      res.json({ message: 1 });
    })
    .catch((err) => console.log(err));
};

module.exports = {
  createBooking
};