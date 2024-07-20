const BookingTracker = require("../models/bookingTrackerModel");
const User = require("../models/userModel");

// Check number of staffs in the same time
const trackNumberStaffs = async (req, res) => {
  const user = await User.find({ role: "STAFF" }).catch((err) =>
    console.log(err)
  );
  const newTracker = [];

  // Check staffs is existing
  if (user.length === 0) {
    return res.send({ noStaff: true });
  }

  // Create new tracker
  for (let i = 8; i <= 20; i++) {
    newTracker.push({
      time: i,
      staffs: user.length,
    });
  }

  const currentDate = new Date();
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
  const date = new Date(req.body.date);
  const hourBooking = date.getHours(); // Get hour from frontend
  

  bookingTracker.tracker.map((item, index) => {
    if (hourBooking === item.time) {
      if (item.staffs === 0) {
        return res.send({ noStaff: true });
      } else {
        let newStaffs = item.staffs - 1;
        // Update staffs in the tracker
        bookingTracker.tracker[index].staffs = newStaffs;
        const newTracker = bookingTracker.tracker;
        BookingTracker.findByIdAndUpdate(bookingTracker._id.toString(), {
          tracker: newTracker,
        }).then(() => res.send({ noStaff: false }));
      }
    }
  });
};

module.exports = {
  trackNumberStaffs,
};
