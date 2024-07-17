import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import SummaryApi from "../../common";
import { format, isToday } from 'date-fns';
import { Box, IconButton, TextField, Tooltip, Zoom } from "@mui/material";
import EventTwoToneIcon from '@mui/icons-material/EventTwoTone';
import SubjectTwoToneIcon from '@mui/icons-material/SubjectTwoTone';
import PaymentsTwoToneIcon from '@mui/icons-material/PaymentsTwoTone';
import NumbersTwoToneIcon from '@mui/icons-material/NumbersTwoTone';
import PetsTwoToneIcon from '@mui/icons-material/PetsTwoTone';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import { Link } from "react-router-dom";
import { TiEdit } from "react-icons/ti";
import ChangeBookingRole from "./updateBooking";


export default function ManageBooking() {
  const [bookingList, setBookingList] = useState([]);
  const [openUpdateRole, setOpenUpdateRole] = useState(false);
  const [query, setQuery] = useState("");
  const [filteredStatus, setFilteredStatus] = useState("All");


  const [updateBookingDetails, setUpdateBookingDetails] = useState({
    userName: "",
    status: "",
    _id: "",
  });


  useEffect(() => {
    fetchAllBooking();
  }, []);


  const fetchAllBooking = async () => {
    try {
      const fetchData = await fetch(SummaryApi.allListBooking.url, {
        method: SummaryApi.allListBooking.method,
        credentials: 'include',
      });


      const dataResponse = await fetchData.json();
      if (dataResponse.success) {
        const sortBookings = dataResponse.data;
        // Sort bookings by date in ascending order (oldest to newest)
        sortBookings.sort((a, b) => new Date(b.date) - new Date(a.date));
        setBookingList(sortBookings);
      } else {
        toast.error(dataResponse.message);
      }
    } catch (error) {
      toast.error("Failed to fetch bookings");
    }
  };


  const handleFilterChange = (event) => {
    setFilteredStatus(event.target.value);
  };


  const keys = ["userName", "petName", "status"];


  const filterBookings = (booking) => {
    if (filteredStatus === "All") {
      return true;
    } else {
      return booking.status === filteredStatus;
    }
  };


  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN').format(amount);
  };


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


  const filteredAndSearchedBookings = search(bookingList.filter(filterBookings));


  const todayBookings = bookingList.filter(booking => isToday(new Date(booking.date)));
  const todayBookingsCount = todayBookings.length;


  return (
    <div className="manageStaff-component">
      <div className="container-fluid">
        <div className="container">
          <div className="table">
            <div className="row">
              <div className="col-2"></div>
              <div className="col-8">
                <div className="heading">List Booking</div>
              </div>
              <div className="col-2">
                <img
                  className="table-heading-right"
                  src="assets/imgs/gif-1.gif"
                  alt=""
                />
              </div>
            </div>
            {/* Display today's bookings count */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 3,
              }}
            >
              <div>Today's Bookings: {todayBookingsCount}</div>
            </Box>


            {/* Display today's bookings list */}
            {todayBookingsCount > 0 && (
              <div className="today-bookings">
                <h3>Today's Bookings</h3>
                <table>
                  <thead>
                    <tr>
                      <th style={{ textAlign: "center" }}>
                        <NumbersTwoToneIcon /> No.
                      </th>
                      <th style={{ textAlign: "center" }}>
                        <AccountBoxOutlinedIcon /> Customer's Name
                      </th>
                      <th style={{ textAlign: "center" }}>
                        <PetsTwoToneIcon /> Pet's Name
                      </th>
                      <th style={{ textAlign: "center" }}>
                        <EventTwoToneIcon /> Date
                      </th>
                      <th style={{ textAlign: "center" }}>
                        <EventTwoToneIcon /> Time
                      </th>
                      <th style={{ textAlign: "center" }}>
                        <PaymentsTwoToneIcon /> Total
                      </th>
                      <th style={{ textAlign: "center" }}>
                        <SubjectTwoToneIcon /> Status
                      </th>
                      <th>
                        <SubjectTwoToneIcon /> Detail
                      </th>
                      <th>Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {todayBookings.map((data, index) => {
                      const date = new Date(data?.date);
                      const formattedDate = format(date, 'yyyy-MM-dd');
                      const formattedTime = format(date, 'HH:mm');
                      return (
                        <tr key={data?._id}>
                          <td style={{ textAlign: "center" , color: "black"}}>{index + 1}</td>
                          <td style={{ textAlign: "center" , color: "black"}}>{data?.userName}</td>
                          <td style={{ textAlign: "center" , color: "black"}}>{data?.petName}</td>
                          <td style={{ textAlign: "center" , color: "black"}}>{formattedDate}</td>
                          <td style={{ textAlign: "center" , color: "black"}}>{formattedTime}</td>
                          <td style={{ textAlign: "right" , color: "black"}}>{formatCurrency(data?.total)}</td>
                          <td className={`status-${data?.status}`} style={{ textAlign: "center" }}>{data?.status}</td>
                          <td>
                            <Link
                              className="update-button"
                              to={`/ManageBookingDetail?${data._id}`}
                            >
                              <Tooltip TransitionComponent={Zoom} arrow>
                                <IconButton>
                                  <SubjectTwoToneIcon />
                                </IconButton>
                              </Tooltip>
                            </Link>
                          </td>
                          <td>
                            <button
                              className="edit"
                              onClick={() => {
                                setUpdateBookingDetails(data);
                                setOpenUpdateRole(true);
                              }}
                            >
                              <TiEdit />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}


            {/* Filter bar */}
            <div className="row justify-content-end mb-3">
              {/* Search */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 3,
              }}
            >
              <TextField
                sx={{ bgcolor: "white" }}
                placeholder = "Search by Customer's or Pet's Name"
                onChange={(e) => setQuery(e.target.value)}
              />
            </Box>
              <div className="col-auto">
                <select
                  className="form-select"
                  value={filteredStatus}
                  onChange={handleFilterChange}
                >
                  <option value="All">All</option>
                  <option value="PROCESS">Process</option>
                  <option value="FINISHED">Finished</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>
              </div>
            </div>
            <table>
              <thead>
                <tr>
                  <th style={{ textAlign: "center" }}>
                    <NumbersTwoToneIcon /> No.
                  </th>
                  <th style={{ textAlign: "center" }}>
                    <AccountBoxOutlinedIcon /> Customer's Name
                  </th>
                  <th style={{ textAlign: "center" }}>
                    <PetsTwoToneIcon /> Pet's Name
                  </th>
                  <th style={{ textAlign: "center" }}>
                    <EventTwoToneIcon /> Date
                  </th>
                  <th style={{ textAlign: "center" }}>
                    <EventTwoToneIcon /> Time
                  </th>
                  <th style={{ textAlign: "center" }}>
                    <PaymentsTwoToneIcon /> Total
                  </th>
                  <th style={{ textAlign: "center" }}>
                    <SubjectTwoToneIcon /> Status
                  </th>
                  <th>
                    <SubjectTwoToneIcon /> Detail
                  </th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSearchedBookings.map((data, index) => {
                  const date = new Date(data?.date);
                  const formattedDate = format(date, 'yyyy-MM-dd');
                  const formattedTime = format(date, 'HH:mm');
                  return (
                    <tr key={data?._id}>
                      <td style={{ textAlign: "center" }}>{index + 1}</td>
                      <td style={{ textAlign: "center" }}>{data?.userName}</td>
                      <td style={{ textAlign: "center" }}>{data?.petName}</td>
                      <td style={{ textAlign: "center" }}>{formattedDate}</td>
                      <td style={{ textAlign: "center" }}>{formattedTime}</td>
                      <td style={{ textAlign: "right" }}>{formatCurrency(data?.total)}</td>
                      <td className={`status-${data?.status}`} style={{ textAlign: "center" }}>{data?.status}</td>
                      <td>
                        <Link
                          className="update-button"
                          to={`/ManageBookingDetail?${data._id}`}
                        >
                          <Tooltip TransitionComponent={Zoom} arrow>
                            <IconButton>
                              <SubjectTwoToneIcon />
                            </IconButton>
                          </Tooltip>
                        </Link>
                      </td>
                      <td>
                        <button
                          className="edit"
                          onClick={() => {
                            setUpdateBookingDetails(data);
                            setOpenUpdateRole(true);
                          }}
                        >
                          <TiEdit />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {openUpdateRole && (
        <ChangeBookingRole
          onClose={() => setOpenUpdateRole(false)}
          userName={updateBookingDetails.userName}
          status={updateBookingDetails.status}
          bookingId={updateBookingDetails._id}
          callFunc={fetchAllBooking}
        />
      )}
    </div>
  );
}
