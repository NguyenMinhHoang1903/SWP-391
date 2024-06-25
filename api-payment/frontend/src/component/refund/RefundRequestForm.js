import React from 'react';

class RefundRequestForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    fetch('https://api.example.com/refunds', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
      alert('Refund request successful!');
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Refund request failed!');
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="booking-id">Booking ID:</label>
        <input type="text" id="booking-id" name="booking-id" required />
        
        <label htmlFor="reason">Reason:</label>
        <textarea id="reason" name="reason" required></textarea>
        
        <button type="submit">Request Refund</button>
      </form>
    );
  }
}

export default RefundRequestForm;