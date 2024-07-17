const Booking = require("../models/bookingModel");
require("dotenv").config();
const moment = require("moment")
const sendMail = require("../sendMail");

// CREATE
const createBooking = async (req, res) => {
  const { userName, email, petName, petType, date, weight, services, combo, total } = req.body;

  const mailOptions = {
    from: {
      name: "Pet Spa",
      address: process.env.EMAIL_USER,
    },
    to: req.body.email,
    subject: "Booking - Pet Spa",
    text: "Your bookings are now available",
    html: `<b>Hello ${userName}</b>
          <p>Email: ${email}</p>
          <p>Your Pet Name: ${petName}</p>
          <p>Your Pet Type: ${petType}</p>
          <p>Your Service: ${services}</p>
          <p>Your Combo: ${combo}</p>
          <p>Date: ${moment(date).format('MMMM Do YYYY, h:mm:ss a')}</p>
          <p>Total: $ ${total}</p>
          <p>Thank you for booking</p>
          <p>Your regards,</p>
          <p>Pet Spa</p>
          `,
  };

  const newBooking = new Booking({
    userName: userName,
    
    email: email,
    petName: petName,
    petType: petType,
    date: date,
    weight: weight,
    services: services,
    combo: combo,
    total: total,
    status: "PENDING",
  });

  await newBooking
    .save()
    .then((result) => {
      console.log(result);
      sendMail(mailOptions);
      res.json({ message: "Create Successfully" });
    })
    .catch((err) => console.log(err));
};

// Read one booking
const readOneBooking = async (req, res) => {
  await Booking.findById(req.params.id)
   .then((result) => {
      console.log(result);
      res.send(result);
    })
   .catch((err) => {
      console.log(err);
    });
};


// Update Booking
const changeBookingDetail = async (req, res) => {
  const {
    oldId,
    userName,
    email,
    petName,
    petType,
    date,
    weight,
    services,
    combo,
    total,
  } = req.body;

  const existingBooking = await Booking.findById(oldId);

  if (existingBooking) {
    await Booking.findByIdAndUpdate(oldId, {
      $set: {
        userName: userName,
        email: email,
        petName: petName,
        petType: petType,
        date: date,
        weight: weight,
        services: services,
        combo: combo,
        total: total,
      },
    })
      .then((result) => {
        res.json({ message: 1 });
      })
      .catch((err) => {
        console.log(err);
      });
  } else res.json({ message: 0 });
};

module.exports = {
  createBooking,
  readOneBooking,
  changeBookingDetail
};
