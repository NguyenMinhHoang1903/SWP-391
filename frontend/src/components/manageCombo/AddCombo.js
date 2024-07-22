import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Backdrop,
  CircularProgress,
  Button,
  IconButton,
  TextField,
} from "@mui/material";
import TooltipDefault from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { storage } from "../../common/FirebaseConfig";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Utility function to get next day's date
const getNextDayDate = () => {
  const today = new Date();
  const nextDay = new Date(today);
  nextDay.setDate(today.getDate() + 1);
  return nextDay.toISOString().split("T")[0];
};

export default function AddCombo() {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [openBackDrop, setOpenBackDrop] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      startDate: dayjs(new Date()),
      endDate: dayjs(new Date()),
      desc: "",
      serviceId: [],
      image: "",
      imageUrl: "",
      agree: false,
    },
    onSubmit: (values) => {
      const { startDate, endDate } = values;
      const validStartDate = startDate;
      const validEndDate = endDate;

      if (!values.image) {
        toast.error("Please select an image");
        return;
      }

      setOpenBackDrop(true);

      // Store image in firebase storage
      const imgRef = ref(
        storage,
        `${values.name}/${values.name}/${values.image.name}`
      );
      uploadBytes(imgRef, values.image);

      // Get download URL and set to imageUrl

      // Call API
      setTimeout(() => {
        if (values.image) {
          listAll(ref(storage, `${values.name}/${values.name}`)).then(
            (images) => {
              images.items.forEach((imageRef) => {
                getDownloadURL(imageRef).then((url) => {
                  // Create combo in database
                  fetch("http://localhost:5000/api/combos/create", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      name: values.name,
                      price: Number(values.price),
                      startDate: validStartDate,
                      endDate: validEndDate,
                      desc: values.desc,
                      serviceId: values.serviceId,
                      imageName: values.image.name,
                      imageUrl: url,
                    }),
                  })
                    .then((res) => res.json())
                    .then((data) => {
                      setOpenBackDrop(false);
                      if (data.success) {
                        toast.success(data.message);
                        navigate("/manageCombo");
                      } else {
                        toast.error(data.message);
                      }
                    })
                    .catch((err) => console.log(err));
                });
              });
            }
          );
        }
      }, 2000);
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, "Must be 2 characters or more")
        .required("Required."),

      price: Yup.number()
        .typeError("Price must be a number")
        .required("Required")
        .test(
          "is-less-than-total",
          "Price must be less than the total of services",
          function (value) {
            const { serviceId } = this.parent;
            if (!value || !serviceId || serviceId.length === 0) {
              return true; // No services selected or price is not set, so no comparison needed
            }
            const totalServicePrice = services.reduce((total, service) => {
              if (serviceId.includes(service._id)) {
                return total + service.priceByWeight[0].price;
              }
              return total;
            }, 0);
            return value <= totalServicePrice;
          }
        ),

      startDate: Yup.date()
        .min(getNextDayDate(), "Start date must be at least the next day")
        .nullable(),

      endDate: Yup.date()
        .min(Yup.ref("startDate"), "End date cannot be before start date")
        .nullable(),
      desc: Yup.string()
        .min(2, "Must be 2 characters or more")
        .required("Required."),
      serviceId: Yup.array()
        .test({
          message: "Please choose at least one service.",
          test: (arr) => arr.length !== 0,
        })
        .required("Are you forget this one?"),
      agree: Yup.boolean().oneOf([true], "Do you forget this one?"),
    }),
  });

  const handleKeyDown = (e) => {
    // Allow only numeric keys, backspace, and delete
    const allowedKeys = [
      "Backspace",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "Tab",
      "Copy",
      "Paste",
      "x",
      "c",
      "v",
    ];

    if (!/\d/.test(e.key) && !allowedKeys.includes(e.key)) {
      e.preventDefault();
    }
  };

  //Read all service
  const readAllService = async () => {
    let isFetched = true;
    await fetch("http://localhost:5000/api/services/read")
      .then((res) => res.json())
      .then((json) => {
        if (isFetched) {
          setServices(json);
        }
      })
      .catch((err) => console.log(err));

    return () => {
      isFetched = false;
    };
  };

  // Currency functions
  const formattedPrice = (price) => {
    return new Intl.NumberFormat().format(price);
  };

  useEffect(() => {
    let isFetched = true;
    if (isFetched) readAllService();
    return () => {
      isFetched = false;
    };
  }, []);

  // Image Theme Settings
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

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
      <div className="addCombo-component">
        <ThemeProvider theme={theme}>
          <video src="assets/videos/video-7.webm" muted autoPlay loop></video>

          <div className="container">
            <div className="row ">
              <div className="col form">
                {/* Heading */}
                <div className="row mb-3">
                  {/* Back Button */}
                  <div className="col-3">
                    <Link to="/manageCombo">
                      <TooltipDefault title="Back">
                        <IconButton>
                          <ArrowBackIcon className="back-button" />
                        </IconButton>
                      </TooltipDefault>
                    </Link>
                  </div>
                  <div className="col-9">
                    <div className="heading ms-4">Add New Combo</div>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={formik.handleSubmit}>
                  {/* Input Name */}
                  <div className="row mb-3">
                    <a
                      data-tooltip-id="name-tooltip"
                      data-tooltip-content={formik.errors.name}
                      data-tooltip-variant="warning"
                      data-tooltip-place="right"
                    >
                      <TextField
                        label="Name"
                        variant="outlined"
                        onChange={formik.handleChange}
                        type="text"
                        name="name"
                        value={formik.values.name}
                      />
                    </a>
                  </div>
                  <Tooltip id="name-tooltip" isOpen={true} imperativeModeOnly />

                  {/* Input Price */}
                  <div className="row mb-3">
                    <a
                      data-tooltip-id="price-tooltip"
                      data-tooltip-content={formik.errors.price}
                      data-tooltip-variant="warning"
                      data-tooltip-place="right"
                    >
                      <TextField
                        label="Price"
                        variant="outlined"
                        onChange={formik.handleChange}
                        onKeyDown={handleKeyDown}
                        type="text"
                        name="price"
                        value={formik.values.price}
                      />
                    </a>
                  </div>
                  <Tooltip
                    id="price-tooltip"
                    isOpen={true}
                    imperativeModeOnly
                  />

                  {/* Start Date and End Date */}
                  <div className="row mb-3">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DatePicker", "DatePicker"]}>
                        <a
                          data-tooltip-id="startDate-tooltip"
                          data-tooltip-content={formik.errors.startDate}
                          data-tooltip-variant="warning"
                          data-tooltip-place="left"
                        >
                          <DatePicker
                            label="Start Date"
                            onChange={(newValue) =>
                              formik.setFieldValue("startDate", newValue)
                            }
                            value={formik.values.startDate}
                            name="startDate"
                          />
                        </a>
                        <Tooltip
                          id="startDate-tooltip"
                          isOpen={true}
                          imperativeModeOnly
                        />
                        <a
                          data-tooltip-id="endDate-tooltip"
                          data-tooltip-content={formik.errors.endDate}
                          data-tooltip-variant="warning"
                          data-tooltip-place="right"
                        >
                          <DatePicker
                            label="End Date"
                            onChange={(newValue) =>
                              formik.setFieldValue("endDate", newValue)
                            }
                            value={formik.values.startDate}
                            name="endDate"
                          />
                        </a>
                        <Tooltip
                          id="endDate-tooltip"
                          isOpen={true}
                          imperativeModeOnly
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </div>

                  {/* Input Desc */}
                  <div className="row mb-3">
                    <a
                      data-tooltip-id="desc-tooltip"
                      data-tooltip-content={formik.errors.desc}
                      data-tooltip-variant="warning"
                      data-tooltip-place="right"
                    >
                      <TextField
                        label="Description"
                        variant="outlined"
                        onChange={formik.handleChange}
                        type="text"
                        name="desc"
                        value={formik.values.desc}
                        fullWidth
                      />
                    </a>
                  </div>
                  <Tooltip id="desc-tooltip" isOpen={true} imperativeModeOnly />

                  {/* Choose Service */}
                  <div className="row mb-3">
                    <label>Service</label>
                    <a
                      data-tooltip-id="services-tooltip"
                      data-tooltip-content={formik.errors.serviceId}
                      data-tooltip-variant="warning"
                      data-tooltip-place="right"
                    >
                      {services.map((service) => (
                        <div class="form-check" key={service._id}>
                          <input
                            class="form-check-input"
                            type="checkbox"
                            name="serviceId"
                            onChange={formik.handleChange}
                            value={service._id}
                          />
                          <div className="row">
                            <div className="col">
                              <label class="form-check-label">
                                {service.name}
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

                  {/* Input Image */}
                  <div className="row align-items-center mb-3">
                    <div className="col">
                      <Button
                        sx={{
                          bgcolor: "rgb(0, 201, 170)",
                          ":hover": { bgcolor: "rgb(0, 201, 170)" },
                          marginBottom: 2,
                        }}
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                      >
                        Upload file
                        <VisuallyHiddenInput
                          type="file"
                          name="image"
                          accept="image/*"
                          onChange={(e) =>
                            formik.setFieldValue(
                              "image",
                              e.currentTarget.files[0]
                            )
                          }
                        />
                      </Button>
                    </div>
                    <div className="col text-black h5">
                      {formik.values.image.name}
                    </div>
                  </div>

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
                          Check this button to add
                        </label>
                      </div>
                    </a>
                  </div>
                  <Tooltip
                    id="agree-tooltip"
                    isOpen={true}
                    imperativeModeOnly
                  />

                  {/* Submit Button */}
                  <button
                    className="submit-button"
                    type="submit"
                    disabled={!(formik.dirty && formik.isValid)}
                  >
                    ADD
                  </button>
                </form>
              </div>
            </div>
          </div>

          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={openBackDrop}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </ThemeProvider>
      </div>
    </>
  );
}
