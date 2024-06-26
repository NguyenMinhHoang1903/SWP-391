import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { TiEdit } from 'react-icons/ti';
import './Content.css';

export default function ManageCustomer() {
  const user = useSelector((state) => state?.user?.user);
  const [allCustomers, setAllCustomers] = useState([]);
  const [openUpdateCustomer, setOpenUpdateCustomer] = useState(false);
  const [updateCustomerDetails, setUpdateCustomerDetails] = useState({
    phoneNumber: '',
    name: '',
    _id: '',
  });

  const fetchAllCustomers = async () => {
    try {
      const response = await fetch('/api/customers', { // Adjust the URL to your API endpoint
        method: 'GET',
        credentials: 'include',
      });
      const dataResponse = await response.json();

      if (dataResponse.success) {
        setAllCustomers(dataResponse.data);
      } else {
        toast.error(dataResponse.message);
      }
    } catch (error) {
      toast.error('Failed to fetch customers');
    }
  };

  useEffect(() => {
    fetchAllCustomers();
  }, []);

  return (
    <>
      <div className="manageCustomer-component">
        <div className="container-fluid">
          <div className="container">
            <div className="table">
              <div className="row">
                <div className="col-8">
                  <div className="table-heading-center">
                    <h1>Customer List</h1>
                  </div>
                </div>
                <div className="col-4">
                  <input
                    type="text"
                    className="form-control"
                    id="customer-name"
                    placeholder="Phone Number"
                    pattern="\d{10}"
                    title="Please enter a 10-digit phone number"
                    required
                  />
                  <button className="btn btn-success" type="submit">
                    Add New Customer
                  </button>
                </div>
              </div>
              <table>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'center' }}>St</th>
                    <th style={{ textAlign: 'center' }}>Name</th>
                    <th style={{ textAlign: 'center' }}>Phone Number</th>
                    <th style={{ textAlign: 'center' }}>Time</th>
                    <th>Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {allCustomers.map((customer, index) => (
                    <tr key={customer._id}>
                      <td style={{ textAlign: 'center' }}>{index + 1}</td>
                      <td>{customer.name}</td>
                      <td style={{ textAlign: 'center' }}>{customer.phoneNumber}</td>
                      <td style={{ textAlign: 'center' }}>
                        {moment(customer.createdAt).format('LL')}
                      </td>
                      <td>
                        <button
                          className="edit"
                          onClick={() => {
                            setUpdateCustomerDetails(customer);
                            setOpenUpdateCustomer(true);
                          }}
                        >
                          <TiEdit />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {openUpdateCustomer && (
          <ChangeCustomerDetails
            onClose={() => setOpenUpdateCustomer(false)}
            name={updateCustomerDetails.name}
            phoneNumber={updateCustomerDetails.phoneNumber}
            customerId={updateCustomerDetails._id}
            callFunc={fetchAllCustomers}
          />
        )}
      </div>
    </>
  );
}

function ChangeCustomerDetails({ onClose, name, phoneNumber, customerId, callFunc }) {
  // Implement the details for changing customer details.
  return (
    <div>
      <h2>Edit Customer</h2>
      <form>
        <input type="text" value={name} readOnly />
        <input type="text" value={phoneNumber} readOnly />
        <button type="button" onClick={onClose}>
          Close
        </button>
      </form>
    </div>
  );
}
