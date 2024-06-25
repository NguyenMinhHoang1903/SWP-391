import React, { useState } from 'react';

const ChangeBooking = () => {
  const [bookingInfo, setBookingInfo] = useState({
    bookingID: "",
    service: "",
    date: "",
    time: "",
    notes: ""
  });

  const loadBookingInfo = () => {
    // Simulate loading booking information from server
    const booking = {
      bookingID: "12345",
      service: "Pet Grooming",
      date: "2024-06-15",
      time: "10:00 AM",
      notes: "Small poodle named Max"
    };
    setBookingInfo(booking);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (you can send this data to server via AJAX if needed)
    console.log("Form Submitted!");
  };

  return (
    <main>
      <section id="booking-info-section">
        <h2>Current Booking Information</h2>
        <button onClick={loadBookingInfo}>Load Booking Info</button>
        <div id="booking-info">
          <p><strong>Booking ID:</strong> <span id="info-booking-id">{bookingInfo.bookingID}</span></p>
          <p><strong>Service:</strong> <span id="info-service">{bookingInfo.service}</span></p>
          <p><strong>Date:</strong> <span id="info-date">{bookingInfo.date}</span></p>
          <p><strong>Time:</strong> <span id="info-time">{bookingInfo.time}</span></p>
          <p><strong>Notes:</strong> <span id="info-notes">{bookingInfo.notes}</span></p>
        </div>
      </section>

      <section id="edit-booking-info-section">
        <h2>Edit Booking Information</h2>
        <form id="edit-booking-info-form" onSubmit={handleSubmit}>
          <label htmlFor="new-service">New Service:</label>
          <input type="text" id="new-service" name="new-service" required />

          <label htmlFor="new-date">New Date:</label>
          <input type="date" id="new-date" name="new-date" required />

          <label htmlFor="new-time">New Time:</label>
          <input type="time" id="new-time" name="new-time" required />

          <label htmlFor="new-notes">New Notes:</label>
          <input type="text" id="new-notes" name="new-notes" />

          <button type="submit">Update Booking Info</button>
        </form>
      </section>
    </main>
  );
};

export default ChangeBooking;