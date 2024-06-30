const mongoose = require("mongoose");

const comboSchema = new mongoose.Schema({
  comboId: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  serviceId: [
    {
      type: Number,
      required: true,
    },
  ],
});

const Combo = mongoose.model("Combo", comboSchema);

module.exports = Combo;