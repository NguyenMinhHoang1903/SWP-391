import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import AddCardRoundedIcon from '@mui/icons-material/AddCardRounded';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import WorkIcon from '@mui/icons-material/Work';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import PersonIcon from '@mui/icons-material/Person';
import { Tooltip } from 'react-tooltip';

const RefundPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    reason: "",
    bank: "",
    number: "",
    holder: "",
    refunded: "",
    agree: false // Add agree state
  });
  const [isOpen, setIsOpen] = useState(false); // Add tooltip state

  const reasonOptions = [
    { title: "Unexpected Emergencies", icon: <ErrorOutlineIcon /> },
    { title: "Illness", icon: <LocalHospitalIcon /> },
    { title: "Conflicting Commitments", icon: <CalendarTodayIcon /> },
    { title: "Weather Conditions", icon: <WbSunnyIcon /> },
    { title: "Work-Related Issues", icon: <WorkIcon /> },
    { title: "Transportation Problems", icon: <DirectionsBusIcon /> },
    { title: "Change of Plans", icon: <SwapHorizIcon /> },
    { title: "Personal Reasons", icon: <PersonIcon /> }
  ];

  const bankingOptions = [
    { title: "Vietcombank" },
    { title: "VietinBank" },
    { title: "BIDV" },
    { title: "Agribank" },
    { title: "Sacombank" },
    { title: "MB" },
    { title: "Techcombank" },
    { title: "ACB" },
    { title: "VPBank" },
    { title: "SHB" },
    { title: "EXIMBANK" },
    { title: "HSBC" },
    { title: "TPBank" },
    { title: "NCB" },
    { title: "Ocean Bank" },
    { title: "MSC" },
    { title: "HD Bank" },
    { title: "Nam A Bank" },
    { title: "OCB" },
    { title: "SCB" },
    { title: "IVB" },
    { title: "ABBANK" },
    { title: "VIB" },
    { title: "SeABank" },
    { title: "VIETBANK" },
    { title: "BVBank" },
    { title: "VIET A BANK" },
    { title: "BAC A BANK" },
    { title: "SAI GON BANK" },
  ];

  const defaultProps = {
    options: bankingOptions,
    getOptionLabel: (option) => option.title,
  };

  const reasonProps = {
    options: reasonOptions,
    getOptionLabel: (option) => option.title,
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAutocompleteChange = (event, value, reasonName) => {
    setData((prev) => ({
      ...prev,
      [reasonName]: value ? value.title : "",
    }));
  };

  const handleSwitchChange = (e) => {
    const { name, checked } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Perform form validation
    if (!data.bank || !data.holder || !data.number || !data.reason || !data.agree) {
      toast.error("All fields are required");
      return;
    }

    try {
      // Implement form submission logic here (e.g., send data to backend)
      // For now, just display a success message
      toast.success("Refund details submitted successfully");
      navigate('/'); // Navigate to the desired page after submission
    } catch (error) {
      toast.error("An error occurred while submitting the form");
    }
  };

  return (
    <div className='contentRefundPage'>
      <div className='container'>
        <div className='container-heading'><h1>Refund Information</h1></div>
        <form onSubmit={handleSubmit}>
          <div className='refund'>
            <div className='refund-details'>

              <div className='input-group mb-3'>
                <div className="input-group-addon">Reason</div>
                <Autocomplete
                  {...reasonProps}
                  id="reason-select"
                  disableCloseOnSelect
                  value={reasonOptions.find(option => option.title === data.reason) || null}
                  onChange={(event, value) => handleAutocompleteChange(event, value, "reason")}
                  sx={{ width: '55%' }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      placeholder="Select reason for refund"
                      required
                    />
                  )}
                  renderOption={(props, option) => (
                    <li {...props}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        {option.icon}
                        <span style={{ marginLeft: '10px' }}>{option.title}</span>
                      </div>
                    </li>
                  )}
                />
              </div>

              <div className='input-group mb-3'>
                <div className="input-group-addon">Bank Account</div>
                <Autocomplete
                  {...defaultProps}
                  id="disable-close-on-select"
                  disableCloseOnSelect
                  value={bankingOptions.find(option => option.title === data.bank) || null}
                  onChange={(event, value) => handleAutocompleteChange(event, value, "bank")}
                  sx={{ width: '55%' }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      placeholder="Enter your bank name"
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountBalanceRoundedIcon />
                          </InputAdornment>
                        ),
                      }}
                      required
                    />
                  )}
                  renderOption={(props, option) => (
                    <li {...props}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        {option.icon}
                        <span style={{ marginLeft: '10px' }}>{option.title}</span>
                      </div>
                    </li>
                  )}
                />
              </div>

              <div className='input-group mb-3'>
                <div className="input-group-addon">Card number</div>
                <TextField
                  id="standard-basic" variant="standard"
                  type='text'
                  inputMode='numeric'
                  pattern="[0-9]*"
                  placeholder="Enter your card number"
                  value={data.number}
                  name='number'
                  onChange={handleOnChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AddCardRoundedIcon />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ width: '55%' }}
                  required
                />
              </div>

              <div className='input-group mb-3'>
                <div className="input-group-addon">Card holder</div>
                <TextField
                  id="standard-basic" variant="standard"
                  type='text'
                  placeholder="Enter card holder's name"
                  value={data.holder}
                  name='holder'
                  onChange={handleOnChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircleIcon/>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ width: '55%' }}
                  required
                />
              </div>

              <div className='input-group mb-3'>
                <div className="input-group-addon">Refunded amount</div>
                <TextField
                  id="standard-basic" variant="standard"
                  type='text'
                  placeholder="Enter refunded amount"
                  value={data.refunded}
                  name='refunded'
                  onChange={handleOnChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <RotateRightIcon/>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ width: '55%' }}
                  required
                />
              </div>

              <div className="row mb-3">
                <a
                  data-tooltip-id="agree-tooltip"
                  data-tooltip-content={!data.agree ? "You must agree to submit the form" : ""}
                  data-tooltip-variant="warning"
                  data-tooltip-place="right"
                  onMouseEnter={() => setIsOpen(!data.agree)}
                  onMouseLeave={() => setIsOpen(false)}
                >
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      name="agree"
                      type="checkbox"
                      id="switch"
                      checked={data.agree}
                      onChange={handleSwitchChange}
                    />
                    <label className="form-check-label" htmlFor="switch">
                    Check this button to be sure you want to CANCEL
                    </label>
                  </div>
                </a>
                <Tooltip
                  id="agree-tooltip"
                  isOpen={isOpen}
                  imperativeModeOnly
                />
              </div>

            </div>
          </div>
          <button className='btn btn-success' type='submit' disabled={!data.agree}>Accept</button>
        </form>
      </div>
    </div>
  );
};

export default RefundPage;
