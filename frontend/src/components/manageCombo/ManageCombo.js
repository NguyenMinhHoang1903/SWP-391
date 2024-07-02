import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Modal, Button, Dropdown, Table, Col, Row } from "react-bootstrap";
import toast from "react-hot-toast";
import { Backdrop, CircularProgress, IconButton, Zoom } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import WarningIcon from "@mui/icons-material/Warning";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TooltipDefault from "@mui/material/Tooltip";
import MoreVertIcon from "@mui/icons-material/MoreVert";

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
        if (isFetched) setCombos(json);
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
                <Link to="/manageStaff">
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
            {/* Table */}
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Price</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {combos.map((combo) => (
                  <tr key={combo._id}>
                    <td></td>
                    <td>{combo.name}</td>
                    <td>$ {combo.price}</td>
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
                  <th>Price</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {listServicesOfCombo.map((service) => (
                  <tr key={service._id}>
                    <td>{service.name}</td>
                    <td>{service.price}</td>
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
