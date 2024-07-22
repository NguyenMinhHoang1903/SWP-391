import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import SummaryApi from "../../common";
import { IconButton, Tooltip, Zoom } from "@mui/material";
import EventTwoToneIcon from '@mui/icons-material/EventTwoTone';
import SubjectTwoToneIcon from '@mui/icons-material/SubjectTwoTone';
import PaymentsTwoToneIcon from '@mui/icons-material/PaymentsTwoTone';
import NumbersTwoToneIcon from '@mui/icons-material/NumbersTwoTone';
import PetsTwoToneIcon from '@mui/icons-material/PetsTwoTone';
import { format } from 'date-fns';

export default function BookingList() {
  const [bookings, setBookings] = useState([]);
  const [filteredStatus, setFilteredStatus] = useState("All");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch(SummaryApi.allBookings.url, {
        method: SummaryApi.allBookings.method,
        credentials: 'include',
      });
      const data = await response.json();
      if (data.success) {
        setBookings(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to fetch bookings");
    }
  };

  const handleStatusUpdate = async (_id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/update-status/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: "PROCESS" }),
      });
      const result = await response.json();
      if (result.success) {
        toast.success('Booking status updated to PROCESS');
        // Refresh bookings list after update
        fetchBookings();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Failed to update booking status");
    }
  };

  const handleFilterChange = (event) => {
    setFilteredStatus(event.target.value);
  };

  const filterBookings = (booking) => {
    if (filteredStatus === "All") {
      return true;
    }
    return booking.status === filteredStatus;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN').format(amount);
  };

  return (
    <div className="bookingList-component">
      <div className="container-fluid">
        <div className="container">
          <div className="table">
            <div className="row">
              <div className="col-2"></div>
              <div className="col-8">
                <div className="heading">Booking List</div>
              </div>
              <div className="col-2">
                <img className="table-heading-right" src="assets/imgs/gif-1.gif" alt="" />
              </div>
            </div>
            {/* Filter bar */}
            <div className="row justify-content-end mb-4">
              <div className="col-auto">
                <select className="form-select" value={filteredStatus} onChange={handleFilterChange}>
                  <option value="All">All</option>
                  <option value="PENDING">PENDING</option>
                  <option value="PROCESS">PROCESS</option>
                  <option value="FINISHED">FINISHED</option>
                  <option value="CANCELLED">CANCELLED</option>
                </select>
              </div>
            </div>
            <table>
              <thead>
                <tr>
                  <th style={{ textAlign: "center" }}><NumbersTwoToneIcon /> No.</th>
                  <th style={{ textAlign: "center" }}><PetsTwoToneIcon /> Pet's Name</th>
                  <th style={{ textAlign: "center" }}><EventTwoToneIcon /> Date</th>
                  <th style={{ textAlign: "center" }}><EventTwoToneIcon /> Time</th>
                  <th style={{ textAlign: "center" }}><PaymentsTwoToneIcon /> Total</th>
                  <th style={{ textAlign: "center" }}><SubjectTwoToneIcon /> Status</th>
                  <th><SubjectTwoToneIcon /> Detail</th>
                  <th><SubjectTwoToneIcon /> Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings.filter(filterBookings).map((booking, index) => {
                  const date = new Date(booking?.date);
                  const formattedDate = format(date, 'yyyy-MM-dd');
                  const formattedTime = format(date, 'HH:mm');
                  return (
                    <tr key={booking._id}>
                      <td style={{ textAlign: "center" }}>{index + 1}</td>
                      <td style={{ textAlign: "center" }}>{booking?.petName}</td>
                      <td style={{ textAlign: "center" }}>{formattedDate}</td>
                      <td style={{ textAlign: "center" }}>{formattedTime}</td>
                      <td style={{ textAlign: "right" }}>{formatCurrency(booking?.total)}</td>
                      <td className={`status-${booking?.status}`} style={{ textAlign: "center" }}>{booking?.status}</td>
                      <td>
                        <Link className="update-button" to={`/bookingDetail?${booking._id}`}>
                          <Tooltip TransitionComponent={Zoom} arrow>
                            <IconButton>
                              <SubjectTwoToneIcon />
                            </IconButton>
                          </Tooltip>
                        </Link>
                      </td>
                      <td>
                        {booking.status === "PENDING" && (
                          <button onClick={() => handleStatusUpdate(booking.id)} className="btn btn-success">
                            Confirm
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
