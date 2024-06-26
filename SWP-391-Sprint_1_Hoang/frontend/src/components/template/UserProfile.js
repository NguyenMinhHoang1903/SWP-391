import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const UserProfile = () => {
  const [error] = useState('');
  const user = useSelector(state => state?.user?.user);

  const [data, setData] = useState({
    Fullname: "",
    Gender: "",
    Address: "",
    Birthday: "",
    PhoneNumber: "",
    Email: "",
  });

  const handleOnChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox' || type === 'radio') {
      setData(prev => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.PhoneNumber.length < 10) {
      toast.error("Phone number must have 10 digits");
      return;
    }

    // Add your API call here to update user profile
    console.log("Submitting data:", data);
  };

  return (
    <>
      <div className='contentProfile'>
        <div className='container'>
          <div className='container-heading'><h1>Profile</h1></div>
          <form onSubmit={handleSubmit}>

            {/* Avatar */}
            <div className='avatar'>
              <img src='assets/imgs/avatar.jpg' alt='' />
            </div>
            <div className='customer-name'><h1>{user?.name}</h1></div>
            <div className='change'><button className='btn-change' type='file' accept="image/*">Change Avatar</button></div>

            {/* Enter info of customer */}
            <div className='row align-items-center'>
              <div className='col-6'>
                <div className='input-group mb-3'>
                  <div className="input-group-text">Full Name</div>
                  <input
                    type='text'
                    value={data.Fullname}
                    className='form-control'
                    name='Fullname'
                    onChange={handleOnChange}
                    placeholder='Enter your fullname'
                  />
                </div>
              </div>

              <div className='col-6'>
                <div className='input-group mb-3'>
                  <div className="input-group-text">Date Of Birth</div>
                  <input
                    type='text'
                    value={data.Birthday}
                    className='form-control'
                    name='Birthday'
                    onChange={handleOnChange}
                    placeholder='dd/mm/yyyy'
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
                        name='Gender'
                        id='male'
                        onChange={handleOnChange}
                        checked={data.Gender === "Male"}
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
                        name='Gender'
                        id='female'
                        onChange={handleOnChange}
                        checked={data.Gender === "Female"}
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
                    value={data.PhoneNumber}
                    className='form-control'
                    name='PhoneNumber'
                    onChange={handleOnChange}
                    placeholder='Phone Number'
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
                    value={data.Address}
                    className='form-control'
                    name='Address'
                    onChange={handleOnChange}
                    placeholder='123 Paster'
                  />
                </div>
              </div>
              <div className='col-6'>
                <div className='input-group mb-3'>
                  <div className="input-group-text">Email</div>
                  <input
                    type='text'
                    className='form-control'
                    name='Email'
                    onChange={handleOnChange}
                    placeholder='@gmail.com'
                  />
                </div>
              </div>
            </div>

            {/* Request button */}
            <button className='btn btn-success' type='submit'>Update</button>
            <div className='link'><li className='nav-item'><a className='nav-link' href='#'>Change Password</a></li></div>

          </form>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
