import React from 'react';
import RefundRequestForm from './RefundRequestForm';
import RefundDetailsForm from './RefundDetailsForm';

const Main = () => (
  <main>
    <section id="customer-refund-section">
      <h2>Request Refund</h2>
      <RefundRequestForm />
    </section>
    <section id="refund-details-section">
      <h2>Refund Details</h2>
      <RefundDetailsForm />
    </section>
  </main>
);

export default Main;