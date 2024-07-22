const Service = require("../models/serviceModel");

const indexService = (req, res) => {
  res.send("<h1>This is service page</h1>");
};


// CREATE
const createService = async (req, res) => {
  let query = { name: req.body.name };

  await Service.findOne(query).then((result) => {
    if (result) res.json({ success: false, message: "Service already exists" });
    else {
      const newService = new Service({
        name: req.body.name,
        priceByWeight: req.body.priceByWeight,
        desc: req.body.desc,
        imageName: req.body.imageName,
        imageUrl: req.body.imageUrl,
        path: req.body.path,
        rating: 0,
        ratingNumber: 0,
      });

      newService
        .save()
        .then((result) => {
          res.send({ success: true, message: "Added service successfully" });
        })
        .catch((err) => console.log(err));
    }
  });
};

// READ ALL SERVICE
const readAllService = async (req, res) => {
  await Service.find()
    .sort({ name: 1 })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

// READ ONE SERVICE
const readOneService = async (req, res) => {
  const oldId = req.params.oldId;

  await Service.findOne({ _id: oldId })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

// DELETE
const deleteOneService = async (req, res) => {
  let query = { _id: req.params.id };

  await Service.deleteOne(query)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
};

// UPDATE
const updateOneService = async (req, res) => {
  const oldId = req.body.oldId;
  const name = req.body.name;
  let query = { name: name };

  const existingService = await Service.findOne(query);

  if (existingService && existingService._id.toString() !== oldId)
    res.json({ success: false, message: "Service already exists" });
  else {
    const result = await Service.findByIdAndUpdate(oldId, {
      $set: {
        name: name,
        priceByWeight: req.body.priceByWeight,
        desc: req.body.desc,
        imageUrl: req.body.imageUrl,
        imageName: req.body.imageName,
        path: req.body.path,
      },
    })
      .then(() =>
        res.json({ success: true, message: "Service updated successfully" })
      )
      .catch((err) => res.json({ success: false, message: err }));
  }
};

module.exports = {
  indexService,
  readAllService,
  readOneService,
  deleteOneService,
  createService,
  updateOneService,
};