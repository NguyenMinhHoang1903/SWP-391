const userModel = require("../models/userModel");

async function updateProfile(req, res) {
 /* const token = req.token;

  if (!token) {
    return res.status(403).json({
      message: "No token provided",
      error: true,
      success: false
    });
  }*/

  try {
    const {
      name,
      fullname,
      dateOfBirth,
      gender,
      phoneNumber,
      address,
      email
    } = req.body;

    const updateFields = {};

    if (name !== undefined) updateFields.name = name;
    if (fullname !== undefined) updateFields.fullname = fullname;
    if (dateOfBirth !== undefined) updateFields.dateOfBirth = dateOfBirth;
    if (gender !== undefined) updateFields.gender = gender;
    if (phoneNumber !== undefined) updateFields.phoneNumber = phoneNumber;
    if (address !== undefined) updateFields.address = address;
    if (email !== undefined) updateFields.email = email;

    // Log the update fields for debugging
    console.log('Updating user with fields:', updateFields);

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
