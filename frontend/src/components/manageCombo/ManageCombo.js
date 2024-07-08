import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Button, Dropdown, Table, Col, Row } from "react-bootstrap";
import toast from "react-hot-toast";
import {
  Backdrop,
  Box,
  CircularProgress,
  IconButton,
  InputAdornment,
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
import SearchIcon from "@mui/icons-material/Search";

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
      setShowDelete(true);
    } else if (nameButton === "comboDetail") {
      setOpenBackDrop(true);
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
  const keys = ["name"];
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
            <div className="row">
              {/* Back Button */}
              <div className="col-4">
                <Link to="/manageService">
                  <TooltipDefault title="Back">
                    <IconButton>
                      <ArrowBackIcon className="back-button" />
                    </IconButton>
                  </TooltipDefault>
                </Link>
              </div>
              <div className="col-6">
                {/* Heading */}
                <div className="heading">COMBO LIST</div>
              </div>
              {/* Video */}
              <div className="col-2">
                <video
                  className="heading-video"
                  src="assets/videos/video-3.webm "
                  autoPlay
                  muted
                  loop
                ></video>
              </div>
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
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                placeholder="Search name of combo"
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
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {search().map((combo) => (
                  <tr key={combo._id}>
                    <td>{combo.name}</td>
                    <td>{combo.price} </td>
                    <td style={{ color: getStatusColor(combo.status) }}>{combo.status}</td>
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
          <Modal.Header closeButton>
            <Modal.Title>Combo Detail</Modal.Title>
          </Modal.Header>
          <Modal.Body>
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
                    <td>{service.priceByWeight.map(value => (
                      <div>{value.price}</div>
                    ))}</td>
                    <td>{service.priceByWeight.map(value => (
                      <div>{value.weight}</div>
                    ))}</td>
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
            <h4>Combo Description</h4>
            <p className="ps-5">{comboDesc}</p>
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
