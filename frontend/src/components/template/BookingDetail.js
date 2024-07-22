import { Link, useLocation } from "react-router-dom";
import "react-tooltip/dist/react-tooltip.css";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PetsIcon from '@mui/icons-material/Pets';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import TodayIcon from '@mui/icons-material/Today';
import { FaCircleCheck } from "react-icons/fa6";

export default function BookingDetail() {
  const location = useLocation();
  const { id, userName, email, petName, petType, date, services, combo, total } = location.state || {};

  // Convert date to a readable string
  const formattedDate = new Date(date).toLocaleString();

  // Format price
  const formattedPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  }
  return (
    <>
      <div className="bookingDetail-component">
        {/* Video */}
        <video src="assets/videos/video-5.webm" autoPlay muted loop></video>
        
        <div className="contentBookDetail">
          <div className="containerBookDetail">
            <div className="container-heading">
              <h1>Booking Detail</h1>
            </div>

            <form>
              {/* Information */}
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

              {/* Service list */}
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

              {/* Total Amount */}
              <div className="total row">
                <div className="col-md-2 text-left">
                  <h3>Total Amount:</h3>
                </div>
                <div className="col-md-2 text-right">
                  <h3>{formattedPrice(total)} VND</h3>
                </div>
              </div>

              <div className="button row">
                <div className="col-6 text-left">
                  <Link to = "/booking">
                  <button className="btn btn-success" type="button">
                    <ArrowBackIcon />
                  </button></Link>
                </div>
                <div className="col-6 text-right">
                  <a href = {`http://localhost:8888/order/create_payment_url?id=${id}&total=${total}`} className="btn btn-success">Confirm</a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
