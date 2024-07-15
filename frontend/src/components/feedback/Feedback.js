import React from "react";
import { Container } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import {
  Button,
  FormControlLabel,
  FormGroup,
  InputAdornment,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import { alpha, styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import SendIcon from "@mui/icons-material/Send";
import StarIcon from "@mui/icons-material/Star";
import { useSelector } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export default function Feedback() {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user?.user);

  const formik = useFormik({
    initialValues: {
      userName: user.name,
      email: user.email,
      rating: "",
      comment: "",
      agree: false,
    },
    onSubmit: (values) => {
      fetch("http://localhost:5000/api/feedbacks/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: values.userName,
          email: values.email,
          rating: Number(values.rating),
          comment: values.comment,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message === 0) {
            toast.error("Unsuccessfully");
          } else {
            toast.success("Successfully");
            setTimeout(() => {
              navigate("/");
            }, 2000);
          }
        })
        .catch((err) => console.log(err));
    },
    validationSchema: Yup.object({
      rating: Yup.number().required("Required."),
      agree: Yup.boolean().oneOf(
        [true],
        "The terms and conditions must be accepted."
      ),
    }),
  });

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
            <div className="heading">Feedback</div>

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

              {/* Input Rating */}
              <div className="row mb-4">
                <a
                  data-tooltip-id="rating-tooltip"
                  data-tooltip-content={formik.errors.rating}
                  data-tooltip-variant="warning"
                  data-tooltip-place="right"
                >
                  <Typography variant="h6" gutterBottom>
                    Rating
                  </Typography>
                  <Rating
                    onChange={formik.handleChange}
                    value={formik.values.rating}
                    name="rating"
                    precision={0.5}
                    size="large"
                    emptyIcon={
                      <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                    }
                  />
                </a>
              </div>
              <Tooltip id="rating-tooltip" isOpen={isOpen} imperativeModeOnly />

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
              <Tooltip id="agree-tooltip" isOpen={isOpen} imperativeModeOnly />

              {/* Send Button */}
              <GreenButton
                type="submit"
                disabled={!(formik.dirty && formik.isValid)}
                variant="contained"
                endIcon={<SendIcon />}
              >
                Send
              </GreenButton>
            </form>
          </Container>
        </ThemeProvider>
      </div>
    </>
  );
}
