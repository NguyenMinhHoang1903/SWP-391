import React from 'react';

const Header = () => {
  return (
    <div className="navbar-container">
      <div className="navbar">
        <div className="navbar-left">
          <img src="logo.png" alt="LogoPet" />
          <div>Home</div>
          <div>Booking Spa</div>
          <div>View Combo</div>
          <div>Member</div>
        </div>
        <div>
          <ul className="navbar-right">
            <div className="sign-in" style={{ color: "white" }}>User Account</div>
            <div className="logout" style={{ color: "white", textAlign: "center" }}>Logout</div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;