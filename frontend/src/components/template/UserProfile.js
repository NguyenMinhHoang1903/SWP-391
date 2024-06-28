import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import SummaryApi from "../../common/index";

const UserProfile = () => {
  const user = useSelector(state => state?.user?.user);
  //const token = useSelector(state => state?.auth?.token);
  const [data, setData] = useState({
    name: "",
    fullname: "",
    dateOfBirth: "",
    gender: "",
    phoneNumber: "",
    address: "",
    email: "",
  });

  useEffect(() => {
    if (user) {
      setData({
        name: user.name || "",
        fullname: user.fullname || "",
        dateOfBirth: user.dateOfBirth ? new Date(user.dateOfBirth).toISOString().substring(0, 10) : "",
        gender: user.gender || "",
        phoneNumber: user.phoneNumber || "",
        address: user.address || "",
        email: user.email || "",
      });
    }
  }, [user]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if date of birth is in the future
    const today = new Date();
    const dateOfBirth = new Date(data.dateOfBirth);

    if (dateOfBirth > today) {
      toast.error("Date of Birth cannot be in the future");
      return;
    }

    try {
      const fetchResponse = await fetch(SummaryApi.updateProfile.url, {
        method: SummaryApi.updateProfile.method,
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
      toast.error("An error occurred while updating the profile");
    }
  };

  return (
    <div className='contentProfile'>
      <div className='container'>
        <div className='container-heading'><h1>User Profile</h1></div>
        <form onSubmit={handleSubmit}>
          <div className='avatar'>
            <img src='Logo.png' alt='' />
          </div>
          <div className='customer-name' style={{margin: 20, color: 'white' , fontSize: 24}}><h1>{user?.name}</h1></div>
          {/* <div className='change'>
            <button className='btn-change' type='button'>Change Avatar</button>
          </div> */}

          <div className='row align-items-center'>
            <div className='col-6'>
              <div className='input-group mb-3'>
                <div className="input-group-text">Full Name</div>
                <input
                  type='text'
                  className='form-control'
                  name='fullname'
                  value={data.fullname}
                  onChange={handleOnChange}
                  placeholder='Fullname'
                  required
                />
              </div>
            </div>

            <div className='col-6'>
              <div className='input-group mb-3'>
                <div className="input-group-text">Date Of Birth</div>
                <input
                  type='date'
                  className='form-control'
                  name='dateOfBirth'
                  value={data.dateOfBirth}
                  onChange={handleOnChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className='row align-items-center'>
            <div className='col-6'>
              <div className='input-group mb-3'>
                <div className="input-group-text">Gender</div>
                <div className='col-2'>
                  <div className='form-check'>
                    <input
                      className="form-check-input"
                      type="radio"
                      value="Male"
                      name='gender'
                      id='male'
                      checked={data.gender === "Male"}
                      onChange={handleOnChange}
                    />
                    <label className='form-check-label' htmlFor='male'>Male</label>
                  </div>
                </div>

                <div className='col-2'>
                  <div className='form-check'>
                    <input
                      className="form-check-input"
                      type="radio"
                      value="Female"
                      name='gender'
                      id='female'
                      checked={data.gender === "Female"}
                      onChange={handleOnChange}
                    />
                    <label className='form-check-label' htmlFor='female'>Female</label>
                  </div>
                </div>
              </div>
            </div>

            <div className='col-6'>
              <div className='input-group mb-3'>
                <div className="input-group-text">Phone Number</div>
                <input
                  type='text'
                  className='form-control'
                  name='phoneNumber'
                  value={data.phoneNumber}
                  onChange={handleOnChange}
                  placeholder='Phone Number'
                  pattern='\d{10}'
                  title='Please enter a 10-digit phone number'
                  required
                />
              </div>
            </div>
          </div>

          <div className='row align-items-center'>
            <div className='col-6'>
              <div className='input-group mb-3'>
                <div className="input-group-text">Address</div>
                <input
                  type='text'
                  className='form-control'
                  name='address'
                  value={data.address}
                  onChange={handleOnChange}
                  placeholder='123 Paster'
                  required
                />
              </div>
            </div>

            <div className='col-6'>
              <div className='input-group mb-3'>
                <div className="input-group-text">Email</div>
                <input
                  type='text'
                  className='form-control'
                  name='email'
                  value={data.email}
                  onChange={handleOnChange}
                  placeholder='@gmail.com'
                  pattern='[a-zA-Z0-9._%+-]+@gmail.com'
                  title='Please enter a valid email address ending with @gmail.com'
                  required
                />
              </div>
            </div>
          </div>

          <button className='btn btn-success' type='submit'>Update</button>
          {/* <div className='link'>
            <li className='nav-item'>
              <a className='nav-link' href='#'>Change Password</a>
            </li>
          </div> */}
        </form>
      </div>
    </div>
  );
};

export default UserProfile;