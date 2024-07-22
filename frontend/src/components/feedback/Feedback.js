import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import {
  Box,
  Button,
  Fade,
  FormControlLabel,
  FormGroup,
  InputAdornment,
  List,
  ListItem,
  Modal,
  Rating,
  TextField,
  Typography,
  Backdrop,
} from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import { alpha, styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import SendIcon from "@mui/icons-material/Send";
import StarIcon from "@mui/icons-material/Star";
import { useSelector } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useLocation } from "react-router-dom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

export default function Feedback() {
  const [serviceName, setServiceName] = useState([]);
  const [comboName, setComboName] = useState();
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user?.user);
  let { state } = useLocation();
  const [isRequired2, setIsRequired2] = useState(false);
  const [isRequired1, setIsRequired1] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [closesSendButton, setClosesSendButton] = useState(false);

  const formik = useFormik({
    initialValues: {
      userName: user.name,
      email: user.email,
      servicesRating: [],
      comboRating: "",
      comment: "",
      agree: false,
      serviceError: [],
    },
    onSubmit: (values) => {
      // Close send button after click
      setClosesSendButton(true);
      fetch("http://localhost:5000/api/feedbacks/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: values.userName,
          email: values.email,
          servicesRating: values.servicesRating,
          comboRating: values.comboRating,
          comment: values.comment,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setOpenSuccess(data.success);
          } else {
            toast.error(data.message);
            // Open send button if err
            setClosesSendButton(false);
          }
        })
        .catch((err) => console.log(err));
    },
    validationSchema: Yup.object({
      agree: Yup.boolean().oneOf([true], "Check this button to send"),
    }),
  });

  // Handle services rating
  const handleServiceRating = (e, newValue, index) => {
    for (let i = 0; i < serviceName.length; i++) {
      if (i === index) {
        if (newValue) {
          // Store the new value
          const serviceRating = formik.values.servicesRating;
          serviceRating[i].rating = newValue;
          formik.setFieldValue("servicesRating", serviceRating);
          // Close tooltip
          const newServiceError = formik.values.serviceError;
          newServiceError[index] = false;
          formik.setFieldValue(newServiceError);
        } else {
          // Store default
          const serviceRating = formik.values.servicesRating;
          serviceRating[i].rating = 0;
          formik.setFieldValue("servicesRating", serviceRating);
          // Open tooltip
          const newServiceError = formik.values.serviceError;
          newServiceError[index] = true;
          formik.setFieldValue(newServiceError);
        }
      }
    }
    const isOpen = formik.values.serviceError.every((isError) => {
      return isError === false;
    });
    setIsRequired1(!isOpen);
  };

  // Handle combo rating
  const handleComboRating = (e, newValue) => {
    if (newValue) {
      const comboRating = {
        name: comboName,
        rating: Number(newValue),
      };
      formik.setFieldValue("comboRating", comboRating);
      setIsRequired2(false);
    } else {
      setIsRequired2(true);
    }
  };

  useEffect(() => {
    const { services, combo } = state;
    const arrService = [];

    // Initial service name and rating
    services.map((name, index) => {
      const serviceRating = {
        name,
        rating: 0,
      };
      arrService.push(serviceRating);
    });
    const newServiceRating = [...new Set(arrService)];
    formik.setFieldValue("servicesRating", newServiceRating);

    // Initial service error
    services.map((name, index) => {
      formik.values.serviceError[index] = false;
    });
    setServiceName(services);
    setComboName(combo);
  }, []);

  /* Customization */
  /* Green Switch */
  const GreenSwitch = styled(Switch)(({ theme }) => ({
    "& .MuiSwitch-switchBase.Mui-checked": {
      color: "#00C9AA",
      "&:hover": {
        backgroundColor: alpha("#00C9AA", theme.palette.action.hoverOpacity),
      },
    },
    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
      backgroundColor: "#00C9AA",
    },
  }));
  const label = { inputProps: { "aria-label": "Color switch demo" } };

  /* Green Button */
  const GreenButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText("#00C9AA"),
    backgroundColor: "#00C9AA",
    "&:hover": {
      backgroundColor: "#00C9AA",
    },
  }));

  // Theme settings
  const theme = createTheme({
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": {
                borderColor: "rgb(0, 201, 170)",
              },
              "&.Mui-focused fieldset": {
                borderColor: "rgb(0, 201, 170)",
              },
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "rgb(0, 201, 170)",
            },
          },
        },
      },
    },
  });

  return (
    <>
      <div className="feedback-component">
        <ThemeProvider theme={theme}>
          {/* Video */}
          <video src="assets/videos/video-5.webm" autoPlay muted loop></video>
          <Container id="container">
            {/* Heading */}
            <div className="heading">Feedback </div>

            {/* Form */}
            <form onSubmit={formik.handleSubmit}>
              <div className="row mb-3">
                <div className="col">
                  {/* Input User Name */}
                  <TextField
                    label="User Name"
                    variant="outlined"
                    value={formik.values.userName}
                    disabled
                  />
                </div>
                <div className="col">
                  {/* Input User Name */}
                  <TextField
                    label="Email"
                    variant="outlined"
                    value={formik.values.email}
                    disabled
                  />
                </div>
              </div>

              <Typography variant="h5" gutterBottom>
                Rating
              </Typography>

              {/* Input Service Rating */}
              {serviceName ? (
                <List className="ms-1">
                  {serviceName.map((name, index) => (
                    <div key={name}>
                      <a
                        data-tooltip-id={name}
                        data-tooltip-content="Required"
                        data-tooltip-variant="warning"
                        data-tooltip-place="right"
                      >
                        <ListItem disablePadding>
                          <Row className="justify-content-md-between">
                            <Col md="auto">{name}</Col>
                            <Col xs lg="2">
                              <Rating
                                onChange={(e, newValue) =>
                                  handleServiceRating(e, newValue, index)
                                }
                                precision={1}
                                size="large"
                                emptyIcon={
                                  <StarIcon
                                    style={{ opacity: 0.55 }}
                                    fontSize="inherit"
                                  />
                                }
                              />
                            </Col>
                          </Row>
                        </ListItem>
                      </a>
                      <Tooltip
                        id={name}
                        isOpen={formik.values.serviceError[index]}
                        imperativeModeOnly
                      />
                    </div>
                  ))}
                </List>
              ) : (
                ""
              )}

              {/* Input Combo Rating */}
              <a
                data-tooltip-id="comboRating-tooltip"
                data-tooltip-content="Required"
                data-tooltip-variant="warning"
                data-tooltip-place="right"
              >
                {comboName ? (
                  <List className="ms-1">
                    <ListItem disablePadding>
                      <Row className="justify-content-md-between">
                        <Col md="auto">{comboName}</Col>
                        <Col xs lg="2">
                          <Rating
                            name="comboRating"
                            onChange={handleComboRating}
                            value={formik.values.comboRating.rating}
                            precision={1}
                            size="large"
                            emptyIcon={
                              <StarIcon
                                style={{ opacity: 0.55 }}
                                fontSize="inherit"
                              />
                            }
                          />
                        </Col>
                      </Row>
                    </ListItem>
                  </List>
                ) : (
                  ""
                )}
              </a>
              <Tooltip
                id="comboRating-tooltip"
                isOpen={isRequired2}
                imperativeModeOnly
              />

              {/* Input Comment */}
              <div className="row mb-4">
                <TextField
                  onChange={formik.handleChange}
                  type="text"
                  name="comment"
                  value={formik.values.comment}
                  label="Comment"
                  helperText="Please enter your comment"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CommentIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>

              {/* Switch */}
              <div className="row mb-3">
                <a
                  data-tooltip-id="agree-tooltip"
                  data-tooltip-content={formik.errors.agree}
                  data-tooltip-variant="warning"
                  data-tooltip-place="right"
                >
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <GreenSwitch
                          {...label}
                          name="agree"
                          checked={formik.values.agree}
                          onChange={formik.handleChange}
                          inputProps={{ "aria-label": "controlled" }}
                        />
                      }
                      label="Check this button to send"
                    />
                  </FormGroup>
                </a>
              </div>
              <Tooltip id="agree-tooltip" isOpen={true} imperativeModeOnly />

              {/* Send Button */}
              <GreenButton
                type="submit"
                disabled={
                  !(formik.dirty && formik.isValid) ||
                  isRequired1 ||
                  isRequired2 ||
                  closesSendButton
                }
                variant="contained"
                endIcon={<SendIcon />}
              >
                Send
              </GreenButton>
            </form>
          </Container>

          <Modal
            open={openSuccess}
            slots={{ backdrop: Backdrop }}
            slotProps={{
              backdrop: {
                timeout: 500,
              },
            }}
          >
            <Fade in={openSuccess}>
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
                  Your feedback made our day!
                </Typography>

                <Button
                  sx={{
                    marginLeft: "28%",
                    bgcolor: "rgb(0, 201, 170)",
                    ":hover": { bgcolor: "rgb(0, 201, 170)" },
                  }}
                  variant="contained"
                >
                  <Link className="text-decoration-none text-white" to="/">
                    Return to Home
                  </Link>
                </Button>
              </Box>
            </Fade>
          </Modal>
        </ThemeProvider>
      </div>
    </>
  );
}
