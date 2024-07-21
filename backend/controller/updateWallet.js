const userModel = require("../models/userModel");

async function updateUser(req, res) {
  try {
    await userModel.updateOne(
      { _id: req.body.userId.toString() },
      { $set: { wallet: req.body.wallet } }
    );
    
    res.json({
      message: "Payment by wallet successful!",
      success: true,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      success: false,
    });
  }
}

module.exports = updateUser;
