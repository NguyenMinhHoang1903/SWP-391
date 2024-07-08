const userModel = require("../models/userModel");

async function updateProfile(req, res) {
  try {
    const { name, fullname, dateOfBirth, gender, phoneNumber, address, email } = req.body;

    const updateFields = {};

    if (name !== undefined) updateFields.name = name;
    if (fullname !== undefined) updateFields.fullname = fullname;
    if (dateOfBirth !== undefined) updateFields.dateOfBirth = dateOfBirth;
    if (gender !== undefined) updateFields.gender = gender;
    if (phoneNumber !== undefined) updateFields.phoneNumber = phoneNumber;
    if (address !== undefined) updateFields.address = address;
    if (email !== undefined) updateFields.email = email;

    // Check if phone number already exists and belongs to a different user
    if (phoneNumber) {
      const existingUser = await userModel.findOne({ phoneNumber });
      if (existingUser && existingUser.name !== name) {
        return res.status(400).json({
          message: "Phone number already exists",
          error: true,
          success: false
        });
      }
    }

    // Check if email already exists and belongs to a different user
    if (email) {
      const existingEmail = await userModel.findOne({ email });
      if (existingEmail && existingEmail.name !== name) {
        return res.status(400).json({
          message: "Email already exists",
          error: true,
          success: false
        });
      }
    }

    // Update user profile
    await userModel.updateOne(
      { name: name.toString() },
      { $set: updateFields }
    );

    res.json({
      data: "",
      message: "User profile updated successfully",
      success: true,
      error: false
    });
  } catch (err) {
    console.error('Error updating user profile:', err);
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false
    });
  }
}

module.exports = updateProfile;
