const Feedback = require("../models/feedbackModel");
const Service = require("../models/serviceModel");
const Combo = require("../models/comboModel");

const indexFeedback = (req, res) => {
  res.send("<h1>This is feedback page</h1>");
};

// CREATE
const createFeedback = async (req, res) => {
  const { userName, email, servicesRating, comboRating, comment } = req.body;

  try {
    // Add rating to service and increase rating number
    if (servicesRating.length > 0) {
      servicesRating.map(async (value) => {
        const result = await Service.findOne({ name: value.name });

        if (result) {
          result.rating = (result.rating + value.rating) / 2;
          result.ratingNumber = result.ratingNumber + 1;
          await result.save();
        }
      });
    }

    // Add rating to combo and increase rating number
    if (comboRating) {
      const result = await Combo.findOne({ name: comboRating.name });

      result.rating = (result.rating + comboRating.rating) / 2;
      result.ratingNumber = result.ratingNumber + 1;
      await result.save();
    }

    // Add feedback to database
    const newFeedback = new Feedback({
      userName: userName,
      email: email,
      servicesRating: servicesRating,
      comboRating: comboRating,
      comment: comment,
    });

    newFeedback.save().then(() => {
      res.json({ success: true });
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  indexFeedback,
  createFeedback,
};
