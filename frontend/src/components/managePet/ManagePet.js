import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from "react-router-dom";
import NumbersTwoToneIcon from '@mui/icons-material/NumbersTwoTone';
import PetsTwoToneIcon from '@mui/icons-material/PetsTwoTone';
import { GiWeightScale } from "react-icons/gi";
import { Box, Button, TextField } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SummaryApi from '../../common';
import { FaUser } from "react-icons/fa";


export default function ManagePet() {
    const [listPet, setListPet] = useState([]);
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const keys = ["userName"];

    //get pet from database
    const fetchAllPets = async () => {
        const fetchData = await fetch(SummaryApi.allListPet.url, {
            method: SummaryApi.allListPet.method,
            credentials: "include",
        });

        const dataResponse = await fetchData.json();
        if (dataResponse.success) {
            setListPet(dataResponse.data);
        }

        if (dataResponse.error) {
            toast.error(dataResponse.message);
        }
    };

    useEffect(() => {
        fetchAllPets();
    }, []);

    const handleBack = () => {
        navigate(-1);
    };

    //search name owner or pet name
    const search = (data) => {
        if (query) {
            return data.filter((item) =>
                keys.some((key) =>
                    item[key].toString().toLowerCase().includes(query.toLowerCase())
                )
            );
        }
        return data;
    };
    
    const searchByName = search(listPet);

    return (
        <div>
            <div className="manageStaff-component">
                <div className="container-fluid">
                    <div className="container">
                        <div className="table">
                            <div className="row">
                                <div className="col-2">
                                    <div className="heading-button-Link">
                                        <Button
                                            sx={{ bgcolor: "rgb(0, 201, 170)" }}
                                            variant="contained"
                                            type="button"
                                            onClick={handleBack}
                                        >
                                            <ArrowBackIcon />
                                        </Button>
                                    </div>
                                </div>
                                <div className="col-8">
                                    <div className="heading">Pet List</div>
                                </div>
                                <div className="col-2">
                                    <img
                                        className="table-heading-right"
                                        src="assets/imgs/gif-1.gif"
                                        alt=""
                                    />
                                </div>
                            </div>

                             {/* Filter search bar */}
                             <div className="row justify-content-end mb-3">
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        marginBottom: 3,
                                    }}
                                >
                                    <TextField
                                        sx={{ bgcolor: "white" }}
                                        placeholder="Search by Name"
                                        onChange={(e) => setQuery(e.target.value)}
                                    />
                                </Box>
                            </div>

                            <table>
                                <thead>
                                    <tr>
                                        <th style={{ textAlign: "center" }}>
                                            <NumbersTwoToneIcon /> No.
                                        </th>
                                        <th style={{ textAlign: "center" }}>
                                            <FaUser /> Owner's Name
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
                                    </tr>
                                </thead>
                                <tbody>
                                    {searchByName.map((petData, index) => (
                                        <tr key={index}>
                                            <td style={{ textAlign: "center" }}>{index + 1}</td>
                                            <td style={{ textAlign: "center" }}>{petData?.userName}</td>
                                            <td style={{ textAlign: "center" }}>
                                                {petData.pets.map((value, index) => (
                                                    <div key={index}>{value.petName}</div>
                                                ))}
                                            </td>
                                            <td style={{ textAlign: "center" }}>
                                                {petData.pets.map((value, index) => (
                                                    <div key={index}>{value.petType}</div>
                                                ))}
                                            </td>
                                            <td style={{ textAlign: "center" }}>
                                                {petData.pets.map((value, index) => (
                                                    <div key={index}>{value.weight}</div>
                                                ))}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
