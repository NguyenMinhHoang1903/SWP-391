const BookingTracker = require("../models/bookingTrackerModel");

// Check number of staffs in the same time
const trackNumberStaffs = async (req, res) => {
  const newTracker = [
    {
      time: 8,
      staffs: 5,
    },
    {
      time: 9,
      staffs: 5,
    },
    {
      time: 10,
      staffs: 5,
    },
    {
      time: 11,
      staffs: 5,
    },
    {
      time: 12,
      staffs: 5,
    },
    {
      time: 13,
      staffs: 5,
    },
    {
      time: 14,
      staffs: 5,
    },
    {
      time: 15,
      staffs: 5,
    },
    {
      time: 16,
      staffs: 5,
    },
    {
      time: 17,
      staffs: 5,
    },
    {
      time: 18,
      staffs: 5,
    },
    {
      time: 19,
      staffs: 5,
    },
    {
      time: 20,
      staffs: 5,
    },
  ];

  // Check if created date is less than current date, then create new tracker
  const currentDate = new Date();
  let bookingTracker = [];
  bookingTracker = await BookingTracker.findOne();

  if (bookingTracker.createdAt.getDay < currentDate.getDay) {
    const newBookingTracker = new BookingTracker({
      tracker: newTracker,
    });

    await newBookingTracker
      .save()
      .then(() => console.log("Created new booking tracker"))
      .catch((err) => console.log(err));
  }

  // Check if there are staff is less than 5
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
        }).then(() => res.send({ message: 1 }));
      }
    }
  });
};

module.exports = {
  trackNumberStaffs,
};
