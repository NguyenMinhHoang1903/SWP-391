const Pet = require("../models/petModel");

// CREATE or UPDATE
const createNewPet = async (req, res) => {
  try {
    // Find the user by their userName
    let user = await Pet.findOne({ userName: req.body.userName });

    if (!user) {
      // User doesn't exist, create new user with the pet
      const newUser = new Pet({
        userName: req.body.userName,
        pets: [{
          petName: req.body.petName,
          petType: req.body.petType,
          weight: req.body.weight,
        }],
      });

      const result = await newUser.save();

      return res.status(201).json({
        success: true,
        message: "User and pet created successfully",
        data: result,
      });
    } else {
      // User exists, check if the pet with the same name already exists
      const existingPet = user.pets.find(pet => pet.petName === req.body.petName);

      if (existingPet) {
        return res.status(400).json({
          success: false,
          message: "Pet with the same name already exists for this user",
        });
      }

      // Add the new pet to the user's pets array
      user.pets.push({
        petName: req.body.petName,
        petType: req.body.petType,
        weight: req.body.weight,
      });

      const result = await user.save();

      return res.status(201).json({
        success: true,
        message: "Pet added successfully",
        data: result,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to add pet",
    });
  }
};

// Get
const readAllPet = async (req, res) => {
    const user = await Pet.findOne({ userName: req.params.userName });
    console.log(user);
    if(user) {
      res.json({
        success: true,
        data: user,
      });
    }
}

module.exports = {
  createNewPet,
  readAllPet,
};
