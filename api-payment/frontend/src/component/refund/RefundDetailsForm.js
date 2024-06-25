import React from 'react';

class RefundDetailsForm extends React.Component {
  state = {
    refundDetails: null,
    error: null
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const refundId = e.target.elements['refund-id'].value;

    fetch(`https://api.example.com/refunds/${refundId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(result => {
      this.setState({ refundDetails: result, error: null });
    })
    .catch(error => {
      console.error('Error:', error);
      this.setState({ refundDetails: null, error: 'Failed to get refund details!' });
    });
  }

  render() {
    const { refundDetails, error } = this.state;

    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="refund-id">Refund ID:</label>
          <input type="text" id="refund-id" name="refund-id" required />
          
          <button type="submit">Get Refund Details</button>
        </form>
        {refundDetails && (
          <div id="refund-details-result">
            <h3>Refund Details</h3>
            <p><strong>Refund ID:</strong> {refundDetails.id}</p>
            <p><strong>Status:</strong> {refundDetails.status}</p>
            <p><strong>Amount:</strong> {refundDetails.amount}</p>
            <p><strong>Reason:</strong> {refundDetails.reason}</p>
          </div>
        )}
        {error && <p>{error}</p>}
      </>
    );
  }
}

export default RefundDetailsForm;