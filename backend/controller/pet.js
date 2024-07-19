const Pet = require("../models/PetModel");

// CREATE or UPDATE
const createNewPet = async (req, res) => {
  try {
    let user = await Pet.findOne({ userName: req.body.userName });

    if (!user) {
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
      const existingPet = user.pets.find(pet => pet.petName === req.body.petName);

      if (existingPet) {
        return res.status(400).json({
          success: false,
          message: "Pet with the same name already exists for this user",
        });
      }

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

// Function to show all pets
const getAllPets = async (req, res) => {
  try {
    const user = await Pet.findOne({ userName: req.params.userName });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: user.pets,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch pets",
    });
  }
};

// Function to update a pet
const updatePet = async (req, res) => {
  try {
    const { userName, petName, petType, weight } = req.body;

    const user = await Pet.findOne({ userName });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const pet = user.pets.find(pet => pet.petName === petName);

    if (!pet) {
      return res.status(404).json({
        success: false,
        message: "Pet not found",
      });
    }

    // Cập nhật thông tin pet
    pet.petName = petName || pet.petName;
    pet.petType = petType || pet.petType;
    pet.weight = weight || pet.weight;

    const result = await user.save();

    return res.status(200).json({
      success: true,
      message: "Pet updated successfully",
      data: result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to update pet",
    });
  }
};

module.exports = {
  createNewPet,
  getAllPets,
  updatePet,
};