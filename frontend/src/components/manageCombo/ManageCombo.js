import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Button, Dropdown, Table, Col, Row } from "react-bootstrap";
import toast from "react-hot-toast";
import {
  Backdrop,
  Box,
  CircularProgress,
  IconButton,
  TextField,
  Zoom,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import WarningIcon from "@mui/icons-material/Warning";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TooltipDefault from "@mui/material/Tooltip";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { storage } from "../../common/FirebaseConfig";
import { ref, deleteObject } from "firebase/storage";
import moment from 'moment';

export default function ManageCombo() {
  const [combos, setCombos] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [showDetail, setShowDetail] = useState(false);
  const [showDesc, setShowDesc] = useState(false);
  const [comboDesc, setComboDesc] = useState("");
  const [listServicesOfCombo, setListServicesOfCombo] = useState([]);
  const [openBackDrop, setOpenBackDrop] = useState(false);
  const [serviceDesc, setServiceDesc] = useState();
  const [query, setQuery] = useState("");
  const [url, setUrl] = useState("");
  const [imageName, setImageName] = useState("");
  const [comboName, setComboName] = useState("");

  // Close modal
  const handleClose = (nameButton) => {
    if (nameButton === "delete") setShowDelete(false);
    else if (nameButton === "comboDetail") setShowDetail(false);
    else if (nameButton === "serviceDesc") setShowDesc(false);
  };

  // Show modal
  const handleShow = (field, nameButton) => {
    if (nameButton === "deleteCombo") {
      setDeleteId(field._id);
      setUrl(field.imageUrl);
      setImageName(field.imageName);
      setComboName(field.name);
      setShowDelete(true);
    } else if (nameButton === "comboDetail") {
      setOpenBackDrop(true);
      console.log(field.imageUrl);
      setUrl(field.imageUrl);
      setComboDesc(field.desc);
      readAllServiceByComboId(field._id);
    } else if (nameButton === "serviceDesc") {
      setServiceDesc(field.desc);
      setShowDesc(true);
    }
  };

  // Get all combo from database
  const fetchData = async () => {
    let isFetched = true;
    await fetch("http://localhost:5000/api/combos/read")
      .then((res) => res.json())
      .then((json) => {
        if (isFetched) {
          const combosWithStatus = json.map((combo) => {
            const currentDate = new Date();
            const startDate = new Date(combo.startDate);
            const endDate = new Date(combo.endDate);

            let status = "Processing";
            if (currentDate < startDate) status = "Soon";
            else if (currentDate > endDate) status = "Expired";

            return { ...combo, status };
          });

          setCombos(combosWithStatus);
        }
      })
      .catch((err) => console.log(err));

    return () => {
      isFetched = false;
    };
  };

  // Delete one combo from database by combo ID
  const deleteCombo = async () => {
    let isFetched = true;
    setShowDelete(false);

    // Create a reference to the file to delete
    const comboRef = ref(storage, `${comboName}/${comboName}/${imageName}`);
    // Delete the image
    deleteObject(comboRef)
      .then(() => {
        console.log("Deleted image");
      })
      .catch((error) => {
        console.log(error);
      });

    await fetch(`http://localhost:5000/api/combos/delete/${deleteId}`, {
      method: "DELETE",
    })
      .then(() => {
        if (isFetched) {
          fetchData();
          toast.success("Deleted Successfully");
        }
      })
      .catch((err) => console.log(err));

    return () => (isFetched = false);
  };

  // Read all service of selected combo
  const readAllServiceByComboId = async (passedComboId) => {
    let isFetched = true;

    await fetch(`http://localhost:5000/api/combos/read/${passedComboId}`)
      .then((res) => res.json())
      .then((json) => {
        if (isFetched) {
          setListServicesOfCombo(json);

          if (listServicesOfCombo) {
            setOpenBackDrop(false);
            setShowDetail(true);
          }
        }
      })
      .catch((err) => console.log(err));

    return () => {
      isFetched = false;
    };
  };

  // Search
  const keys = ["name", "price", "startDate", "endDate", "status", "desc"];
  const search = () => {
    if (combos) {
      return combos.filter((combo) =>
        keys.some((key) => combo[key].toString().toLowerCase().includes(query))
      );
    }
  };

  function getStatusColor(status) {
    switch (status) {
      case "Processing":
        return "#28a745"; // green color
      case "Expired":
        return "#dc3545"; // red color
      case "Soon":
        return "#007bff"; // blue color
      default:
        return ""; // default color
    }
  }

  // Currency functions
  const formattedPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price);
  };

  // Start fetching data
  useEffect(() => {
    let isFetched = true;
    if (isFetched) fetchData();
    return () => {
      isFetched = false;
    };
  }, []);

  return (
    <>
      <div className="manageCombo-component">
        <div className="container-fluid">
          <div className="container">
            <div className="heading row align-items-center">
              <div className="col-5">
                {/* Back Button */}
                <Link to="/manageService">
                  <TooltipDefault title="Back">
                    <IconButton sx={{ marginLeft: 2 }} >
                      <ArrowBackIcon sx={{color: 'white'}} className="back-button" />
                    </IconButton>
                  </TooltipDefault>
                </Link>
              </div>
              <div className="col-7">
                <div className="heading-center">Combo List</div>
              </div>

              <video
                className="heading-video"
                src="assets/videos/video-7.webm"
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
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
                label="Search..."
              />
            </Box>

            {/* Table */}
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price (VND)</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {search().map((combo) => (
                  <tr key={combo._id}>
                    <td>{combo.name}</td>
                    <td>{formattedPrice(combo.price)} </td>
                    <td>{moment(combo.startDate).format('YYYY/MM/DD HH:mm:ss') }</td>
                    <td>{moment(combo.endDate).format('YYYY/MM/DD HH:mm:ss') }</td>
                    <td style={{ color: getStatusColor(combo.status) }}>
                      {combo.status}
                    </td>
                    <td>
                      <Dropdown>
                        <Dropdown.Toggle
                          className="dropdown-toggle"
                          variant="light"
                        >
                          {" "}
                          <Link title="Option" id="option-tooltip"></Link>{" "}
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="dropdown-menu">
                          <Dropdown.Item className="dropdown-item">
                            <a
                              onClick={() => {
                                handleShow(combo, "comboDetail");
                              }}
                            >
                              <Tooltip
                                title="Detail"
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
                              to={`/updateCombo?${combo._id}`}
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
                            <a onClick={() => handleShow(combo, "deleteCombo")}>
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
              <Link className="add-button-Link" to="/addCombo">
                ADD
              </Link>
            </div>
          </div>
        </div>

        {/* Delete Box */}
        <Modal
          show={showDelete}
          onHide={() => handleClose("deleteCombo")}
          centered
        >
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
            <Button
              variant="secondary"
              onClick={() => handleClose("deleteCombo")}
            >
              Close
            </Button>
            <Button
              variant="danger"
              id="delete-button"
              onClick={() => deleteCombo()}
            >
              DELETE
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Combo Detail Box */}
        <Modal
          show={showDetail}
          onHide={() => handleClose("comboDetail")}
          centered
        >
          <Modal.Body>
            <img
              className="mb-2"
              src={url}
              alt=""
              style={{ width: "100%" }}
              loading="lazy"
            />

            <h4>Combo Description</h4>
            <p className="ps-5">{comboDesc}</p>

            <Table striped bordered hover size="sm" responsive>
              <thead>
                <tr>
                  <th>Service Name</th>
                  <th>Price (VND)</th>
                  <th>Weight (kg)</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {listServicesOfCombo.map((service) => (
                  <tr key={service._id}>
                    <td>{service.name}</td>
                    <td>
                      {service.priceByWeight.map((value) => (
                        <div>{formattedPrice(value.price)}</div>
                      ))}
                    </td>
                    <td>
                      {service.priceByWeight.map((value) => (
                        <div>{value.weight}</div>
                      ))}
                    </td>
                    <td>
                      <TooltipDefault title="Open Description">
                        <IconButton
                          onClick={() => handleShow(service, "serviceDesc")}
                        >
                          <MoreVertIcon />
                        </IconButton>
                      </TooltipDefault>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => handleClose("comboDetail")}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Service Description Box */}
        <Modal
          show={showDesc}
          onHide={() => handleClose("serviceDesc")}
          size="lg"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Service Description</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="ps-5">{serviceDesc}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => handleClose("serviceDesc")}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Back Drop */}
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={openBackDrop}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    </>
  );
}
