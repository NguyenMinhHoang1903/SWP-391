const User = require('../models/userModel');
const sendMail = require('../sendMail');
const bcrypt = require('bcryptjs');

function generateRandomPassword() {
  const chars = '123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let password = '';
  for (let i = 0; i < 6; i++) {
    password += chars[Math.floor(Math.random() * chars.length)];
  }
  return password;
}

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    const newPassword = generateRandomPassword();
    user.password = bcrypt.hashSync(newPassword, 10);
    user.tempPassword = newPassword;
    user.tempPasswordExpires = Date.now() + 10 * 60 * 1000;

    await user.save();

    const mailOptions = {
      from: {
        name: 'Pet Spa',
        address: process.env.EMAIL_USER,
      },
      to: req.body.email,
      subject: 'Password Reset',
      text: `Your new password is: ${newPassword}.Please login and change your password within 10 minutes.`,
    };

    // Debugging information
    console.log('Sending email with options:', mailOptions);

    await sendMail(mailOptions);
    res.send({ message: 'Password reset successfully. Check your email for the new password.' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).send({ message: 'Error resetting password' });
  }
};

module.exports = forgotPassword;