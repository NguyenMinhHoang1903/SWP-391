const userModel = require("../models/userModel");

async function deleteUser(req, res) {
  try {
    let query = { _id: req.body.userId.toString() };

    await userModel.deleteOne(query);
    res.json({
      message: "User Deleted",
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

module.exports = deleteUser;
