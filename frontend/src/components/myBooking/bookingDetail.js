import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import "react-tooltip/dist/react-tooltip.css";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PetsIcon from '@mui/icons-material/Pets';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import TodayIcon from '@mui/icons-material/Today';
import { FaCircleCheck } from "react-icons/fa6";
import RefundPage from '../template/Refund'; // Assuming you have a separate RefundPage component

export default function BookingDetail() {
  const location = useLocation();
  const { state } = location;
  const { userName, email, petName, petType, date, services, combo, total } = state || {};

  const formattedDate = date ? new Date(date).toLocaleString() : '';

  const user = useSelector(state => state?.user?.user);

  const [showRefundForm, setShowRefundForm] = useState(false);

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
                      <PersonOutlineIcon /> Name: {userName}
                    </div>
                    <div className="inputBookDetail">
                      <PetsIcon /> Pet type: {petType}
                    </div>
                    <div className="inputBookDetail">
                      <PetsIcon /> Pet's name: {petName}
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="mb-3 first">
                    <div className="inputBookDetail">
                      <MailOutlineIcon /> Email: {email}
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
              {services ? (
                services.map((service, index) => (
                  <div className="service" key={index}>
                    <div>{service}</div>
                    <FaCircleCheck />
                  </div>
                ))
              ) : (
                <div>No services available</div>
              )}

              <h2>Combo</h2>
              {combo ? (
                <div className="service">
                  {combo}
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
                <h3>{total} $</h3>
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
                <button className="btn btn-danger" type="button" onClick={() => setShowRefundForm(!showRefundForm)}>
                  Cancel
                </button>
              </div>
            </div>
          </form>

          {showRefundForm && (
            <RefundPage /> // Render the RefundPage component when showRefundForm is true
          )}
        </div>
      </div>
    </div>
  );
}
