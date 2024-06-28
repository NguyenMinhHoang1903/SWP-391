import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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


export default function ManageCombo() {
  const [combos, setCombos] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(0);
  const [showDetail, setShowDetail] = useState(false);
  const [listServicesOfCombo, setListServicesOfCombo] = useState([]);
  const [openBackDrop, setOpenBackDrop] = useState(false);

  // Close modal
  const handleClose = () => {
    setShowDelete(false);
    setShowDetail(false);
  };

  // Show modal
  const handleShow = (passedComboId, nameButton) => {
    if (nameButton === "delete") {
      setDeleteId(passedComboId);
      setShowDelete(true);
    } else if (nameButton === "detail") {
      setOpenBackDrop(true);
      readAllServiceByComboId(passedComboId);
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
          toast.success("Delete Successfully");
        }
      })
      .catch((err) => console.log(err));

    return () => (isFetched = false);
  };

  // Read all service of selected combo
  const readAllServiceByComboId = async (passedComboId) => {
    let isFetched = true;
    console.log(passedComboId);
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
                  <th>ID</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {combos.map((combo) => (
                  <tr key={combo.comboId}>
                    <td>{combo.comboId}</td>
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
                                handleShow(combo.comboId, "detail");
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
                              to={`/updateCombo?${combo.comboId}`}
                            >
                              <Tooltip
                                title="Update"
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
                            <a
                              onClick={() =>
                                handleShow(combo.comboId, "delete")
                              }
                            >
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
              onClick={() => deleteCombo()}
            >
              DELETE
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Detail Box */}
        <Modal show={showDetail} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Combo Detail</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table striped bordered hover size="sm" responsive>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Service Name</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {listServicesOfCombo.map((service) => (
                  <tr key={service.id}>
                    <td>{service.id}</td>
                    <td>{service.name}</td>
                    <td>{service.price}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
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
