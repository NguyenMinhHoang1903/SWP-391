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
      const response = await fetch(SummaryApi.forgotpassword.url, { 
        method: SummaryApi.forgotpassword.method,
      });
      setSuccess('Password reset successfully. Check your email for the new password.');
    } catch (error) {
      console.error('Error sending reset password request:', error);
      setError('Error resetting password');
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {success && <div style={{ color: 'green' }}>{success}</div>}
    </div>
  );
};

export default ForgotPassword;