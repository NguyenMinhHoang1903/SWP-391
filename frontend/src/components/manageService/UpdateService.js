import React, { useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton } from "@mui/material";
import TooltipDefault from "@mui/material/Tooltip";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function UpdateService() {
  const navigate = useNavigate();
  const location = useLocation();

  const formik = useFormik({
    initialValues: {
      oldName: "",
      name: "",
      priceByWeight: [{ price: "", weight: "" }],
      desc: "",
      agree: false,
    },
    onSubmit: (values) => {
      let flag = 0;
      values.priceByWeight.map((value) => {
        if (value.price === "" || value.weight === "") {
          toast.error("Either price or weight is required");
          flag = 1;
        }
      });

      // Call API
      console.log(flag)
      if (flag === 0) {
        fetch("http://localhost:5000/api/services/update", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            oldName: formik.values.oldName,
            name: values.name,
            priceByWeight: values.priceByWeight,
            desc: values.desc,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.message === 0) {
              toast.error("The name is already exists.");
            } else {
              toast.success("Successful Updated");
              navigate("/manageService");
            }
          })
          .catch((err) => console.log(err));
      }
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Required.")
        .min(2, "Must be 2 characters or more"),
      priceByWeight: Yup.array()
        .min(1, "Please enter at least one price and one weight")
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

  useEffect(() => {
    let isFetched = true;
    const passedName = location.search.substring(1);
    formik.setFieldValue("oldName", passedName);

    return () => {
      isFetched = false;
    };
  }, []);

  return (
    <>
      <div className="addService-component">
        <div className="container">
          <div className="row">
            {/* Video */}
            <div className="col">
              <video
                src="assets/videos/video-4.mp4"
                muted
                autoPlay
                loop
              ></video>
            </div>

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
                  <div className="heading">UPDATE SERVICE</div>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={formik.handleSubmit}>
                {/* Input Name */}
                <div className="row mb-3">
                  <label>Name</label>
                  <a
                    data-tooltip-id="name-tooltip"
                    data-tooltip-content={formik.errors.name}
                    data-tooltip-variant="warning"
                    data-tooltip-place="right"
                  >
                    <input
                      onChange={formik.handleChange}
                      type="text"
                      name="name"
                      value={formik.values.name}
                    />
                  </a>
                </div>
                <Tooltip id="name-tooltip" isOpen={true} imperativeModeOnly />

                {/* Input Price and Weight */}
                <div className="row mb-3">
                  <div className="row">
                    <div className="col-5">
                      <label>Price (VND)</label>
                    </div>
                    <div className="col-7">
                      <label>Weight (kg)</label>
                    </div>
                  </div>
                  <a
                    data-tooltip-id="priceByWeight-tooltip"
                    data-tooltip-content={formik.errors.priceByWeight}
                    data-tooltip-variant="warning"
                    data-tooltip-place="right"
                  >
                    {formik.values.priceByWeight.map((value, index) => (
                      <div className="row mb-3" key={index}>
                        <div className="col-4">
                          <input
                            type="text"
                            onChange={(e) => handlePrice(e.target.value, index)}
                            onKeyDown={handleKeyDown}
                            value={value.price}
                          />
                        </div>
                        <div className="col-4">
                          <input
                            type="text"
                            onChange={(e) =>
                              handleWeight(e.target.value, index)
                            }
                            onKeyDown={handleKeyDown}
                            value={value.weight}
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
                <Tooltip id="priceByWeight-tooltip" isOpen={true} imperativeModeOnly />

                {/* Input Desc */}
                <div className="row mb-3">
                  <label>Description</label>
                  <a
                    data-tooltip-id="desc-tooltip"
                    data-tooltip-content={formik.errors.desc}
                    data-tooltip-variant="warning"
                    data-tooltip-place="right"
                  >
                    <input
                      onChange={formik.handleChange}
                      type="text"
                      name="desc"
                      value={formik.values.desc}
                    />
                  </a>
                </div>
                <Tooltip id="desc-tooltip" isOpen={true} imperativeModeOnly />

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
                  UPDATE
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
