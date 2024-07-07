import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton } from "@mui/material";
import TooltipDefault from "@mui/material/Tooltip";


// Utility function to get next day's date
const getNextDayDate = () => {
  const today = new Date();
  const nextDay = new Date(today);
  nextDay.setDate(today.getDate() + 1);
  return nextDay.toISOString().split('T')[0];
};

export default function AddCombo() {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [isOpen, setIsOpen] = useState(true);

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      startDate: "",
      endDate: "",
      desc: "",
      serviceId: [],
      agree: false,
    },
    onSubmit: (values) => {
      const { startDate, endDate } = values;
      const validStartDate = startDate;
      const validEndDate = endDate;

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
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message === 0) {
            toast.error("The name is already exists.");
          } else {
            toast.success("Add Successfully");
            navigate("/manageCombo");
          }
        })
        .catch((err) => console.log(err));
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, "Must be 2 characters or more")
        .required("Required."),

      price: Yup.number()
        .typeError("Price must be a number")
        .required("Required")
        .test('is-less-than-total', 'Price must be less than the total of services', function(value) {
          const { serviceId } = this.parent;
          if (!value || !serviceId || serviceId.length === 0) {
            return true; // No services selected or price is not set, so no comparison needed
          }
          const totalServicePrice = services.reduce((total, service) => {
            if (serviceId.includes(service._id)) {
              return total + service.price;
            }
            return total;
          }, 0);
          return value <= totalServicePrice;
      }),

      startDate: Yup.date()
        .min(getNextDayDate(), "Start date must be at least the next day")
        .nullable(),

      endDate: Yup.date()
        .min(Yup.ref('startDate'), "End date cannot be before start date")
        .nullable(),

      desc: Yup.string()
        .min(2, "Must be 2 characters or more")
        .required("Required."),

      serviceId: Yup.array()
        .test({
          message: "Please choose at least 2 service.",
          test: (arr) => arr.length > 1,
        })
        .required("Please choose at least 2 service."),

      agree: Yup.boolean().oneOf([true], "Do you add this one?"),
    }),
  });

  // Function to handle date changes
const handleDateChange = (e) => {
  const { name, value } = e.target;
  formik.setFieldValue(name, value); // Update formik values
};

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

  useEffect(() => {
    let isFetched = true;
    if (isFetched) readAllService();
    return () => {
      isFetched = false;
    };
  }, []);

  return (
    <>
      <div className="addCombo-component">
        <div className="container">
          <div className="row ">
            {/* Video */}
            <div className="col">
              <video
                src="assets/videos/video-2.mp4"
                muted
                autoPlay
                loop
              ></video>
            </div>

            <div className="col form">
              {/* Heading */}
              <div className="row mb-2">
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
                  <div className="heading">ADD NEW COMBO</div>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={formik.handleSubmit}>
                
                {/* Input Name */}
                <div className="row mb-4">
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
                <Tooltip id="name-tooltip" isOpen={isOpen} imperativeModeOnly />

                {/* Input Price */}
                <div className="row mb-4">
                  <label>Price</label>
                  <a
                    data-tooltip-id="price-tooltip"
                    data-tooltip-content={formik.errors.price}
                    data-tooltip-variant="warning"
                    data-tooltip-place="right"
                  >
                    <input
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
                  isOpen={isOpen}
                  imperativeModeOnly
                />

                {/* Input Start Date */}
                <div className="row mb-4">
                  <label>Start Date</label>
                  <a
                    data-tooltip-id="startDate-tooltip"
                    data-tooltip-content={formik.errors.startDate}
                    data-tooltip-variant="warning"
                    data-tooltip-place="right"
                  >
                    <input
                      onChange={handleDateChange}
                      type="date"
                      name="startDate"
                      value={formik.values.startDate}
                      minDate={getNextDayDate()}
                    />
                  </a>
                </div>
                <Tooltip id="startDate-tooltip" isOpen={isOpen} imperativeModeOnly />

                {/* Input End Date */}
                <div className="row mb-4">
                  <label>End Date</label>
                  <a
                    data-tooltip-id="endDate-tooltip"
                    data-tooltip-content={formik.errors.endDate}
                    data-tooltip-variant="warning"
                    data-tooltip-place="right"
                  >
                    <input
                      onChange={handleDateChange}
                      type="date"
                      name="endDate"
                      value={formik.values.endDate}
                      minDate={formik.values.startDate}
                    />
                  </a>
                </div>
                <Tooltip id="endDate-tooltip" isOpen={isOpen} imperativeModeOnly />

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
                <Tooltip id="desc-tooltip" isOpen={isOpen} imperativeModeOnly />

                {/* Choose Service */}
                <div className="row mb-4">
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

                {/* Switch */}
                <div className="row mb-4">
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
                  isOpen={isOpen}
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
      </div>
    </>
  );
}
