const Combo = require("../models/comboModel");
const Service = require("../models/serviceModel");

const indexCombo = (req, res) => {
  res.send("<h1>This is combo page</h1>");
};

// CREATE
const createCombo = async (req, res) => {
  let query = { name: req.body.name };

  const existingCombo = await Combo.findOne(query);

  if (existingCombo) res.json({ message: 0 });
  else {
    const newComboData = {
      name: req.body.name,
      price: req.body.price,
      desc: req.body.desc,
      serviceId: req.body.serviceId,
    };

    if (req.body.startDate) {
      newComboData.startDate = req.body.startDate;
    }

    if (req.body.endDate) {
      newComboData.endDate = req.body.endDate;
    }

    const newCombo = new Combo(newComboData);
    await newCombo
      .save()
      .then((result) => {
        console.log(result);
        res.send(result);
      })
      .catch((err) => console.log(err));
  }
};

// Read all combo
const readAllCombo = async (req, res) => {
  await Combo.find()
    .sort({ name: 1 })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

// Read one combo
const readOneCombo = async (req, res) => {
  let query = { _id: req.params.id.toString() }

  await Combo.findOne(query)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

// Read all service of a combo
const readAllServiceOfCombo = async (req, res) => {
  //Find a combo by id
  let query1 = { _id: req.params.id.toString() };
  const combo = await Combo.findOne(query1);

  //Find all service by service id that are stored in a combo
  let query2 = ({ _id: { $in: combo.serviceId } })
  await Service.find(query2)
    .sort({ name: 1 })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

// DELETE
const deleteOneCombo = async (req, res) => {
  let query = { _id: req.params.id.toString() };

  await Combo.deleteOne(query)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
};

// UPDATE
const updateOneCombo = async (req, res) => {
  const oldName = req.body.oldName;
  const name = req.body.name;
  let query = { name: name };

  const existingCombo = await Combo.findOne(query);

  if (existingCombo && existingCombo.name !== oldName) res.json({ message: 0 });
  else {
    await Combo.deleteOne({ name: oldName })
      .then(result => console.log("Deleted Combo"))
      .catch((err) => console.log(err));

    const newCombo = await new Combo({
      name: name,
      price: req.body.price,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      desc: req.body.desc,
      serviceId: req.body.serviceId,
    });

    await newCombo
      .save()
      .then((result) => {
        res.send(result);
      })
      .catch((err) => console.log(err));
  }
};


module.exports = {
  indexCombo,
  createCombo,
  readAllCombo,
  readOneCombo,
  readAllServiceOfCombo,
  deleteOneCombo,
  updateOneCombo
};
