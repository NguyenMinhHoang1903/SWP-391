import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import SummaryApi from "../../common";
import { format } from 'date-fns';
import Tooltip from "@mui/material/Tooltip";
import { IconButton, Zoom } from "@mui/material";
import EventTwoToneIcon from '@mui/icons-material/EventTwoTone';
import SubjectTwoToneIcon from '@mui/icons-material/SubjectTwoTone';
import PaymentsTwoToneIcon from '@mui/icons-material/PaymentsTwoTone';
import NumbersTwoToneIcon from '@mui/icons-material/NumbersTwoTone';
import PetsTwoToneIcon from '@mui/icons-material/PetsTwoTone';
import { Link } from "react-router-dom";
import { TiEdit } from "react-icons/ti";
import ChangeBookingRole from "./updateBooking";

export default function ManageBooking() {
  const [bookingList, setBookingList] = useState([]);
  const [openUpdateRole, setOpenUpdateRole] = useState(false);
  const [filteredStatus, setFilteredStatus] = useState("All"); // State to store filtered status

  const [updateBookingDetails, setUpdateBookingDetails] = useState({
    userName: "",
    status: "",
    _id: "",
  });

  const [data, setData] = useState({
    userName: "",
    petName: "",
    date: "",
    total: "",
    status: "",
  });


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
        // setBookingList(dataResponse.data);
      } else {
        toast.error(dataResponse.message);
      }
    } catch (error) {
      toast.error("Failed to fetch bookings");
    }
  };

  useEffect(() => {
    fetchAllBooking();
  }, []);

  // const [isOpen, setIsOpen] = useState(false);
  // const toggleMenu = () => {
  //   setIsOpen(!isOpen);
  // };
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
            
            {/* Filter bar */}
            <div className="row justify-content-end mb-3">
              <div className="col-auto">
                <select
                  className="form-select"
                  value={filteredStatus}
                  onChange={handleFilterChange}
                >
                  <option value="All">All</option>
                  <option value="PENDING">Pending</option>
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
                    <PetsTwoToneIcon /> Customer's Name
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
                {bookingList.filter(filterBookings).map((data, index) => {
                  const date = new Date(data?.date);
                  const formattedDate = format(date, 'yyyy-MM-dd');
                  const formattedTime = format(date, 'HH:mm');
                  return (
                    <tr key={data?.userName}>
                      <td style={{ textAlign: "center" }}>{index + 1}</td>
                      <td style={{ textAlign: "center" }}>{data?.userName}</td>
                      <td style={{ textAlign: "center" }}>{data?.petName}</td>
                      <td style={{ textAlign: "center" }}>{formattedDate}</td>
                      <td style={{ textAlign: "center" }}>{formattedTime}</td>
                      <td style={{ textAlign: "right" }}>{data?.total}</td>
                      {/* <td style={{ textAlign: "center" }}>{data?.status}</td> */}
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
                        {" "}
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
