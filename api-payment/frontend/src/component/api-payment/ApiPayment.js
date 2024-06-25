import React from 'react';

class CustomerSection extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const payload = Object.fromEntries(data);

    fetch('https://api.example.com/customer-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(result => {
      alert('Payment successful!');
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Payment failed!');
    });
  }

  render() {
    return (
      <section id="customer-section">
        <h2>Customer Payment</h2>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="customer-name">Name:</label>
          <input type="text" id="customer-name" name="customer-name" required />
          
          <label htmlFor="customer-email">Email:</label>
          <input type="email" id="customer-email" name="customer-email" required />
          
          <label htmlFor="service">Service:</label>
          <select id="service" name="service" required>
            <option value="grooming">Cut</option>
            <option value="grooming">Wash</option>
            <option value="grooming">Grooming</option>
            <option value="massage">Massage</option>
            <option value="health-check">Health Check</option>
          </select>
          
          <label htmlFor="amount">Amount:</label>
          <input type="number" id="amount" name="amount" required />
          
          <button type="submit">Pay Now</button>
        </form>
      </section>
    );
  }
}

class StaffSection extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const payload = Object.fromEntries(data);

    fetch('https://api.example.com/staff-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(result => {
      alert('Payment processed!');
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Payment processing failed!');
    });
  }

  render() {
    return (
      <section id="staff-section">
        <h2>Staff Management</h2>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="staff-name">Staff Name:</label>
          <input type="text" id="staff-name" name="staff-name" required />
          
          <label htmlFor="staff-id">Staff ID:</label>
          <input type="text" id="staff-id" name="staff-id" required />
          
          <label htmlFor="payment-amount">Payment Amount:</label>
          <input type="number" id="payment-amount" name="payment-amount" required />
          
          <button type="submit">Process Payment</button>
        </form>
      </section>
    );
  }
}

const Main = () => (
  <main>
    <CustomerSection />
    <StaffSection />
  </main>
);

export default Main;