const Feedback = require("../models/feedbackModel");

const indexFeedback = (req, res) => {
  res.send("<h1>This is feedback page</h1>");
};

// CREATE
const createFeedback = async (req, res) => {
  const newFeedback = new Feedback({
    userName: req.body.userName,
    email: req.body.email,
    rating: req.body.rating,
    comment: req.body.comment,
  });

  newFeedback
    .save()
    .then(() => {
      res.json({ message: 1 });
    })
    .catch((err) => console.log(err));
};


module.exports = {
  indexFeedback,
  createFeedback
};
