const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    googleId: { type: String, required: true },
  });
  
  const UserGoogle = mongoose.model("UserGoogle", userSchema);

  module.exports = UserGoogle