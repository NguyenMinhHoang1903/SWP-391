import React, { useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import "react-tooltip/dist/react-tooltip.css";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PetsIcon from '@mui/icons-material/Pets';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import TodayIcon from '@mui/icons-material/Today';
import { FaCircleCheck } from "react-icons/fa6";

export default function BookingDetail() {
  const [booking, setBooking] = useState("");
  const location = useLocation();
  const passedid = location.search.substring(1);
  const formattedDate = booking.date ? new Date(booking.date).toLocaleString() : '';
  const [canRefund, setCanRefund] = useState(false); // State for enabling/disabling Refund button

  const readOneBooking = async () => {
    await fetch(`http://localhost:5000/api/myBooking/readOne/${passedid}`)
      .then((res) => res.json())
      .then((json) => setBooking(json.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    readOneBooking();
  }, []);

  useEffect(() => {
    // Calculate current time
    const currentTime = new Date();
    // Calculate 2 hours before booking time
    const bookingTime = new Date(booking.date);
    const timeBeforeBooking = new Date(bookingTime);
    timeBeforeBooking.setHours(bookingTime.getHours() - 2);

    // Enable refund if current time is before 2 hours of booking time
    setCanRefund(currentTime < timeBeforeBooking);
  }, [booking.date]);

  return (
    <div className="bookingDetail-component">
      <video src="assets/videos/video-5.webm" autoPlay muted loop></video>
      <div className="contentBookDetail">
        <div className="containerBookDetail">
          <div className="container-heading">
            <h1>Booking Detail</h1>
          </div>
          <form>
            <div className="infor">
              <div className="row">
                <div className="col-6">
                  <div className="mb-3 first">
                    <div className="inputBookDetail">
                      <PersonOutlineIcon /> Name: {booking.userName}
                    </div>
                    <div className="inputBookDetail">
                      <PetsIcon /> Pet type: {booking.petType}
                    </div>
                    <div className="inputBookDetail">
                      <PetsIcon /> Pet's name: {booking.petName}
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="mb-3 first">
                    <div className="inputBookDetail">
                      <MailOutlineIcon /> Email: {booking.email}
                    </div>
                    <div className="inputBookDetail">
                      <TodayIcon /> Date Time: {formattedDate}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="service-list">
              <h2>Service List</h2>
              {booking.services ? (
                booking.services.map((service, index) => (
                  <div className="service" key={index}>
                    <div>{service}</div>
                    <FaCircleCheck />
                  </div>
                ))
              ) : (
                <div>No services available</div>
              )}

              <h2>Combo</h2>
              {booking.combo ? (
                <div className="service">
                  {booking.combo}
                  <FaCircleCheck />
                </div>
              ) : (
                <div>No combo available</div>
              )}
            </div>

            <div className="total row">
              <div className="col-md-2 text-left">
                <h3>Total Amount:</h3>
              </div>
              <div className="col-md-2 text-right">
                <h3>{booking.total} VND</h3>
              </div>
            </div>

            <div className="button row">
              <div className="col-6 text-left">
                <Link to="/myBookingList">
                  <button className="btn btn-success" type="button">
                    <ArrowBackIcon />
                  </button>
                </Link>
              </div>
              <div className="col-6 text-right">
                {booking.status === "PROCESS" && (
                  <Link to={`/refund?${booking._id}`}>
                    <button className="btn btn-success" type="button" disabled={!canRefund}>
                      Refund
                    </button>
                  </Link>
                )}
              </div>
              <div className="col-6 text-right">
                {booking.status === "PENDING" && (
                  <Link to={`http://localhost:8888/order/create_payment_url?${booking.total}`}>
                    <button className="btn btn-success" type="button">
                      Paying
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
