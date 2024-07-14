import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Dropdown, Row, Col, Table } from "react-bootstrap";
import toast from "react-hot-toast";
import { Box, IconButton, TextField, Tooltip, Zoom } from "@mui/material";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import WarningIcon from "@mui/icons-material/Warning";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TooltipDefault from "@mui/material/Tooltip";
import SendIcon from "@mui/icons-material/Send";
import { Button } from "@mui/material";
import { storage } from "../../common/FirebaseConfig";
import { ref, deleteObject } from "firebase/storage";

export default function ManageService() {
  const [services, setServices] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(0);
  const [showDesc, setShowDesc] = useState(false);
  const [desc, setDesc] = useState("");
  const [query, setQuery] = useState("");
  const [url, setUrl] = useState("");
  const [imageName, setImageName] = useState("");
  const [serviceName, setServiceName] = useState("");

  // Currency functions
  const formattedPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price);
  };

  // Close modal
  const handleClose = () => {
    setShowDelete(false);
    setShowDesc(false);
  };

  // Show modal
  const handleShow = (service, nameButton) => {
    if (nameButton === "delete") {
      setDeleteId(service._id);
      setUrl(service.imageUrl);
      setImageName(service.imageName);
      setServiceName(service.name);
      setShowDelete(true);
    } else if (nameButton === "desc") {
      setDesc(service.desc);
      setUrl(service.imageUrl);
      setShowDesc(true);
    }
  };

  // Get all service from database
  const fetchData = async () => {
    await fetch("http://localhost:5000/api/services/read")
      .then((res) => res.json())
      .then((json) => setServices(json))
      .catch((err) => console.log(err));
  };

  // Delete one service by ID
  const deleteService = async () => {
    setShowDelete(false);

    // Create a reference to the file to delete
    const serviceRef = ref(
      storage,
      `${serviceName}/${serviceName}/${imageName}`
    );
    // Delete the image
    deleteObject(serviceRef)
      .then(() => {
        console.log("Deleted image");
      })
      .catch((error) => {
        console.log(error);
      });

    await fetch(`http://localhost:5000/api/services/delete/${deleteId}`, {
      method: "DELETE",
    })
      .then(() => {
        fetchData();
        toast.success("Deleted Successfully");
      })
      .catch((err) => console.log(err));
  };

  // Search
  const keys = ["name", "desc"];
  const search = () => {
    if (services) {
      return services.filter((service) =>
        keys.some((key) =>
          service[key].toString().toLowerCase().includes(query)
        )
      );
    }
  };

  // Start fetching all service
  useEffect(() => {
    let isFetched = true;
    if (isFetched) {
      fetchData();
    }
    return () => {
      isFetched = false;
    };
  }, []);

  return (
    <>
      <div className="manageService-component">
        <div className="container-fluid">
          <div className="container">
            <div className="heading row align-items-center">
              <div className="col-5">
                {/* Back Button */}
                <Link to="/">
                  <TooltipDefault title="Back">
                    <IconButton sx={{ marginLeft: 2 }} >
                      <ArrowBackIcon sx={{color: 'white'}} className="back-button" />
                    </IconButton>
                  </TooltipDefault>
                </Link>
              </div>
              <div className="col-5">
                <div className="heading-center">Service List</div>
              </div>

              {/* Manage Service Button */}
              <div className="col-2">
                <Button
                  sx={{
                    bgcolor: "rgb(0, 201, 170)",
                    ":hover": { bgcolor: "rgb(0, 201, 170)" },
                  }}
                  className="heading-button"
                  variant="contained"
                  endIcon={<SendIcon />}
                >
                  <Link
                    className="text-decoration-none text-white"
                    to="/manageCombo"
                  >
                    Manage Combo
                  </Link>
                </Button>
              </div>

              <video
                className="heading-video"
                src="assets/videos/video-6.webm"
                muted
                autoPlay
                loop
              ></video>
            </div>

            {/* Search */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 3,
              }}
            >
              <TextField
                sx={{ bgcolor: "white" }}
                variant="outlined"
                label="Search..."
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
              />
            </Box>

            {/* Table */}
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price (VND)</th>
                  <th>Weight (kg)</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {search().map((service) => (
                  <tr key={service._id}>
                    <td>{service.name}</td>
                    <td>
                      {service.priceByWeight.map((value, index) => (
                        <div key={index}>{formattedPrice(value.price)}</div>
                      ))}
                    </td>
                    <td>
                      {service.priceByWeight.map((value, index) => (
                        <div key={index}>{value.weight}</div>
                      ))}
                    </td>
                    <td>
                      <Dropdown autoClose="outside">
                        <Dropdown.Toggle
                          className="dropdown-toggle"
                          variant="light"
                        >
                          {" "}
                          <Link title="Option" id="option-tooltip"></Link>{" "}
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="dropdown-menu">
                          <Dropdown.Item className="dropdown-item">
                            <a onClick={() => handleShow(service, "desc")}>
                              <Tooltip
                                title="Description"
                                placement="left-start"
                                TransitionComponent={Zoom}
                                arrow
                              >
                                <IconButton>
                                  <ContentPasteSearchIcon />
                                </IconButton>
                              </Tooltip>
                            </a>
                          </Dropdown.Item>
                          <Dropdown.Item className="dropdown-item">
                            <Link
                              className="update-button"
                              to={`/updateService?${service._id}`}
                            >
                              <Tooltip
                                title="Edit"
                                placement="left-start"
                                TransitionComponent={Zoom}
                                arrow
                              >
                                <IconButton>
                                  <EditIcon />
                                </IconButton>
                              </Tooltip>
                            </Link>
                          </Dropdown.Item>
                          <Dropdown.Item className="dropdown-item">
                            <a onClick={() => handleShow(service, "delete")}>
                              <Tooltip
                                title="Delete"
                                placement="left-start"
                                TransitionComponent={Zoom}
                                arrow
                              >
                                <IconButton>
                                  <DeleteIcon />
                                </IconButton>
                              </Tooltip>
                            </a>
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            {/* Add Button */}
            <div className="add-button">
              <Link className="add-button-Link" to="/addService">
                ADD
              </Link>
            </div>
          </div>
        </div>

        {/* Delete Box */}
        <Modal show={showDelete} onHide={handleClose} centered>
          <Modal.Body>
            <Row className="justify-content-md-center mt-4">
              <Col lg="1" className="mt-1">
                <Tooltip title="Warning">
                  <WarningIcon />
                </Tooltip>
              </Col>
              <Col lg="5">
                <h3>Are you sure?</h3>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="danger"
              id="delete-button"
              onClick={() => deleteService()}
            >
              DELETE
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Description Box */}
        <Modal show={showDesc} onHide={handleClose} centered>
          <Modal.Body>
            <img
              className="mb-2"
              src={url}
              alt=""
              style={{ width: "100%" }}

            />
            <h5>Description</h5>
            <p style={{ textIndent: 15 }}>{desc}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
