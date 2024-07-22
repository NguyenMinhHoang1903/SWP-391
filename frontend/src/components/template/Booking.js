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
  Button,
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
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import UpdateIcon from "@mui/icons-material/Update";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";

export default function BookingSpa() {
  const [listService, setListService] = useState([]);
  const [listCombo, setListCombo] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [serviceOfCombo, setServiceOfCombo] = useState([]);
  const [openServiceTableOfCombo, setOpenServiceTableOfCombo] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [isRequired, setIsRequired] = useState(false);
  const [priceIndex, setPriceIndex] = useState(0);
  const [petNameList, setPetNameList] = useState([]);
  const [petTypeList, setPetTypeList] = useState([]);
  const [weightList, setWeightList] = useState([]);
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user?.user);
  const [excludedTimes, setExcludedTimes] = useState([]);
  const [myPetList, setAllPet] = useState([]);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    if (user?.name) {
      fetchAllPets(user.name); // Fetch pets based on the current user's name
    }
  }, [user]);

  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      petName: "",
      petType: "",
      date: new Date(),
      weight: "",
      services: [],
      combo: "",
      total: 0,
    },
    onSubmit: (values) => {
      setIsClicked(true);
      const handleSubmit = async () => {
        try {
          // Check pet already on the same date or not
          const resCheckPet = await axios.post(
            "http://localhost:5000/api/bookings/checkPet",
            {
              email: values.email,
              petName: values.petName,
              date: values.date,
            }
          );
          if (!resCheckPet.data.success) {
            toast.error(resCheckPet.data.message);
            return;
          }

          // Check the staffs is enough or not
          const resCheckStaff = await axios.post(
            "http://localhost:5000/api/bookingTracker/track",
            {
              date: values.date,
            }
          );
          if (!resCheckStaff.data.success) {
            toast.error(resCheckStaff.data.message);
            return;
          }

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
              weight: Number(values.weight),
              services: values.services,
              combo: values.combo,
              total: Number(formik.values.total),
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.success) {
                toast.success(data.message);
                setOpenSuccessModal(true);
                setTimeout(() => {
                  navigate("/bookingDetail", {
                    state: { 
                      id: data.id,
                      userName: values.userName,
                      email: values.email,
                      petName: values.petName,
                      petType: values.petType,
                      date: values.date,
                      weight: Number(values.weight),
                      services: values.services,
                      combo: values.combo,
                      total: Number(formik.values.total),
                    },
                  });
                }, 5000);
              } else {
                setIsClicked(false);
                toast.error(data.message);
              }
            });
        } catch (err) {
          console.log(err.message);
        }
      };

      handleSubmit();
    },
    validationSchema: Yup.object({
      userName: Yup.string().required("Require."),
      email: Yup.string()
        .email("Please enter a valid email")
        .min(3, "Must be at least 3 characters long")
        .required("Require"),
      petName: Yup.string().required("Require."),
      services: isRequired
        ? Yup.array().notRequired()
        : Yup.array().min(
            1,
            "Either service or combo is required to be selected"
          ),
      combo: isRequired
        ? Yup.string().required(
            "Either service or combo is required to be selected"
          )
        : Yup.string().notRequired(),

      date: Yup.date().required("Require"),
    }),
  });

  // Handle service or combo
  const handleCombo = async (e) => {
    if (e.target.value) {
      setIsRequired((prev) => (prev = true));
      formik.setFieldValue("combo", e.target.value);
    } else {
      setIsRequired((prev) => (prev = false));
      formik.setFieldValue("combo", "");
    }
  };

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

    if (formik.values.services) {
      if (formik.values.weight) {
        formik.values.services.map((selectedService) => {
          listService.map((service, index) => {
            if (selectedService === listService[index].name) {
              if (listService[index].priceByWeight.length === 1) {
                total += Number(listService[index].priceByWeight[0].price);
              } else {
                if (
                  formik.values.weight <=
                  listService[index].priceByWeight[0].weight
                ) {
                  total += Number(listService[index].priceByWeight[0].price);
                } else if (
                  formik.values.weight >
                    listService[index].priceByWeight[0].weight &&
                  formik.values.weight <=
                    listService[index].priceByWeight[1].weight
                ) {
                  total += Number(listService[index].priceByWeight[1].price);
                } else {
                  total += Number(listService[index].priceByWeight[2].price);
                }
              }
            }
          });
        });
      } else toast.error("Please enter a weight before selecting services");
    }
    if (formik.values.combo) {
      listCombo.map((combo) => {
        if (combo.name === formik.values.combo) total += Number(combo.price);
      });
    }

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

  // Read all pet of users
  const fetchAllPets = async (userName) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/pet/user/${userName}`,
        {
          method: "GET",
        }
      );

      const dataResponse = await response.json();
      if (dataResponse.success) {
        const pets = dataResponse.data;
        setAllPet(pets); // Set the list of pets from the response

        const petNames = pets.map((pet) => pet.petName);
        const petTypes = pets.map((pet) => pet.petType);
        const weights = pets.map((pet) => pet.weight);

        setPetNameList(petNames);
        setPetTypeList(petTypes);
        setWeightList(weights);
      } else {
        toast.error(dataResponse.message);
      }
    } catch (error) {
      toast.error("Failed to fetch pets");
    }
  };

  const handlePetNameChange = (event) => {
    const selectedPetName = event.target.value;
    formik.setFieldValue("petName", selectedPetName);

    const selectedPet = myPetList.find(
      (pet) => pet.petName === selectedPetName
    );
    if (selectedPet) {
      formik.setFieldValue("petType", selectedPet.petType);
      formik.setFieldValue("weight", selectedPet.weight);
    } else {
      formik.setFieldValue("petType", "");
      formik.setFieldValue("weight", "");
    }
  };

  // Handle service of combo
  const handleOpenServiceOfCombo = async (passedComboId) => {
    if (passedComboId) {
      readAllServiceOfCombo(passedComboId);
      setOpenServiceTableOfCombo((prev) => true);
    } else {
      setOpenServiceTableOfCombo((prev) => false);
    }
  };

  // Handle weight when change the weight
  const handleWeight = async (value) => {
    const weight = Number(value);
    formik.setFieldValue("weight", weight);

    listService.map((service) => {
      if (weight <= Number(service.priceByWeight[0].weight)) {
        setPriceIndex(0);
      }
      if (service.priceByWeight[1]) {
        if (
          weight <= Number(service.priceByWeight[1].weight) &&
          weight > Number(service.priceByWeight[0].weight)
        ) {
          setPriceIndex(1);
        }
      }
      if (service.priceByWeight[2]) {
        if (weight > Number(service.priceByWeight[2].weight)) {
          setPriceIndex(2);
        }
      }
    });
  };

  // Currency functions
  const formattedPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price);
  };

  // Disable passed time
  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  // Handle time of booking
  const handleFullDate = async (result) => {
    let selectedDate = "";
    let flag = false;
    const list = [];

    if (result) {
      selectedDate = new Date(result);
      formik.setFieldValue("date", selectedDate);
    } else {
      selectedDate = new Date();
    }

    try {
      const dateList = await axios.get(
        "http://localhost:5000/api/bookingTracker/readAll"
      );
      const availableTimes = dateList.data.list;
      if (availableTimes) {
        availableTimes.map((value) => {
          if (value.year === selectedDate.getFullYear()) {
            if (value.month === selectedDate.getMonth() + 1) {
              if (value.date === selectedDate.getDate()) {
                value.tracker.map((value) => {
                  if (value.staffs === 0) {
                    list.push(value.time);
                  }
                });
                flag = true;
              }
            }
          }
        });

        if (flag) {
          const filterSelectedTime = list
            .flatMap((hour) => [new Date().setHours(hour, 0, 0, 0)])
            .map((time) => new Date(time));
          setExcludedTimes(filterSelectedTime);
        } else {
          setExcludedTimes([]);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleFullDate();
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
                  isOpen={true}
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
                <Tooltip id="email-tooltip" isOpen={true} imperativeModeOnly />

                {/* Choose Pet Name */}
                <div className="row mb-3">
                  <label>Pet Name</label>
                  <a
                    data-tooltip-id="petName-tooltip"
                    data-tooltip-content={formik.errors.petName}
                    data-tooltip-variant="warning"
                    data-tooltip-place="right"
                  >
                    <select
                      className="form-select"
                      name="petName"
                      value={formik.values.petName}
                      onChange={(event) => {
                        formik.handleChange(event);
                        handlePetNameChange(event);
                      }}
                    >
                      <option value="">Please choose a pet name</option>
                      {petNameList.map((petName) => (
                        <option key={petName} value={petName}>
                          {petName}
                        </option>
                      ))}
                    </select>
                  </a>
                </div>
                <Tooltip
                  id="petName-tooltip"
                  isOpen={!!formik.errors.petName}
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
                      disabled={disabled}
                    >
                      <option selected value={1}>
                        Please choose a pet type
                      </option>
                      {petTypeList.map((petType) => (
                        <option value={petType}>{petType}</option>
                      ))}
                    </select>
                  </a>
                </div>
                <Tooltip
                  id="petType-tooltip"
                  isOpen={true}
                  imperativeModeOnly
                />

                {/* Enter Weight */}
                <div className="row mb-3">
                  <label>Weight (kg)</label>
                  <a
                    data-tooltip-id="weight-tooltip"
                    data-tooltip-content={formik.errors.weight}
                    data-tooltip-variant="warning"
                    data-tooltip-place="right"
                  >
                    <input
                      onKeyDown={handleKeyDownNumber}
                      onChange={(e) => handleWeight(e.target.value)}
                      type="text"
                      name="weight"
                      value={formik.values.weight}
                      placeholder="..."
                      disabled={disabled}
                    />
                  </a>
                </div>
                <Tooltip id="weight-tooltip" isOpen={true} imperativeModeOnly />

                {/* Add new pet button */}
                <div className="mb-3">
                  <TooltipMUI title="Add new pet">
                    <Link
                      className="text-decoration-none text-white"
                      to="/addMyPet"
                    >
                      <Button
                        sx={{
                          bgcolor: "rgb(0, 201, 170)",
                          ":hover": { bgcolor: "rgb(0, 201, 170)" },
                        }}
                        variant="contained"
                      >
                        <AddIcon />
                      </Button>
                    </Link>
                  </TooltipMUI>
                </div>

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
                        handleFullDate(result);
                      }}
                      name="date"
                      showTimeSelect
                      timeIntervals={60}
                      dateFormat="yyyy/MM/dd h:mm aa"
                      filterTime={filterPassedTime}
                      minTime={setHours(setMinutes(new Date(), 45), 7)}
                      maxTime={setHours(setMinutes(new Date(), 0), 20)}
                      excludeTimes={excludedTimes}
                    />
                  </a>
                </div>
                <Tooltip id="date-tooltip" isOpen={true} imperativeModeOnly />

                {/* Select Service */}
                <div className="row mb-3">
                  <label>Service (VND)</label>
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
                              {service.priceByWeight.length === 1
                                ? formattedPrice(service.priceByWeight[0].price)
                                : formattedPrice(
                                    service.priceByWeight[priceIndex].price
                                  )}{" "}
                            </label>
                          </div>
                        </div>
                      </div>
                    ))}
                  </a>
                </div>
                <Tooltip
                  id="services-tooltip"
                  isOpen={true}
                  imperativeModeOnly
                />

                {/* Select Combo */}
                <div className="row mb-3">
                  <label>Combo</label>
                  <a
                    data-tooltip-id="combo-tooltip"
                    data-tooltip-content={formik.errors.combo}
                    data-tooltip-variant="warning"
                    data-tooltip-place="right"
                  >
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
                          onChange={(e) => handleCombo(e)}
                        >
                          <MenuItem
                            sx={{
                              paddingY: 1,
                              paddingX: 4,
                            }}
                            value={0}
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
                              key={combo}
                              value={combo.name}
                              onClick={() =>
                                handleOpenServiceOfCombo(combo._id)
                              }
                            >
                              {combo.name}{" "}
                              <Badge
                                badgeContent={formattedPrice(combo.price)}
                                color="success"
                                max={99999999999}
                              >
                                VND
                              </Badge>{" "}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                  </a>
                  <Tooltip
                    id="combo-tooltip"
                    isOpen={true}
                    imperativeModeOnly
                  />
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
                              <td>
                                {service.priceByWeight.length === 1
                                  ? formattedPrice(
                                      service.priceByWeight[0].price
                                    )
                                  : formattedPrice(
                                      service.priceByWeight[priceIndex].price
                                    )}{" "}
                                VND
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  </Collapse>
                </div>

                <Divider sx={{ border: 3, borderColor: "white" }} />

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
                    <h4>
                      <TooltipMUI title="Click me to update Total">
                        <IconButton onClick={() => handleTotal()}>
                          <UpdateIcon />
                        </IconButton>
                      </TooltipMUI>
                      Total
                    </h4>
                    <Typography
                      sx={{ color: "red" }}
                      variant="h6"
                      component="div"
                    >
                      {formattedPrice(formik.values.total)} VND
                    </Typography>
                  </Stack>
                </Box>

                {/* Book Button */}
                <button
                  className="submit-button"
                  type="submit"
                  disabled={!(formik.dirty && formik.isValid) || isClicked}
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