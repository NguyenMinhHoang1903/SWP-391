import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { setUserDetails } from "../../store/userSlice";
import SummaryApi from "../../common/index";

const ChangePassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state?.user?.user);

  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    name: "",
    password: "",
    userPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (user) {
      setData(prev => ({
        ...prev,
        name: user.name,
      }));
    }
  }, [user]);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: "include",
    });
    const data = await fetchData.json();
    if (data.success) {
      toast.success("Login again with the new password");
      dispatch(setUserDetails(null));
      navigate('/login');
    } else {
      toast.error(data.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.userPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (data.userPassword === data.password) {
      toast.error("The old password and the new password must be different");
      return;
    }

    if (data.userPassword !== data.confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }

    try {
      const fetchResponse = await fetch(SummaryApi.updatePassword.url, {
        method: SummaryApi.updatePassword.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await fetchResponse.json();

      if (responseData.success) {
        toast.success(responseData.message);
        await handleLogout();
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      toast.error("An error occurred while changing the password");
    }
  };

  if (!user) {
    return <div>Loading...</div>; // or redirect to login page
  }

  return (
    <div className='contentChangePassWord'>
      <div className='container'>
        <div className='container-heading'><h1>Change Password</h1></div>
        <form onSubmit={handleSubmit}>
          <div className='avatar'>
            <img src='Logo.png' alt='' />
          </div>
          <div className='user-name'><h1>{user.name}</h1></div>
          <div className='change'>
            <div className='change-password'>
              <div className='input-group mb-3'>
                <div className="input-group-addon">Old Password</div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={data.password}
                  name='password'
                  onChange={handleOnChange}
                  placeholder="Enter your old password"
                  required
                />
              </div>
              <div className='input-group mb-3'>
                <div className="input-group-addon">New Password</div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your new password"
                  value={data.userPassword}
                  name='userPassword'
                  onChange={handleOnChange}
                  required
                />
              </div>
              <div className='input-group mb-3'>
                <div className="input-group-addon">Confirm Password</div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Confirm your new password"
                  value={data.confirmPassword}
                  name='confirmPassword'
                  onChange={handleOnChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className="checkbox-changepassword" style={{marginLeft: 395 , marginBottom: 10}}>
              <input
                type="checkbox"
                checked={showPassword}
                onChange={toggleShowPassword}
              /> Show Password
          </div>
          <button className='btn btn-success' type='submit' >Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
