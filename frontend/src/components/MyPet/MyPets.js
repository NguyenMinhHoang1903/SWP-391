import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { GiCat } from "react-icons/gi";
import { LuDog } from "react-icons/lu";
import { MdPets } from "react-icons/md";
import { GiWeightScale } from "react-icons/gi";
import TextField from "@mui/material/TextField";
import { Button, MenuItem, Select, FormControl, InputLabel } from "@mui/material";

const AddPetPage = () => {
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();

  const [data, setData] = useState({
    userName: "",
    petName: "",
    petType: "",
    weight: "",
  });

  useEffect(() => {
    if (user) {
      setData((prev) => ({
        ...prev,
        userName: user.name,
      }));
    }
  }, [user]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Regular expressions for validation
    const numberRegex = /^\d+(\.\d+)?$/;

    // Perform form validation
    if (!data.petName || !data.petType || !data.weight) {
      toast.error("All fields are required");
      return;
    }

    // Validate that weight is a number
    if (!numberRegex.test(data.weight)) {
      toast.error("Weight must be a number");
      return;
    }

    try {
      const createPet = await fetch("http://localhost:5000/api/pet/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await createPet.json();

      if (responseData.success) {
        toast.success("Pet added successfully");
        handleBack();
      } else {
        toast.error(responseData.message || "Failed to add pet");
      }
    } catch (error) {
      toast.error("An error occurred while submitting the form");
      console.error("Fetch Error:", error);
    }
  };

  return (
    <div className="contentAddPetPage">
      <div className="container">
        <div className="container-heading">
          <h1>Add New Pet</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="addPet">
            <div className="addPet-details">
              <div className="input-group mb-3">
                <div className="input-group-addon" style={{ textAlign: "left" }}>
                  <MdPets /> Pet Name
                </div>
                <TextField
                  id="petName"
                  variant="standard"
                  type="text"
                  placeholder="Enter your pet's name"
                  value={data.petName}
                  name="petName"
                  onChange={handleOnChange}
                  required
                />
              </div>

              <div className="input-group mb-3">
                <div className="input-group-addon" style={{ textAlign: "left" }}>
                  <MdPets /> Pet Type
                </div>
                <FormControl variant="standard" sx={{ width: "55%" }}>
                  <InputLabel id="petType-label">Select Pet Type</InputLabel>
                  <Select
                    labelId="petType-label"
                    id="petType"
                    value={data.petType}
                    name="petType"
                    onChange={handleOnChange}
                    label="Pet Type"
                    required
                  >
                    <MenuItem value="Dog"><LuDog /> Dog</MenuItem>
                    <MenuItem value="Cat"><GiCat /> Cat</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <div className="input-group mb-3">
                <div className="input-group-addon" style={{ textAlign: "left" }}>
                  <GiWeightScale /> Weight
                </div>
                <TextField
                  id="weight"
                  variant="standard"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="Enter your pet's weight"
                  value={data.weight}
                  name="weight"
                  onChange={handleOnChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="button row">
            <div className="col-6 ms-5">
              <Button
                sx={{
                  bgcolor: "rgb(0, 201, 170)",
                  ":hover": { bgcolor: "rgb(0, 201, 170)" },
                }}
                variant="contained"
                type="button"
                onClick={handleBack}
              >
                Back
              </Button>
            </div>

            <div className="col-6">
              <Button
                sx={{
                  bgcolor: "rgb(0, 201, 170)",
                  ":hover": { bgcolor: "rgb(0, 201, 170)" },
                }}
                variant="contained"
                type="submit"
              >
                Add Pet
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPetPage;