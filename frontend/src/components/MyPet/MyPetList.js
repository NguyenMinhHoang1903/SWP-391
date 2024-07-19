import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import NumbersTwoToneIcon from '@mui/icons-material/NumbersTwoTone';
import PetsTwoToneIcon from '@mui/icons-material/PetsTwoTone';
import { GiWeightScale } from "react-icons/gi";
import { CgDetailsMore } from "react-icons/cg";
import SubjectTwoToneIcon from '@mui/icons-material/SubjectTwoTone';
import Tooltip from "@mui/material/Tooltip";
import { IconButton, Zoom } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button } from "@mui/material";

export default function MyPetList() {
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();
  const [myPetList, setAllPet] = useState([]);

  useEffect(() => {
    if (user?.name) {
      fetchAllPets(user.name); // Fetch pets based on the current user's name
    }
  }, [user]);

  const fetchAllPets = async (userName) => {
    try {
      const response = await fetch(`http://localhost:5000/api/pet/user/${userName}`, {
        method: "GET",
      });

      const dataResponse = await response.json();
      if (dataResponse.success) {
        setAllPet(dataResponse.data); // Set the list of pets from the response
      } else {
        toast.error(dataResponse.message);
      }
    } catch (error) {
      toast.error("Failed to fetch pets");
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="manageStaff-component">
      <div className="container-fluid">
        <div className="container">
          <div className="table">
            <div className="row">
              <div className="col-2"></div>
              <div className="col-8">
                <div className="heading">My Pets</div>
              </div>
              <div className="col-2">
                <img
                  className="table-heading-right"
                  src="assets/imgs/gif-1.gif"
                  alt=""
                />
              </div>
            </div>
            <table>
              <thead>
                <tr>
                  <th style={{ textAlign: "center" }}>
                    <NumbersTwoToneIcon /> No.
                  </th>
                  <th style={{ textAlign: "center" }}>
                    <PetsTwoToneIcon /> Pet's Name
                  </th>
                  <th style={{ textAlign: "center" }}>
                    <PetsTwoToneIcon /> Pet Type
                  </th>
                  <th style={{ textAlign: "center" }}>
                    <GiWeightScale /> Weight (kg)
                  </th>
                  <th style={{ textAlign: "center" }}>
                    <CgDetailsMore /> Update
                  </th>
                </tr>
              </thead>
              <tbody>
                {myPetList.map((pet, index) => (
                  <tr key={index}>
                    <td style={{ textAlign: "center" }}>{index + 1}</td>
                    <td style={{ textAlign: "center" }}>{pet.petName}</td>
                    <td style={{ textAlign: "center" }}>{pet.petType}</td>
                    <td style={{ textAlign: "center" }}>{pet.weight}</td>
                    <td style={{ textAlign: "center" }}>
                      <Link
                        className="update-button"
                        to={`/updateMyPet/${pet.petName}`} // Include petName in the URL
                      >
                        <Tooltip TransitionComponent={Zoom} arrow>
                          <IconButton>
                            <SubjectTwoToneIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
            <div className="button row">
              <div className="col-6 text-left">
                  <Button
                    sx={{bgcolor: "rgb(0, 201, 170)" }}
                    variant="contained"
                    type="button"
                    onClick={handleBack}
                  >
                    <ArrowBackIcon />
                  </Button>
              </div>

              <div className="col-6 text-right">
                  <Link
                    to={`/addMyPet`}
                  >
                    <Button
                      sx={{bgcolor: "rgb(0, 201, 170)" }}
                      variant="contained"
                      type="button"
                    >
                      Add Pet
                    </Button>
                  </Link>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}
