const BookingTracker = require("../models/bookingTrackerModel");
const User = require("../models/userModel");

// Check number of staffs in the same time
const trackNumberStaffs = async (req, res) => {
  const newTracker = [];

  try {
    const staffs = await User.find({ role: "STAFF" });

    // Check staffs is existing
    if (staffs.length === 0) {
      return res.status(200).json({ success: false, message: "No staffs" });
    } else {
      // Create new tracker
      for (let i = 8; i <= 20; i++) {
        newTracker.push({
          time: i,
          staffs: staffs.length,
        });
      }
    }

    const currentFullDate = new Date();
    const currentYear = currentFullDate.getFullYear();
    const currentMonth = currentFullDate.getMonth() + 1;
    const currentDate = currentFullDate.getDate();
    
    let bookingTracker = [];
    const fullDate = new Date(req.body.date);

    const year = fullDate.getFullYear();
    const month = fullDate.getMonth() + 1;
    const date = fullDate.getDate();
    const hour = fullDate.getHours();

    // Check if year month date is less than current time, then delete
    await BookingTracker.deleteMany({
      $or: [
        { "year" : { $lt: currentYear } },
        { "year" : currentYear, "month": { $lt: currentMonth } },
        { "year" : currentYear, "month": currentMonth, "date": { $lt: currentDate } },
        
      ],
    });

    // Find booking tracker by year , month, date
    bookingTracker = await BookingTracker.findOne({
      year: year,
      month: month,
      date: date,
    });

    // if there are not booking tracker, create a new one
    if (!bookingTracker) {
      const newBookingTracker = new BookingTracker({
        year: year,
        month: month,
        date: date,
        tracker: newTracker,
      });
      bookingTracker = await newBookingTracker.save();
    }

    // Check if there are staff is less than number of staffs
    bookingTracker.tracker.map((item, index) => {
      if (hour === item.time) {
        if (item.staffs === 0) {
          return res
            .status(200)
            .json({ success: false, message: "No staffs for services" });
        } else {
          let newStaffs = item.staffs - 1;
          // Update staffs in the tracker
          bookingTracker.tracker[index].staffs = newStaffs;
          const newTracker = bookingTracker.tracker;
          BookingTracker.findByIdAndUpdate(bookingTracker._id.toString(), {
            tracker: newTracker,
          }).then(() => {
            return res.status(200).json({ success: true });
          });
        }
      }
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Get all list
const readAll = async (req, res) => {
  const list = await BookingTracker.find({});

  try {
    if (list.length > 0) {
      return res.status(200).json({ success: true, list: list });
    } else return res.status(200).json({ success: false });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


module.exports = {
  trackNumberStaffs,
  readAll,
};
