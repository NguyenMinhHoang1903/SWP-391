import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Backdrop,
  Button,
  CircularProgress,
  IconButton,
  TextField,
} from "@mui/material";
import TooltipDefault from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { storage } from "../../common/FirebaseConfig";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export default function AddService() {
  const navigate = useNavigate();
  const [openBackDrop, setOpenBackDrop] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      priceByWeight: [{ price: "", weight: "" }],
      desc: "",
      image: "",
      imageUrl: "",
      agree: false,
    },
    onSubmit: (values) => {
      let flag = 0;
      setOpenBackDrop(true);

      // Store image in firebase storage
      const imgRef = ref(
        storage,
        `${values.name}/${values.name}/${values.image.name}`
      );
      uploadBytes(imgRef, values.image);

      // Check if price or weight is empty
      values.priceByWeight.map((value) => {
        if (value.price === "" || value.weight === "") {
          toast.error("Either price or weight is required");
          flag = 1;
        }
      });

      // Call API
      setTimeout(() => {
        if (flag === 0) {
          if (values.image) {
            // Get download URL and set to imageUrl
            listAll(ref(storage, `${values.name}/${values.name}`)).then(
              (images) => {
                images.items.forEach((imageRef) => {
                  getDownloadURL(imageRef).then((url) => {
                    // Create service in API
                    fetch("http://localhost:5000/api/services/create", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        name: values.name,
                        priceByWeight: values.priceByWeight,
                        desc: values.desc,
                        imageName: values.image.name,
                        imageUrl: url,
                      }),
                    })
                      .then((res) => res.json())
                      .then((data) => {
                        setOpenBackDrop(false);
                        if (data.message === 0) {
                          toast.error("The name is already exists.");
                        } else {
                          toast.success("Successful Added");
                          navigate("/manageService");
                        }
                      })
                      .catch((err) => console.log(err));
                  });
                });
              }
            );
          }
        }
      }, 2000);

      flag = 0;
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Required.")
        .min(2, "Must be 2 characters or more"),
      priceByWeight: Yup.array()
        .min(1, "Please enter at least one price")
        .required(),
      desc: Yup.string()
        .required("Required.")
        .min(3, "Must be 3 characters or more"),
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
    ];

    if (!/\d/.test(e.key) && !allowedKeys.includes(e.key)) {
      e.preventDefault();
    }
  };

  // Handle price
  const handlePrice = async (price, index) => {
    formik.values.priceByWeight[index].price = price;
    formik.setFieldValue("priceByWeight", formik.values.priceByWeight);
  };

  // Handle weight
  const handleWeight = async (weight, index) => {
    formik.values.priceByWeight[index].weight = weight;
    formik.setFieldValue("priceByWeight", formik.values.priceByWeight);
  };

  // Add price and weight to priceByWeight
  const handlePriceByWeight = async () => {
    const pw = { price: "", weight: "" };

    if (
      !(
        formik.values.priceByWeight[formik.values.priceByWeight.length - 1]
          .price === "" ||
        formik.values.priceByWeight[formik.values.priceByWeight.length - 1]
          .weight === ""
      )
    ) {
      formik.values.priceByWeight.push(pw);
      formik.setFieldValue("priceByWeight", formik.values.priceByWeight);
      toast.success("Added to the list");
    } else toast.error("You need to enter price and weight");
  };

  // Remove price and weight in priceByWeight
  const removeEachPriceByWeight = async (index) => {
    if (formik.values.priceByWeight.length === 1) {
      toast.error("Cannot remove!");
      return;
    } else {
      formik.values.priceByWeight.splice(index, 1);
      formik.setFieldValue("priceByWeight", formik.values.priceByWeight);
      toast.success("Removed successfully");
    }
  };

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
      <div className="addService-component">
        <ThemeProvider theme={theme}>
          <video src="assets/videos/video-6.webm" muted autoPlay loop></video>

          <div className="container">
            <div className="col form">
              {/* Heading */}
              <div className="row mb-4">
                {/* Back Button */}
                <div className="col-3">
                  <Link to="/manageService">
                    <TooltipDefault title="Back">
                      <IconButton>
                        <ArrowBackIcon className="back-button" />
                      </IconButton>
                    </TooltipDefault>
                  </Link>
                </div>
                <div className="col-9">
                  <div className="heading ms-3">Add New Service</div>
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
                      onChange={formik.handleChange}
                      type="text"
                      name="name"
                      value={formik.values.name}
                      label="Name"
                      variant="outlined"
                    />
                  </a>
                </div>
                <Tooltip id="name-tooltip" isOpen={true} imperativeModeOnly />

                {/* Input Price and Weight */}
                <div className="row mb-3">
                  <a
                    data-tooltip-id="priceByWeight-tooltip"
                    data-tooltip-content={formik.errors.priceByWeight}
                    data-tooltip-variant="warning"
                    data-tooltip-place="right"
                  >
                    {formik.values.priceByWeight.map((value, index) => (
                      <div className="row mb-3" key={index}>
                        <div className="col-4">
                          <TextField
                            type="text"
                            onChange={(e) => handlePrice(e.target.value, index)}
                            onKeyDown={handleKeyDown}
                            value={value.price}
                            label="Price (VND)"
                            variant="outlined"
                          />
                        </div>
                        <div className="col-4">
                          <TextField
                            type="text"
                            onChange={(e) =>
                              handleWeight(e.target.value, index)
                            }
                            onKeyDown={handleKeyDown}
                            value={value.weight}
                            label="Weight (kg)"
                            variant="outlined"
                          />
                        </div>
                        <div className="col-2">
                          <TooltipDefault title="Click me to add this one to list">
                            <Button
                              sx={{
                                bgcolor: "rgb(0, 201, 170)",
                                ":hover": { bgcolor: "rgb(0, 201, 170)" },
                                width: 20,
                                paddingRight: 3,
                              }}
                              variant="contained"
                              endIcon={<AddIcon />}
                              onClick={() => handlePriceByWeight()}
                            ></Button>
                          </TooltipDefault>
                        </div>
                        <div className="col-2">
                          <TooltipDefault title="Click me to remove this one">
                            <Button
                              sx={{
                                bgcolor: "rgb(0, 201, 170)",
                                ":hover": { bgcolor: "rgb(0, 201, 170)" },
                                width: 5,
                                paddingRight: 3,
                              }}
                              variant="contained"
                              endIcon={<RemoveIcon />}
                              onClick={() => removeEachPriceByWeight(index)}
                            ></Button>
                          </TooltipDefault>
                        </div>
                      </div>
                    ))}
                  </a>
                </div>
                <Tooltip
                  id="priceByWeight-tooltip"
                  isOpen={true}
                  imperativeModeOnly
                />

                {/* Input Desc */}
                <div className="row mb-3">
                  <a
                    data-tooltip-id="desc-tooltip"
                    data-tooltip-content={formik.errors.desc}
                    data-tooltip-variant="warning"
                    data-tooltip-place="right"
                  >
                    <TextField
                      onChange={formik.handleChange}
                      type="text"
                      name="desc"
                      value={formik.values.desc}
                      fullWidth
                      label="Description"
                      variant="outlined"
                    />
                  </a>
                </div>
                <Tooltip id="desc-tooltip" isOpen={true} imperativeModeOnly />

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
                        accept="*"
                        onChange={(e) =>
                          formik.setFieldValue(
                            "image",
                            e.currentTarget.files[0]
                          )
                        }
                      />
                    </Button>
                  </div>
                  <div className="col text-black h4">
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
                <Tooltip id="agree-tooltip" isOpen={true} imperativeModeOnly />

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
