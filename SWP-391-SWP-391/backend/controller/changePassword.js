const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

async function changePassword(req, res) {
  try {
    const { password, userPassword, confirmPassword } = req.body;
    const { _id } = req.user;

    if (!password || !userPassword || !confirmPassword) {
      throw new Error("Please provide all required fields");
    }

    const user = await userModel.findById(_id);

    if (!user) {
      throw new Error("User not found");
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      throw new Error("Incorrect old password");
    }

    if (userPassword !== confirmPassword) {
      throw new Error("New password and confirm password do not match");
    }

    const hashedPassword = await bcrypt.hash(userPassword, 10);
    await userModel.updateOne({ _id }, { $set: { password: hashedPassword } });

    const tokenData = {
      _id: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: '8h' });
    const tokenOption = {
      httpOnly: true,
      secure: true,
    };

    res.cookie("token", token, tokenOption).status(200).json({
      message: "Password changed successfully",
      success: true,
      error: false
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = changePassword;