import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import SummaryApi from "../../common";
import Tooltip from "@mui/material/Tooltip";
import { format } from 'date-fns';
import { IconButton, Zoom } from "@mui/material";
import EventTwoToneIcon from '@mui/icons-material/EventTwoTone';
import SubjectTwoToneIcon from '@mui/icons-material/SubjectTwoTone';
import PaymentsTwoToneIcon from '@mui/icons-material/PaymentsTwoTone';
import NumbersTwoToneIcon from '@mui/icons-material/NumbersTwoTone';
import PetsTwoToneIcon from '@mui/icons-material/PetsTwoTone';
import { Link } from "react-router-dom";

export default function MyBooking() {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const [MyBookingList, setAllBooking] = useState([]);
  const [filteredStatus, setFilteredStatus] = useState("All"); // State to store filtered status

  const [data, setData] = useState({
    userName: user?.name || "",
    petName: "",
    date: "",
    total: "",
    status: "",
  });

  useEffect(() => {
    if (user) {
      setData(prev => ({
        ...prev,
        userName: user.name,
      }));
    }
  }, [user]);

  useEffect(() => {
    fetchAllBooking();
  }, []);

  const fetchAllBooking = async () => {
    try {
      const fetchData = await fetch(SummaryApi.allMyBooking.url, {
        method: SummaryApi.allMyBooking.method,
        credentials: 'include',
      });
  
      const dataResponse = await fetchData.json();
      if (dataResponse.success) {
        // Filter bookings by logged-in user
        const userBookings = dataResponse.data.filter(booking => booking.userName === user.name);
        // Sort bookings by date in ascending order (oldest to newest)
        userBookings.sort((a, b) => new Date(b.date) - new Date(a.date));
        setAllBooking(userBookings);
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

  const filterBookings = (booking) => {
    if (filteredStatus === "All") {
      return true; // Show all bookings if "All" is selected
    } else {
      return booking.status === filteredStatus; // Filter by selected status
    }
  };

  return (
    <div className="manageStaff-component">
      <div className="container-fluid">
        <div className="container">
          <div className="table">
            <div className="row">
              <div className="col-2"></div>
              <div className="col-8">
                <div className="heading">My Booking</div>
              </div>
              <div className="col-2">
                <img
                  className="table-heading-right"
                  src="assets/imgs/gif-1.gif"
                  alt=""
                />
              </div>
            </div>
            {/* Filter bar */}
            <div className="row justify-content-end mb-3">
              <div className="col-auto">
                <select
                  className="form-select"
                  value={filteredStatus}
                  onChange={handleFilterChange}
                >
                  <option value="All">All</option>
                  <option value="Pending">Pending</option>
                  <option value="Process">Process</option>
                  <option value="Finished">Finished</option>
                  <option value="Canceled">Canceled</option>
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
                </tr>
              </thead>
              <tbody>
                {MyBookingList.filter(filterBookings).map((data, index) => {
                  const date = new Date(data?.date);
                  const formattedDate = format(date, 'yyyy-MM-dd');
                  const formattedTime = format(date, 'HH:mm');
                  return (
                    <tr key={data?.userName}>
                      <td style={{ textAlign: "center" }}>{index + 1}</td>
                      <td style={{ textAlign: "center" }}>{data?.petName}</td>
                      <td style={{ textAlign: "center" }}>{formattedDate}</td>
                      <td style={{ textAlign: "center" }}>{formattedTime}</td>
                      <td style={{ textAlign: "right" }}>{data?.total}</td>
                      <td className={`status-${data?.status}`} style={{ textAlign: "center" }}>{data?.status}</td>
                      <td>
                        <Link
                          className="update-button"
                          to={`/mybooking?${data._id}`}
                        >
                          <Tooltip TransitionComponent={Zoom} arrow>
                            <IconButton>
                              <SubjectTwoToneIcon />
                            </IconButton>
                          </Tooltip>
                        </Link>
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
