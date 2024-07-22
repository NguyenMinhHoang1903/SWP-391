const userModel = require("../models/userModel");
const BookingTracker = require("../models/bookingTrackerModel");

async function updateUser(req, res) {
  try {
    if (req.body.role === "STAFF") {
      // Increase service time number after a staff member has joined
      await BookingTracker.updateMany({}, { $inc: { 'tracker.$[].staffs': 1 } });
    }

    await userModel.updateOne(
      { _id: req.body.userId.toString() },
      { $set: { role: req.body.role } }
    );
    await userModel.updateOne(
      { _id: req.body.userId.toString() },
      { $set: { status: req.body.status } }
    );
    res.json({
      data: "",
      message: "User Updated",
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = updateUser;
