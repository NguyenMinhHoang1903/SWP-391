const Service = require("../models/serviceModel");

const indexService = (req, res) => {
  res.send("<h1>This is service page</h1>");
};

// CREATE
const createService = async (req, res) => {
  let query = {name: req.body.name };

  await Service.findOne(query).then((result) => {
    if (result) res.json({ message: 0 });
    else {
      const newService = new Service({
        name: req.body.name,
        priceByWeight: req.body.priceByWeight,
        desc: req.body.desc,
        imageName: req.body.imageName,
        imageUrl: req.body.imageUrl,
      });

      newService
        .save()
        .then((result) => {
          res.send(result);
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

  if (existingService && existingService._id !== oldId) res.json({ message: 0 });
  else {
    await Service.deleteOne({ _id: oldId })
      .then(result => console.log("Deleted Service"))
      .catch((err) => console.log(err));

    const newService = await new Service({
      name: name,
      priceByWeight: req.body.priceByWeight,
      desc: req.body.desc,
      imageUrl: req.body.imageUrl,
      imageName: req.body.imageName,
    });

    await newService
      .save()
      .then((result) => {
        res.send(result);
      })
      .catch((err) => console.log(err));
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