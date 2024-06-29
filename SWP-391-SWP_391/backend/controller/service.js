const Service = require("../models/serviceModel");

const indexService = (req, res) => {
  res.send("<h1>This is service page</h1>");
};

// CREATE
const createService = async (req, res) => {
  let query = { id: req.body.id.toString() };

  await Service.findOne(query).then((result) => {
    if (result) res.json({ message: 0 });
    else {
      const newService = new Service({
        id: req.body.id,
        name: req.body.name,
        price: req.body.price,
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

// READ
const readAllService = async (req, res) => {
  await Service.find()
    .sort({ id: 1 })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

const readOneService = async (req, res) => {
  const id = req.params.id;

  await Service.findOne({ id: id })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

// DELETE
const deleteOneService = async (req, res) => {
  let query = { id: req.params.id };

  await Service.deleteOne(query)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
};

// UPDATE
const updateOneService = async (req, res) => {
  const oldId = req.body.oldId;
  const id = req.body.id;
  let query = { id: id };

  const existingService = await Service.findOne(query);

  if (existingService && existingService.id !== oldId) res.json({ message: 0 });
  else {
    await Service.deleteOne({ id: oldId })
      .then(result => console.log("Deleted Service"))
      .catch((err) => console.log(err));

    const newService = await new Service({
      id: id,
      name: req.body.name,
      price: req.body.price,
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