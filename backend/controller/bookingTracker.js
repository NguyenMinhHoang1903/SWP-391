const BookingTracker = require("../models/bookingTrackerModel");
const User = require("../models/userModel");

// Check number of staffs in the same time
const trackNumberStaffs = async (req, res) => {
  const user = await User.find({ role: "STAFF" }).catch((err) =>
    console.log(err)
  );
  const newTracker = [];

  // If there are not staffs in the database
  if (user.length === 0) {
    return res.send({ messages: 1 });
  }

  for (let i = 8; i <= 20; i++) {
    newTracker.push({
      time: i,
      staffs: user.length,
    });
  }

  const currentDate = new Date();

  // Find the booking tracker in the database
  let bookingTracker = [];
  bookingTracker = await BookingTracker.findOne();

  // if there are not booking tracker, create a new one
  if (!bookingTracker) {
    const newBookingTracker = new BookingTracker({
      tracker: newTracker,
    });
    bookingTracker = await newBookingTracker
      .save()
      .catch((err) => console.log(err));
  }

  // Check if created date is less than current date, then create new tracker
  if (bookingTracker.createdAt.getDate() < currentDate.getDate()) {
    BookingTracker.deleteOne({ _id: bookingTracker._id }).catch((err) =>
      console.log(err)
    );

    const newBookingTracker = new BookingTracker({
      tracker: newTracker,
    });

    bookingTracker = await newBookingTracker
      .save()
      .catch((err) => console.log(err));
  }

  // Check if there are staff is less than number of staffs
  const hourBooking = new Date().getHours(); // Get hour from frontend

  bookingTracker.tracker.map((item, index) => {
    if (hourBooking === item.time) {
      if (item.staffs === 0) {
        res.send({ message: 0 });
      } else {
        let newStaffs = item.staffs - 1;
        // Update staffs in the tracker
        bookingTracker.tracker[index].staffs = newStaffs;
        const newTracker = bookingTracker.tracker;
        BookingTracker.findByIdAndUpdate(bookingTracker._id.toString(), {
          tracker: newTracker,
        }).then(() => res.send({ messages: 1 }));
      }
    }
  });
};

module.exports = {
  trackNumberStaffs,
};
