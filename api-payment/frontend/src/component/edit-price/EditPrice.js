import React, { useState } from "react";

const EditPrice = () => {
  const [serviceId, setServiceId] = useState("");
  const [newPrice, setNewPrice] = useState("");

  const handleServiceIdChange = (event) => {
    setServiceId(event.target.value);
  };

  const handleNewPriceChange = (event) => {
    setNewPrice(event.target.value);
  };

  const handleEditPrice = () => {
    // Send PUT request to server to edit the price of the service with serviceId and newPrice
    fetch(`/services/${serviceId}/price`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // Add authentication header if needed
      },
      body: JSON.stringify({ price: newPrice }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Edit price success:", data);
        // Handle after successfully editing the price
      })
      .catch((error) => {
        console.error("Edit price error:", error);
        // Handle error
      });
  };

  return (
    <div className="edit-price-container">
      <h2>Edit Service Price</h2>
      <div>
        <label htmlFor="serviceId">Service ID:</label>
        <input
          type="text"
          id="serviceId"
          value={serviceId}
          onChange={handleServiceIdChange}
        />
      </div>
      <div>
        <label htmlFor="newPrice">New Price:</label>
        <input
          type="text"
          id="newPrice"
          value={newPrice}
          onChange={handleNewPriceChange}
        />
      </div>
      <button onClick={handleEditPrice}>Save</button>
    </div>
  );
};

export default EditPrice;