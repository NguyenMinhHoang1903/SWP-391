const UserGoogle = require("../models/userGoogle")

async function userGoogleController (req, res) {
  const { name, email, googleId } = req.body;
  console.log('Received request:', req.body);  // Debug log

  try {
    let user = await UserGoogle.findOne({ email });

    if (user) {
      user = new User({ name, email, googleId });
      await user.save();
    }

    res.status(200).json({ success: true, message: 'User saved successfully', user });
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

module.exports = userGoogleController