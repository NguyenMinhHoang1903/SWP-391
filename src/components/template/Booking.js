import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Badge,
  Box,
  Divider,
  FormControl,
  IconButton,
  MenuItem,
  Modal,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import TooltipMUI from "@mui/material/Tooltip";
import { useSelector } from "react-redux";
import { Collapse, Table } from "react-bootstrap";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import UpdateIcon from "@mui/icons-material/Update";

export default function BookingSpa() {
  const [isOpen, setIsOpen] = useState(true);
  const [listService, setListService] = useState([]);
  const [listCombo, setListCombo] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [serviceOfCombo, setServiceOfCombo] = useState([]);
  const [openServiceTableOfCombo, setOpenServiceTableOfCombo] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user?.user);

  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      petName: "",
      petType: "",
      date: new Date(),
      services: [],
      combo: "",
      total: "",
      agree: false,
    },
    onSubmit: (values) => {
      // Add booking to database
      fetch("http://localhost:5000/api/bookings/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: values.userName,
          email: values.email,
          petName: values.petName,
          petType: values.petType,
          date: values.date,
          services: values.services,
          combo: values.combo,
          total: Number(formik.values.total),
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message === 0) {
            toast.error("Unsuccessfully");
          } else {
            toast.success("Please check your gmail box or spam box!");
            setOpenSuccessModal(true);
            setTimeout(() => {
              navigate("/bookingDetail", {
                state: {
                  userName: formik.values.userName,
                  email: formik.values.email,
                  petName: formik.values.petName,
                  petType: formik.values.petType,
                  date: formik.values.date,
                  services: formik.values.services,
                  combo: formik.values.combo,
                  total: formik.values.total,
                },
              });
            }, 5000);
          }
        })
        .catch((err) => console.log(err));
    },
    validationSchema: Yup.object({
      userName: Yup.string().required("Require."),
      email: Yup.string()
        .email("Please enter a valid email")
        .min(3, "Must be at least 3 characters long")
        .required("Require"),
      petName: Yup.string().required("Require."),
      petType: Yup.string()
        .matches(/^[a-zA-Z\s]*$/, "Require.")
        .required("Require."),
      services: Yup.array()
        .test({
          message: "Please choose at least one service.",
          test: (arr) => arr.length !== 0,
        })
        .required("Require"),
      date: Yup.date().required("Require"),
      agree: Yup.boolean().oneOf([true], "Do you forget this one?"),
    }),
  });

  // Allow only numeric keys, backspace, delete and number
  const handleKeyDownNumber = async (e) => {
    const allowedKeys = [
      "Backspace",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "Tab",
    ];

    if (!/\d/.test(e.key) && !allowedKeys.includes(e.key)) {
      e.preventDefault();
    }
  };

  // Allow only numeric keys, backspace, delete and string
  const handleKeyDownString = async (e) => {
    const allowedKeys = [
      "Backspace",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "Tab",
    ];

    if (!/^[a-zA-Z\s]*$/.test(e.key) && !allowedKeys.includes(e.key)) {
      e.preventDefault();
    }
  };

  // Calculate total of one booking
  const handleTotal = () => {
    let total = 0;
    listService.forEach((service) => {
      formik.values.services.map((selectedService) => {
        if (service.name === selectedService) total += service.price;
      });
    });
    listCombo.map((combo) => {
      if (combo.name === formik.values.combo) total += combo.price;
    });
    formik.setFieldValue("total", total);
  };

  // Read all service
  const readAllService = async () => {
    let isFetched = true;
    await fetch("http://localhost:5000/api/services/read", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((json) => {
        if (isFetched) {
          setListService(json);
        }
      })
      .catch((err) => console.log(err));

    return () => {
      isFetched = false;
    };
  };

  // Read all combo
  const readAllCombo = async () => {
    let isFetched = true;
    await fetch("http://localhost:5000/api/combos/read", {
      method: "Get",
    })
      .then((res) => res.json())
      .then((json) => {
        if (isFetched) {
          setListCombo(json);
        }
      })
      .catch((err) => console.log(err));

    return () => {
      isFetched = false;
    };
  };

  // Read user if it exists
  const readUser = async () => {
    if (user) {
      setDisabled(true);
      formik.setValues({
        userName: user.name,
        email: user.email,
      });
      formik.setErrors({
        userName: "",
        email: "",
      });
    } else setDisabled(false);
  };

  // Read list service of one combo
  const readAllServiceOfCombo = async (passedComboId) => {
    let isFetched = true;

    await fetch(`http://localhost:5000/api/combos/read/${passedComboId}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((json) => {
        if (isFetched) {
          setServiceOfCombo(json);
        }
      })
      .catch((err) => console.log(err));

    return () => {
      isFetched = false;
    };
  };

  // Handle service of combo
  const handleOpenServiceOfCombo = async (passedComboId) => {
    if (passedComboId) {
      readAllServiceOfCombo(passedComboId);
      setOpenServiceTableOfCombo((prev) => (prev = true));
      console.log("true");
    } else {
      setOpenServiceTableOfCombo((prev) => (prev = false));
      console.log("false");
    }
  };

  useEffect(() => {
    readAllService();
    readAllCombo();
    readUser();
  }, []);

  return (
    <>
      <div className="booking-component">
        <div className="container">
          <div className="row ">
            <div className="col ms-5 me-5 mt-4 mb-3">
              {/* Heading */}
              <div className="row">
                {/* Back Button */}
                <div className="col-3">
                  <Link to="/">
                    <TooltipMUI title="Back">
                      <IconButton>
                        <ArrowBackIcon className="back-button" />
                      </IconButton>
                    </TooltipMUI>
                  </Link>
                </div>
                <div className="col-9">
                  <div className="heading">BOOKING</div>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={formik.handleSubmit}>
                {/* Enter User Name */}
                <div className="row mb-3">
                  <label>User Name</label>
                  <a
                    data-tooltip-id="userName-tooltip"
                    data-tooltip-content={formik.errors.userName}
                    data-tooltip-variant="warning"
                    data-tooltip-place="right"
                  >
                    <input
                      onChange={formik.handleChange}
                      name="userName"
                      value={formik.values.userName}
                      disabled={disabled}
                      type="text"
                      placeholder="..."
                    />
                  </a>
                </div>
                <Tooltip
                  id="userName-tooltip"
                  isOpen={isOpen}
                  imperativeModeOnly
                />

                {/* Enter Email */}
                <div className="row mb-3">
                  <label>Email</label>
                  <a
                    data-tooltip-id="email-tooltip"
                    data-tooltip-content={formik.errors.email}
                    data-tooltip-variant="warning"
                    data-tooltip-place="right"
                  >
                    <input
                      onChange={formik.handleChange}
                      name="email"
                      value={formik.values.email}
                      disabled={disabled}
                      type="text"
                      placeholder="example123@gmail.com"
                    />
                  </a>
                </div>
                <Tooltip
                  id="email-tooltip"
                  isOpen={isOpen}
                  imperativeModeOnly
                />

                {/* Enter Pet Name */}
                <div className="row mb-3">
                  <label>Pet Name</label>
                  <a
                    data-tooltip-id="petName-tooltip"
                    data-tooltip-content={formik.errors.petName}
                    data-tooltip-variant="warning"
                    data-tooltip-place="right"
                  >
                    <input
                      onChange={formik.handleChange}
                      type="text"
                      name="petName"
                      value={formik.values.petName}
                      placeholder="..."
                    />
                  </a>
                </div>
                <Tooltip
                  id="petName-tooltip"
                  isOpen={isOpen}
                  imperativeModeOnly
                />

                {/* Choose Pet Type */}
                <div className="row mb-3">
                  <label>Pet Type</label>
                  <a
                    data-tooltip-id="petType-tooltip"
                    data-tooltip-content={formik.errors.petType}
                    data-tooltip-variant="warning"
                    data-tooltip-place="right"
                  >
                    <select
                      class="form-select"
                      name="petType"
                      value={formik.values.petType}
                      onChange={formik.handleChange}
                    >
                      <option selected value={1}>
                        Please choose a pet type
                      </option>
                      <option value="Cat">Cat</option>
                      <option value="Dog">Dog</option>
                    </select>
                  </a>
                </div>
                <Tooltip
                  id="petType-tooltip"
                  isOpen={isOpen}
                  imperativeModeOnly
                />

                {/* Enter Date */}
                <div className="row mb-3">
                  <label>Date</label>
                  <a
                    data-tooltip-id="date-tooltip"
                    data-tooltip-content={formik.errors.date}
                    data-tooltip-variant="warning"
                    data-tooltip-place="right"
                  >
                    <DatePicker
                      className="date-input"
                      selected={formik.values.date}
                      minDate={new Date()}
                      onChange={(result) => {
                        formik.setFieldValue("date", result);
                      }}
                      name="date"
                      showTimeInput
                      dateFormat="yyyy/MM/dd h:mm aa"
                      isClearable
                    />
                  </a>
                </div>
                <Tooltip id="date-tooltip" isOpen={isOpen} imperativeModeOnly />

                {/* Choose Service */}
                <div className="row mb-3">
                  <label>Service</label>
                  <a
                    data-tooltip-id="services-tooltip"
                    data-tooltip-content={formik.errors.services}
                    data-tooltip-variant="warning"
                    data-tooltip-place="right"
                  >
                    {listService.map((service) => (
                      <div class="form-check" key={service._id}>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="services"
                          onChange={formik.handleChange}
                          value={service.name}
                        />
                        <div className="row">
                          <div className="col">
                            <label class="form-check-label">
                              {service.name}
                            </label>
                          </div>
                          <div className="col">
                            <label class="form-check-label">
                              $ {service.price}
                            </label>
                          </div>
                        </div>
                      </div>
                    ))}
                  </a>
                </div>
                <Tooltip
                  id="services-tooltip"
                  isOpen={isOpen}
                  imperativeModeOnly
                />

                {/* Select Combo */}
                <div className="row mb-3">
                  <label>Combo</label>
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl
                      fullWidth
                      sx={{ color: "black", bgcolor: "white" }}
                    >
                      <Select
                        labelId="combo"
                        id="combo"
                        name="combo"
                        value={formik.values.combo}
                        label="combo"
                        placeholder="Please select a combo"
                        onChange={formik.handleChange}
                      >
                        <MenuItem
                          sx={{
                            paddingY: 1,
                            paddingX: 4,
                          }}
                          value="None"
                          onClick={() => handleOpenServiceOfCombo("")}
                        >
                          <em>None</em>
                        </MenuItem>
                        {listCombo.map((combo) => (
                          <MenuItem
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              paddingY: 1,
                              paddingX: 4,
                            }}
                            value={combo.name}
                            onClick={() => handleOpenServiceOfCombo(combo._id)}
                          >
                            {combo.name}{" "}
                            <Badge
                              badgeContent={combo.price}
                              color="success"
                              max={99999999999}
                            >
                              <AttachMoneyIcon />
                            </Badge>{" "}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                </div>

                {/* Open List Service of Combo */}
                <div className="row mb-3">
                  <Collapse in={openServiceTableOfCombo}>
                    <div id="example-collapse-text">
                      <Table striped bordered>
                        <thead>
                          <tr>
                            <th>Service Name</th>
                            <th>Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          {serviceOfCombo.map((service) => (
                            <tr>
                              <td>{service.name}</td>
                              <td>$ {service.price}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  </Collapse>
                </div>

                <Divider sx={{ border: 2, borderColor: "white" }} />

                {/* Total */}
                <Box
                  sx={{
                    p: 2,
                    bgcolor: "white",
                    marginBottom: 4,
                    mt: 3,
                    borderRadius: 5,
                  }}
                >
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography variant="h5" component="div">
                      <TooltipMUI title="Click me to update Total">
                        <IconButton onClick={() => handleTotal()}>
                          <UpdateIcon />
                        </IconButton>
                      </TooltipMUI>
                      Total
                    </Typography>
                    <Typography
                      sx={{ color: "red" }}
                      variant="h6"
                      component="div"
                    >
                      $ {formik.values.total}
                    </Typography>
                  </Stack>
                </Box>

                {/* Switch */}
                <div className="row mb-3">
                  <a
                    data-tooltip-id="agree-tooltip"
                    data-tooltip-content={formik.errors.agree}
                    data-tooltip-variant="warning"
                    data-tooltip-place="right"
                  >
                    <div class="form-check form-switch">
                      <input
                        class="form-check-input"
                        name="agree"
                        type="checkbox"
                        id="switch"
                        value={formik.values.agree}
                        onChange={formik.handleChange}
                      />
                      <label class="form-check-label" for="switch">
                        Check this button to book
                      </label>
                    </div>
                  </a>
                </div>
                <Tooltip
                  id="agree-tooltip"
                  isOpen={isOpen}
                  imperativeModeOnly
                />

                {/* Submit Button */}
                <button
                  className="submit-button"
                  type="submit"
                  disabled={!(formik.dirty && formik.isValid)}
                >
                  BOOK
                </button>
              </form>
            </div>

            {/* Video */}
            <div className="col">
              <video
                src="assets/videos/video-1.webm"
                autoPlay
                muted
                loop
              ></video>
            </div>
          </div>
        </div>

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={openSuccessModal}
          onClose={() => setOpenSuccessModal(false)}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={openSuccessModal}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "background.paper",
                border: "2px solid #000",
                boxShadow: 24,
                p: 4,
              }}
            >
              <CheckCircleOutlineIcon
                sx={{ fontSize: 80, marginX: 15 }}
                color="success"
              />
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
                sx={{ mb: 1, textAlign: "center" }}
              >
                Success
              </Typography>
              <Typography
                id="transition-modal-description"
                sx={{ textAlign: "center", mb: 1 }}
              >
                Your booking has been successfully
              </Typography>

              <Typography
                id="transition-modal-description"
                sx={{ textAlign: "center", mb: 1 }}
              >
                You will be moved to the booking detail page after 5 second
              </Typography>
            </Box>
          </Fade>
        </Modal>
      </div>
    </>
  );
}
