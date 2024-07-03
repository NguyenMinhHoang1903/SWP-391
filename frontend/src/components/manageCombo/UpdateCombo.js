import React from "react";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton } from "@mui/material";
import TooltipDefault from "@mui/material/Tooltip";

export default function UpdateCombo() {
  const navigate = useNavigate();
  const location = useLocation();
  const [services, setServices] = useState([]);
  const [isOpen, setIsOpen] = useState(true);

  const formik = useFormik({
    initialValues: {
      oldName: "",
      name: "",
      price: "",
      desc: "",
      serviceId: [],
      agree: false,
    },
    onSubmit: (values) => {
      fetch("http://localhost:5000/api/combos/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          oldName: formik.values.oldName,
          name: values.name,
          price: Number(values.price),
          desc: values.desc,
          serviceId: values.serviceId,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message === 0) {
            toast.error("Update Unsuccessfully");
          } else {
            toast.success("Update Successfully");
            navigate("/manageCombo");
          }
        })
        .catch((err) => console.log(err));
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, "Must be 2 characters or more")
        .required("Required."),
      price: Yup.string().required("Required"),
      desc: Yup.string()
        .min(2, "Must be 2 characters or more")
        .required("Required."),
      serviceId: Yup.array()
        .test({
          message: "Please choose at least one service",
          test: (arr) => arr.length !== 0,
        })
        .required("Required."),
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




  useEffect(() => {
    let isFetched = true;
    const passedId = location.search.substring(1);

    // Read one combo by id
    async function readOneCombo() {
      await fetch(`http://localhost:5000/api/combos/readOne/${passedId}`)
        .then((res) => res.json())
        .then((json) => {
          if (isFetched) {
            formik.setValues({
              oldName: json.name,
              name: json.name,
              price: json.price,
              desc: json.desc,
              serviceId: json.serviceId,
              agree: false,
            });
          }
        })
        .catch((err) => console.log(err));
    }
    
    readAllService();
    readOneCombo();
    return () => {
      isFetched = false;
    }
  }, []);

  return (
    <>
      <div className="updateCombo-component">
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

            {/* Form */}
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
                  <div className="heading">UPDATE COMBO</div>
                </div>
              </div>

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
                <Tooltip id="name-tooltip" isOpen={isOpen} imperativeModeOnly />

                {/* Input Price */}
                <div className="row mb-3">
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
                        Check this button to update
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
