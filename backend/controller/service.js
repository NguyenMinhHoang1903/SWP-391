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
  const id = req.params.id;

  await Service.findOne({ _id: id })
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
  const oldName = req.body.oldName;
  const name = req.body.name;
  let query = { name: name };

  const existingService = await Service.findOne(query);

  if (existingService && existingService.name !== oldName) res.json({ message: 0 });
  else {
    await Service.deleteOne({ name: oldName })
      .then(result => console.log("Deleted Service"))
      .catch((err) => console.log(err));

    const newService = await new Service({
      name: name,
      priceByWeight: req.body.priceByWeight,
      desc: req.body.desc,
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