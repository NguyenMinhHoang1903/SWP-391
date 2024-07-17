const userModel = require("../models/userModel");

async function deleteUser(req, res) {
  try {
    let query = { _id: req.body.userId.toString() };

    await userModel.findById(query).then((user) => {
      if (user.role === "ADMIN") {
        res.json({
          message: "How dare you delete your boss?",
          success: false,
          error: true,
        });
      } else {
        userModel.deleteOne(query).then(() => {
          res.json({
            message: "Deleted User",
            success: true,
            error: false,
          });
        });
      }
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
