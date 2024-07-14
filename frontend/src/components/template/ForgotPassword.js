import React, { useState } from 'react';
import axios from 'axios';
import SummaryApi from '../../common';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post(SummaryApi.forgotpassword.url, { email });
      setSuccess('Password reset link has been sent to your email.');
    } catch (error) {
      console.error('Error sending reset password request:', error);
      setError('Gmail address is not registered. Please check your email and try again.');
    }
  };

  return (
    <div className='contentResetpassword'>
      <div className='container'>
        <div className='forgotStyle'>
        <h2 style={{textAlign: 'center'}}>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          placeholder='Enter Your Email'
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <button className="login-button"  type="submit">Send Email</button>
      </form>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {success && <div style={{ color: 'green' }}>{success}</div>}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;