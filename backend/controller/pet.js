const Pet = require("../models/petModel");

// CREATE
const createNewPet = async (req, res) => {
  const id = req.params.id;

  try {
    // Check if the pet with the same name already exists for the same user
    const existingPet = await Pet.findOne({
      userName: req.body.userName,
      petName: req.body.petName,
    });

    if (existingPet) {
      return res.status(400).json({
        success: false,
        message: "Pet with the same name already exists for this user",
      });
    }

    // Create new pet data
    const newPetData = {
      userName: req.body.userName,
      petName: req.body.petName,
      petType: req.body.petType,
      weight: req.body.weight,
    };

    // Create and save new pet
    const newPet = new Pet(newPetData);
    const result = await newPet.save();

    res.status(201).json({
      success: true,
      message: "Add pet successfully",
      data: result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to add pet",
    });
  }
};

module.exports = {
  createNewPet,
};
