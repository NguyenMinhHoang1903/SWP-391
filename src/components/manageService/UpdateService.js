import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton } from "@mui/material";
import TooltipDefault from "@mui/material/Tooltip";

export default function UpdateService() {
  const location = useLocation();
  // eslint-disable-next-line
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      oldName: "",
      name: "",
      price: "",
      desc: "",
      agree: false,
    },
    onSubmit: (values) => {
      let isFetched = true;
      fetch("http://localhost:5000/api/services/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          oldName: formik.values.oldName,
          name: values.name,
          price: Number(values.price),
          desc: values.desc,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (isFetched) {
            if (data.message === 0) toast.error("The name is already exists.");
            else {
              toast.success("Updated Successfully");
              navigate("/manageService");
            }
          }
        })
        .catch((err) => console.log(err));

      return () => {
        isFetched = false;
      };
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Required.")
        .min(2, "Must be 2 characters or more"),
      price: Yup.string().required("Required"),
      desc: Yup.string()
        .required("Required.")
        .min(3, "Must be 3 characters or more"),
      agree: Yup.boolean().oneOf(
        [true],
        "Do you forget this one?"
      ),
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

  useEffect(() => {
    let isFetched = true;
    const passedId = location.search.substring(1);

    async function startFetching() {
      await fetch(`http://localhost:5000/api/services/read/${passedId}`)
        .then((res) => res.json())
        .then((json) => {
          if (isFetched) {
            formik.setValues({
              oldName: json.name,
              name: json.name,
              price: json.price,
              desc: json.desc,
              agree: false,
            });
          }
        })
        .catch((err) => console.log(err));
    }
    startFetching();
    return () => {
      isFetched = false;
    };
  }, []);

  return (
    <>
      <div className="updateService-component">
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
                <Tooltip id="name-tooltip" isOpen={isOpen} imperativeModeOnly />

                {/* Input Price  */}
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
