import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import { Button, IconButton, Zoom } from "@mui/material";
import AddCardRoundedIcon from "@mui/icons-material/AddCardRounded";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import WorkIcon from "@mui/icons-material/Work";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import PersonIcon from "@mui/icons-material/Person";
import { Tooltip } from "react-tooltip";
import SummaryApi from "../../common/index";

const RefundPage = () => {
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();
  const location = useLocation();
  const passedid = location.search.substring(1);

  const [data, setData] = useState({
    userName: "",
    bookingID: "",
    reason: "",
    bank: "",
    bankNumber: "",
    holder: "",
    amount: "",
    agree: false,
    status: "PENDING",
  });

  useEffect(() => {
    if (user) {
      setData((prev) => ({
        ...prev,
        userName: user.name,
      }));
    }
  }, [user]);

  const [isOpen, setIsOpen] = useState(false);

  const reasonOptions = [
    { title: "Unexpected Emergencies", icon: <ErrorOutlineIcon /> },
    { title: "Illness", icon: <LocalHospitalIcon /> },
    { title: "Conflicting Commitments", icon: <CalendarTodayIcon /> },
    { title: "Weather Conditions", icon: <WbSunnyIcon /> },
    { title: "Work-Related Issues", icon: <WorkIcon /> },
    { title: "Transportation Problems", icon: <DirectionsBusIcon /> },
    { title: "Change of Plans", icon: <SwapHorizIcon /> },
    { title: "Personal Reasons", icon: <PersonIcon /> },
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

  useEffect(() => {
    // Fetch booking details to calculate the refund amount
    const fetchBookingDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/myBooking/readOne/${passedid}`
        );
        const booking = await response.json();

        if (booking) {
          const bookingDate = new Date(booking.data.date);
          const currentTime = new Date();
          const hoursDiff = (bookingDate - currentTime) / (1000 * 60 * 60);

          let refundAmount = 0;
          if (hoursDiff > 2) {
            refundAmount = booking.data.total; // 100% refund
          } else {
            refundAmount = booking.data.total * 0.7; // 70% refund
          }

          setData((prev) => ({
            ...prev,
            amount: refundAmount,
          }));
        }
      } catch (error) {
        console.error("Error fetching booking details:", error);
        toast.error("Failed to fetch booking details");
      }
    };

    fetchBookingDetails();
  }, [passedid]);

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
    console.log("handleOnChange", name, value);
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAutocompleteChange = (event, value, reasonName) => {
    console.log("handleAutocompleteChange", reasonName, value);
    setData((prev) => ({
      ...prev,
      [reasonName]: value ? value.title : "",
    }));
  };

  const handleSwitchChange = (e) => {
    const { name, checked } = e.target;
    console.log("handleSwitchChange", name, checked);
    setData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data on Submit:", data);

    // Regular expressions for validation
    const numberRegex = /^\d+$/;
    const letterRegex = /^[\p{L}\s]+$/u;

    // Perform form validation
    if (
      !data.bank ||
      !data.holder ||
      !data.bankNumber ||
      !data.reason ||
      !data.agree
    ) {
      toast.error("All fields are required");
      return;
    }

    // Validate that bankNumber and amount are numbers
    if (!numberRegex.test(data.bankNumber)) {
      toast.error("Bank number  must be numbers");
      return;
    }

    // Validate that holder contains only letters
    if (!letterRegex.test(data.holder)) {
      toast.error("Holder name must contain only letters");
      return;
    }

    try {
      const createRefund = await fetch(
        `http://localhost:5000/api/refund/createOne/${passedid}`,
        {
          method: SummaryApi.refund.method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const responseData = await createRefund.json();

      if (responseData.success) {
        toast.success("Money will be refunded within 3-5 business days");
        handleBack();
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      toast.error("An error occurred while submitting the form");
      console.error("Fetch Error:", error);
    }
  };

  return (
    <div className="contentRefundPage">
      <div className="container">
        <div className="container-heading">
          <h1>Refund Information</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="refund">
            <div className="refund-details">
              <div className="input-group mb-3">
                <div
                  className="input-group-addon"
                  style={{ textAlign: "left" }}
                >
                  Reason
                </div>
                <Autocomplete
                  {...reasonProps}
                  id="reason-select"
                  disableCloseOnSelect
                  value={
                    reasonOptions.find(
                      (option) => option.title === data.reason
                    ) || null
                  }
                  onChange={(event, value) =>
                    handleAutocompleteChange(event, value, "reason")
                  }
                  sx={{ width: "55%" }}
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
                      <div style={{ display: "flex", alignItems: "center" }}>
                        {option.icon}
                        <span style={{ marginLeft: "10px" }}>
                          {option.title}
                        </span>
                      </div>
                    </li>
                  )}
                />
              </div>

              <div className="input-group mb-3">
                <div
                  className="input-group-addon"
                  style={{ textAlign: "left" }}
                >
                  Bank Account
                </div>
                <Autocomplete
                  {...defaultProps}
                  id="disable-close-on-select"
                  disableCloseOnSelect
                  value={
                    bankingOptions.find(
                      (option) => option.title === data.bank
                    ) || null
                  }
                  onChange={(event, value) =>
                    handleAutocompleteChange(event, value, "bank")
                  }
                  sx={{ width: "55%" }}
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
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <AccountBalanceRoundedIcon />
                        <span style={{ marginLeft: "10px" }}>
                          {option.title}
                        </span>
                      </div>
                    </li>
                  )}
                />
              </div>

              <div className="input-group mb-3">
                <div
                  className="input-group-addon"
                  style={{ textAlign: "left" }}
                >
                  Card number
                </div>
                <TextField
                  id="standard-basic"
                  variant="standard"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="Enter your card number"
                  value={data.bankNumber}
                  name="bankNumber"
                  onChange={handleOnChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AddCardRoundedIcon />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ width: "55%" }}
                  required
                />
              </div>

              <div className="input-group mb-3">
                <div
                  className="input-group-addon"
                  style={{ textAlign: "left" }}
                >
                  Card holder
                </div>
                <TextField
                  id="standard-basic"
                  variant="standard"
                  type="text"
                  placeholder="Enter card holder's name"
                  value={data.holder}
                  name="holder"
                  onChange={handleOnChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircleIcon />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ width: "55%" }}
                  required
                />
              </div>

              <div className="input-group mb-3">
                <div
                  className="input-group-addon"
                  style={{ textAlign: "left" }}
                >
                  Refunded amount
                </div>
                <TextField
                  id="standard-basic"
                  variant="standard"
                  type="text"
                  placeholder="Enter refunded amount"
                  value={data.amount}
                  name="amount"
                  onChange={handleOnChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <RotateRightIcon />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ width: "55%" }}
                  disabled
                />
              </div>

              <div className="row mb-3">
                <a
                  data-tooltip-id="agree-tooltip"
                  data-tooltip-content={
                    !data.agree ? "You must agree to submit the form" : ""
                  }
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
                      Check this button to be sure you want to CANCEL this
                      booking
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

          <div className="button row">
            <div className="col-6 ms-5">
              <Button
                sx={{
                  bgcolor: "rgb(0, 201, 170)",
                  ":hover": { bgcolor: "rgb(0, 201, 170)" },
                }}
                variant="contained"
                type="button"
                onClick={handleBack}
              >
                Back
              </Button>
            </div>

            <div className="col-6">
              <Button
                sx={{
                  bgcolor: "rgb(0, 201, 170)",
                  ":hover": { bgcolor: "rgb(0, 201, 170)" },
                }}
                variant="contained"
                type="submit"
                disabled={!data.agree}
              >
                Accept
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RefundPage;
