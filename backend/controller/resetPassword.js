const User = require('../models/userModel');

async function resetPassword (req, res) {
    try {
      const user = await User.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordExpires: { $gt: Date.now() }
      });
  
      if (!user) {
        return res.status(401).send({ message: 'Password reset token is invalid or has expired.' });
      }
  
      const newPassword = crypto.randomBytes(3).toString('hex').toUpperCase();
      user.password = await bcrypt.hash(newPassword, 10);
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
  
      await user.save();
  
      const loginInfoMailOptions = {
        to: user.email,
        from: 'your-email',
        subject: 'New Password',
        text: `Hello,\n\nYour new password is: ${newPassword}\n\nPlease login and change your password.\n`
      };
  
      await transporter.sendMail(loginInfoMailOptions);
      res.status(200).send({ message: 'Your password has been updated' });
    } catch (error) {
      res.status(500).send({ message: 'Server error' });
    }
  };
  module.exports = resetPassword