import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import SummaryApi from '../../common';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import NumbersTwoToneIcon from '@mui/icons-material/NumbersTwoTone';
import PetsTwoToneIcon from '@mui/icons-material/PetsTwoTone';
import { FaUser } from "react-icons/fa";
import { BsBookmarkCheckFill } from "react-icons/bs";


export default function TimeBookPet() {
    const [bookingList, setBookingList] = useState([]);
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const keys = ["userName", "petName"];


    //get booking from database
    const fetchAllBooking = async () => {
        try {
            const fetchData = await fetch(SummaryApi.allListBooking.url, {
                method: SummaryApi.allListBooking.method,
                credentials: 'include',
            });

            const dataResponse = await fetchData.json();
            if (dataResponse.success) {
                setBookingList(dataResponse.data);
            } else {
                toast.error(dataResponse.message);
            }
        } catch (error) {
            toast.error("Failed to fetch bookings");
        }
    };
    // fetch to booking database
    useEffect(() => {
        fetchAllBooking();
    }, []);

    //button return
    const handleBack = () => {
        navigate(-1);
    };

    // Count the number of bookings for a specific pet name and owner name
    const countBookings = (userName, petName) => {
        let count = 0;
        bookingList.forEach(booking => {
            if (booking.userName === userName && booking.petName === petName) {
                count++;
            }
        });
        return count;
    };

    // Filter out duplicates
    const uniqueBookings = bookingList.reduce((acc, current) => {
        const x = acc.find(item => item.userName === current.userName && item.petName === current.petName);
        if (!x) {
            return acc.concat([current]);
        } else {
            return acc;
        }
    }, []);

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

    const searchByName = search(uniqueBookings);

    return (
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
                                <div className="heading">Pet Booking List</div>
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
                                        <BsBookmarkCheckFill /> Time Booking
                                    </th>

                                </tr>
                            </thead>
                            <tbody>
                                {searchByName.map((timeBook, index) => {
                                    const countBooking = countBookings(timeBook.userName, timeBook.petName);
                                    return (
                                        <tr key={index}>
                                            <td style={{ textAlign: "center" }}>{index + 1}</td>
                                            <td style={{ textAlign: "center" }}>{timeBook?.userName}</td>
                                            <td style={{ textAlign: "center" }}>{timeBook?.petName}</td>
                                            <td style={{ textAlign: "center" }}>{countBooking}</td>

                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
