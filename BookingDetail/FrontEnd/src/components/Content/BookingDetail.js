import React, { useState } from 'react';
import './BookingDetail.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import PetsIcon from '@mui/icons-material/Pets';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import TodayIcon from '@mui/icons-material/Today';

const BookingDetail = () => {

  const [data] = useState({
    name: "user.name",
    dateTime: "",
    email: "",
    typePet: "",
    petName: ""
  });

  const [services, setItems] = useState([
    { service: 'Item 1', price: 100 },
    { service: 'Item 2', price: 200 },
  ]);

  const handleDeleteItem = (index) => {
    const updatedItems = [...services];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const calculateTotalAmount = () => {
    return services.reduce((total, service) => total + service.price, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    /*try {
      const fetchResponse = await fetch(SummaryApi.BookingDetail.url, {
        method: SummaryApi.BookingDetail.method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
      });

      const responseData = await fetchResponse.json();

      if (responseData.success) {
        toast.success(responseData.message);
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      toast.error("An error occurred");
    }*/
  };

  return (
    <div className='contentBookDetail'>
      <div className='container'>
        <div className='container-heading'>
          <h1>Booking Detail</h1>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Information */}
          <div className='infor'>
            <div className='row'>
              <div className='col-6'>
                <div className='mb-3 first'>
                  <div className="input"><PersonOutlineIcon/> Name: {data.name}</div>
                  <div className="input"><PetsIcon/> Pet type: {data.typePet}</div>
                  <div className="input"><PetsIcon/> Pet's name: {data.petName}</div>
                </div>
              </div>
              <div className='col-6'>
                <div className='mb-3 first'>
                  <div className="input"><MailOutlineIcon/> Email: {data.email}</div>
                  <div className="input"><TodayIcon/> Date Time: {data.dateTime}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Service list */}
          <div className="service-list">
            <h2>Service List</h2>
            {services.map((service, index) => (
              <div className="service" key={index}>
                <div>{service.service}</div>
                <div>Price: {service.price}VND</div>
                <button onClick={() => handleDeleteItem(index)}><DeleteIcon/></button>
              </div>
            ))}
          </div>

          {/* Total Amount */}
          <div className="total row">
            <div className="col-md-5 text-left">
              <h3>Total Amount:</h3>
            </div>
            <div className="col-md-7 text-right">
              <h3>{calculateTotalAmount()}VND</h3>
            </div>
          </div>

          <div className="button row">
          <div className="col-6 text-left"> {/* Cột trái căn trái */}
            <button className="btn btn-success" type="submit"><ArrowBackIcon/></button>
          </div>
          <div className="col-6 text-right"> {/* Cột phải căn phải */}
            <button className="btn btn-success" type="submit">Confirm</button>
          </div>
        </div>

        </form>
      </div>
    </div>
  );
};

export default BookingDetail;