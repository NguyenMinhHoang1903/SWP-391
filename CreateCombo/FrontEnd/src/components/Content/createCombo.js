import React, { useState } from 'react';
import Select from 'react-select';
import { toast, ToastContainer } from 'react-toastify';
import DatePicker from 'react-datepicker';
import { NumericFormat } from 'react-number-format';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-toastify/dist/ReactToastify.css';
import './createCombo.css';

const CreateCombo = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const optionsData = [
    { label: "Bathing", value: "Bathing" },
    { label: "Trim nails", value: "Trim nails" },
    { label: "Dye hair", value: "Dye hair" },
    { label: "Grooming", value: "Grooming" }
  ];

  const [data, setData] = useState({
    comboName: "",
    service: [],
    price: "",
    startDate: new Date(),
    endDate: new Date(),
    description: ""
  });

  const handleOnChange = (e) => {
    const { id, value } = e.target;
    setData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleDateChange = (date, field) => {
    setData(prev => ({
      ...prev,
      [field]: date
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.service.length < 2) {
      toast.error("Please select at least two services");
      return;
    }

    if (data.endDate < data.startDate) {
      toast.error("End date cannot be before start date");
      return;
    }

    // Add the API call logic here
    /*
    try {
      const response = await fetch(SummaryApi.createCombo.url, {
        method: SummaryApi.createCombo.method,
        headers: {
          "Content-Type": "application/json",
          // Uncomment and set the Authorization header if needed
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(data)
      });

      const dataApi = await response.json();

      if (dataApi.success) {
        toast.success(dataApi.message);
      } else {
        toast.error(dataApi.message);
      }
    } catch (error) {
      toast.error("An error occurred while trying to create the combo");
      console.error("Error:", error);
    }
    */
  };

  const handleChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
    setData(prev => ({
      ...prev,
      service: selectedOptions.map(option => option.value)
    }));
  };

  const handlePriceChange = (values) => {
    const { value } = values;
    setData(prev => ({
      ...prev,
      price: value
    }));
  };

  const customComponents = {
    Option: (props) => {
      const { data, getStyles, innerRef, innerProps, isSelected } = props;
      const defaultStyles = getStyles("option", props);
      const styles = {
        ...defaultStyles,
        display: 'flex',
        alignItems: 'center',
      };
      return (
        <div {...innerProps} ref={innerRef} style={styles} className="custom-option">
          <input type="checkbox" checked={isSelected} readOnly />
          <label>{data.label}</label>
        </div>
      );
    }
  };

  return (
    <div className='content'>
      <div className='container'>
        <div className='container-heading'><h1>Create Combo</h1></div>
        <form onSubmit={handleSubmit}>
          <div className='combo'>
            <div className='create-combo'>
              <div className='input-group mb-3'>
                <div className="input-group-text">Combo Name</div>
                <input
                  type='text'
                  onChange={handleOnChange}
                  className='form-control'
                  id='comboName'
                  placeholder='Enter'
                  required
                />
              </div>

              <div className='input-group mb-3'>
                <div className="input-group-text">Service</div>
                <Select
                  value={selectedOptions}
                  onChange={handleChange}
                  options={optionsData}
                  isMulti={true}
                  components={customComponents}
                  hideSelectedOptions={false}
                  closeMenuOnSelect={false}
                  className="custom-select-container"
                  classNamePrefix="custom-select"
                  required
                />
              </div>

              <div className='input-group mb-3'>
                <div className="input-group-text">Price</div>
                <NumericFormat
                  value={data.price}
                  onValueChange={handlePriceChange}
                  thousandSeparator="."
                  decimalSeparator=","
                  suffix="VND "
                  className='form-control'
                  placeholder='Enter price'
                  isNumericString
                  allowNegative={false}
                  required
                />
              </div>

              <div className='input-group mb-3'>
                <div className="input-group-text">Start date</div>
                <DatePicker
                  selected={data.startDate}
                  onChange={(date) => handleDateChange(date, 'startDate')}
                  className='form-control'
                  id='startDate'
                  placeholderText='Enter'
                  required
                  minDate={new Date()}
                />
              </div>

              <div className='input-group mb-3'>
                <div className="input-group-text">End date</div>
                <DatePicker
                  selected={data.endDate}
                  onChange={(date) => handleDateChange(date, 'endDate')}
                  className='form-control'
                  id='endDate'
                  placeholderText='Enter'
                  required
                  minDate={data.startDate}
                />
              </div>

              <div className='input-group mb-3'>
                <div className="input-group-text">Description</div>
                <input
                  type='text'
                  onChange={handleOnChange}
                  className='form-control'
                  id='description'
                  placeholder='Enter'
                  required
                />
              </div>
            </div>
          </div>

          <div className="button-group">
            <button className='btn btn-success' type='submit'>Submit</button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CreateCombo;
