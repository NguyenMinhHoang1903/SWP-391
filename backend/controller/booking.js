const Booking = require("../models/bookingModel");
const BookingTracker = require("../models/bookingTrackerModel");
const User = require("../models/userModel");
require("dotenv").config();
const moment = require("moment");
const sendMail = require("../sendMail");

// CREATE
const createBooking = async (req, res) => {
  const {
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

  // // Check pet
  // const bookingDate = new Date(date);
  // await Booking.find({ email: email, petName: petName })
  //   .then((existingPet) => {
  //     existingPet.map((value) => {
  //       if (value.date.getFullYear() === bookingDate.getFullYear()) {
  //         if (value.date.getMonth() === bookingDate.getMonth()) {
  //           if (value.date.getDate() === bookingDate.getDate()) {
  //             return res.json({
  //               success: false,
  //               message: "Pet already booked on this day",
  //             });
  //           }
  //         }
  //       }
  //     });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  // const newTracker = [];
  // //Check staffs in the same time
  // await User.find({ role: "STAFF" })
  //   .then((staffs) => {
  //     if (staffs.length === 0) {
  //       res.json({
  //         success: false,
  //         message: "No staff on this day",
  //       });
  //     } else {
  //       // Create new tracker
  //       for (let i = 8; i <= 20; i++) {
  //         newTracker.push({
  //           time: i,
  //           staffs: staffs.length,
  //         });
  //       }
  //     }
  //   })
  //   .catch((err) => console.log(err));

  // const currentDate = new Date();
  // let bookingTracker = [];

  // await BookingTracker.findOne()
  //   .then((result) => {
  //     // if there are not booking tracker, create a new one
  //     if (!result) {
  //       const newBookingTracker = new BookingTracker({
  //         tracker: newTracker,
  //       });
  //       bookingTracker = newBookingTracker
  //         .save()
  //         .catch((err) => console.log(err));
  //     } else {
  //       // Check if created date is less than current date, then create new tracker
  //       if (result.createdAt.getDate() < currentDate.getDate()) {
  //         BookingTracker.deleteOne({ _id: bookingTracker._id }).catch((err) =>
  //           console.log(err)
  //         );

  //         const newBookingTracker = new BookingTracker({
  //           tracker: newTracker,
  //         });

  //         bookingTracker = newBookingTracker
  //           .save()
  //           .catch((err) => console.log(err));
  //       }
  //     }
  //   })
  //   .catch((err) => console.log(err));

  // // Check if there are staff is less than number of staffs
  // const dateToCheck = new Date(date);
  // const hourBooking = dateToCheck.getHours(); // Get hour from frontend

  // await BookingTracker.findOne()
  //   .then((result) => {
  //     result.tracker.map((item, index) => {
  //       if (hourBooking === item.time) {
  //         if (item.staffs === 0) {
  //           return res.json({
  //             success: false,
  //             message: "No staffs for services",
  //           });
  //         } else {
  //           let newStaffs = item.staffs - 1;
  //           // Update staffs in the tracker
  //           bookingTracker.tracker[index].staffs = newStaffs;
  //           const newTracker = bookingTracker.tracker;
  //           BookingTracker.findByIdAndUpdate(bookingTracker._id.toString(), {
  //             tracker: newTracker,
  //           }).catch((err) => console.log(err));
  //         }
  //       }
  //     });
  //   })
  //   .catch((err) => console.log(err));

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
          <p>Date: ${moment(date).format("MMMM Do YYYY, h:mm:ss a")}</p>
          <p>Total: ${total} VND</p>
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
    .then(() => {
      sendMail(mailOptions);
      return res.json({
        success: true,
        message: "Please check your gmail or spam box",
      });
    })
    .catch((err) => console.log(err));
};

// Read one booking
const readOneBooking = async (req, res) => {
  await Booking.findById(req.params.id)
    .then((result) => {
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
      .then(() => {
        res.json({ message: 1 });
      })
      .catch((err) => {
        console.log(err);
      });
  } else res.json({ message: 0 });
};

// Check pet
const checkPet = async (req, res) => {
  const { email, petName, date } = req.body;
  const bookingDate = new Date(date);
  let flag = false;

  try {
    const existingPet = await Booking.find({ email: email, petName: petName });

    if (!existingPet) {
      return res
        .status(200)
        .json({ success: false, message: "Can not find pet" });
    }
    existingPet.map((value) => {
      if (value.date.getFullYear() === bookingDate.getFullYear()) {
        if (value.date.getMonth() === bookingDate.getMonth()) {
          if (value.date.getDate() === bookingDate.getDate()) {
            flag = true;
            return;
          }
        }
      }
    });
    if (flag) {
      return res.status(200).json({
        success: false,
        message: "Pet already booked on this day",
      });
    } else
      return res.status(200).json({
        success: true,
      });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createBooking,
  readOneBooking,
  changeBookingDetail,
  checkPet,
};
