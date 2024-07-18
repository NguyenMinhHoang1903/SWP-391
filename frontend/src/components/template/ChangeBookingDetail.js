import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
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
import { Col, Collapse, Row, Table } from "react-bootstrap";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import UpdateIcon from "@mui/icons-material/Update";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";

export default function ChangeBookingDetail() {
  const [listService, setListService] = useState([]);
  const [listCombo, setListCombo] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [serviceOfCombo, setServiceOfCombo] = useState([]);
  const [openServiceTableOfCombo, setOpenServiceTableOfCombo] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [openSuccessOptionModal, setOpenSuccessOptionModal] = useState(false);
  const [isRequired, setIsRequired] = useState(false);
  const [priceIndex, setPriceIndex] = useState(0);
  const [openBackDrop, setOpenBackDrop] = useState(false);
  const [openOption, setOpenOption] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state?.user?.user);

  const formik = useFormik({
    initialValues: {
      oldId: "",
      userName: "",
      email: "",
      petName: "",
      petType: "",
      date: new Date(),
      weight: "",
      services: [],
      combo: "",
      total: 0,
      oldTotal: "",
      payingOfflineTotal: "",
      status: "",
    },
    onSubmit: (values) => {
      if (formik.values.status === "PROCESS") {
        if (values.total > formik.values.oldTotal) {
          formik.setFieldValue(
            "payingOfflineTotal",
            values.total - formik.values.oldTotal
          );
          setOpenOption(true);
          return;
        }
      }

      fetch(`http://localhost:5000/api/forgotpassword`, {
        method: "POST",
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.message === 5) {
            toast.error("No more staff for service");
          } else {
            // Add booking to database
            fetch("http://localhost:5000/api/bookings/changeBookingDetail", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                oldId: formik.values.oldId,
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
                if (data.message === 0) {
                  toast.error("Updated Unsuccessfully");
                } else {
                  toast.success("Updated Successfully");
                  navigate("/myBookingList");
                }
              })
              .catch((err) => console.log(err));
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
      weight: Yup.number().min(1, "Require.").required("Require."),
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

  // Handle close box of option
  const handleOption = () => {
    setOpenOption(!openOption);
  };

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

  // Handle service of combo
  const handleOpenServiceOfCombo = async (passedComboId) => {
    if (passedComboId) {
      readAllServiceOfCombo(passedComboId);
      setOpenServiceTableOfCombo((prev) => (prev = true));
    } else {
      setOpenServiceTableOfCombo((prev) => (prev = false));
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

  // Read old booking
  const readOneOldBooking = async () => {
    let isFetched = true;
    const oldId = location.search.substring(1);

    await fetch(`http://localhost:5000/api/bookings/read/${oldId}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((json) => {
        if (isFetched) {
          formik.setFieldValue("oldId", json._id);
          formik.setFieldValue("petName", json.petName);
          formik.setFieldValue("petType", json.petType);
          formik.setFieldValue("date", new Date(json.date));
          formik.setFieldValue("weight", json.weight);
          formik.setFieldValue("services", json.services);
          formik.setFieldValue("combo", json.combo);
          formik.setFieldValue("total", json.total);
          formik.setFieldValue("oldTotal", json.total);
          formik.setFieldValue("status", json.status);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setOpenBackDrop(true);
    readOneOldBooking();
    readAllService();
    readAllCombo();
    readUser();
    setTimeout(() => {
      setOpenBackDrop(false);
    }, 2000);
  }, []);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

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
                  isOpen={true}
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
                  isOpen={true}
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
                      showTimeSelect
                      timeIntervals={15}
                      dateFormat="yyyy/MM/dd h:mm aa"
                      filterTime={filterPassedTime}
                      minTime={setHours(setMinutes(new Date(), 45), 7)}
                      maxTime={setHours(setMinutes(new Date(), 0), 20)}
                      isClearable
                    />
                  </a>
                </div>
                <Tooltip id="date-tooltip" isOpen={true} imperativeModeOnly />

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
                    />
                  </a>
                </div>
                <Tooltip id="weight-tooltip" isOpen={true} imperativeModeOnly />

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
                          checked={
                            formik.values.services
                              ? formik.values.services.includes(service.name)
                              : false
                          }
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
                You will be moved to the booking detail page after 10 second
              </Typography>
            </Box>
          </Fade>
        </Modal>

        {/* Back Drop */}
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={openBackDrop}
        >
          <CircularProgress color="inherit" />
        </Backdrop>

        {/* Using wallet or paying in offline */}
        <Modal open={openOption} onClose={() => handleOption()}>
          <Box sx={style}>
            <Row style={{ width: "100%" }}>
              <Col>
                <Card sx={{ maxWidth: 345, width: "100%" }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image="assets/imgs/wallet.jpg"
                      alt="green iguana"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Wallet
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Using wallet to pay
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Col>

              <Col>
                <Card sx={{ maxWidth: 345, width: "100%" }}>
                  <CardActionArea
                    onClick={() => setOpenSuccessOptionModal(true)}
                  >
                    <CardMedia
                      component="img"
                      height="140"
                      image="assets/imgs/paying-offline.jpg"
                      alt=""
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Offline
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Paying at the store
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        You need to pay:{" "}
                        {formattedPrice(formik.values.payingOfflineTotal)} VND
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Col>
            </Row>
          </Box>
        </Modal>

        {/* After selected option to pay */}
        <Modal
          open={openSuccessOptionModal}
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={openSuccessOptionModal}>
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
                variant="h4"
                component="h2"
                sx={{ mb: 1, textAlign: "center" }}
              >
                Success
              </Typography>
              <Typography
                variant="h6"
                component="h2"
                sx={{ mb: 1, textAlign: "center" }}
              >
                Your option has been selected
              </Typography>
              <Button
                sx={{
                  marginLeft: "20%",
                  bgcolor: "rgb(0, 201, 170)",
                  ":hover": { bgcolor: "rgb(0, 201, 170)" },
                }}
                variant="contained"
              >
                <Link
                  className="text-decoration-none text-white"
                  style={{}}
                  to="/myBookingList"
                >
                  Return to My Booking List
                </Link>
              </Button>
            </Box>
          </Fade>
        </Modal>
      </div>
    </>
  );
}