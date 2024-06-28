import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Button, Dropdown, Row, Col, Table } from "react-bootstrap";
import toast from "react-hot-toast";
import { IconButton, Tooltip, Zoom } from "@mui/material";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import WarningIcon from "@mui/icons-material/Warning";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TooltipDefault from "@mui/material/Tooltip";

export default function ManageService() {
  const [services, setServices] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(0);
  const [showDetail, setShowDetail] = useState(false);
  const [serviceId, setServiceId] = useState();

  // Close modal
  const handleClose = () => {
    setShowDelete(false);
    setShowDetail(false);
  };

  // Show modal
  const handleShow = (serviceId, nameButton) => {
    if (nameButton === "delete") {
      setDeleteId(serviceId);
      setShowDelete(true);
    } else if (nameButton === "detail") {
      setShowDetail(true);
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
    await fetch(`http://localhost:5000/api/services/delete/${deleteId}`, {
      method: "DELETE",
    })
      .then(() => {
        fetchData();
        toast.success("Successful deleted");
      })
      .catch((err) => console.log(err));
  };

  // Start fetching all service
  useEffect(() => {
    let isFetched = true;
    if (isFetched) fetchData();
    return () => {
      isFetched = false;
    };
  }, []);

  return (
    <>
      <div className="manageService-component">
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
                <div className="heading">Service List</div>
              </div>
              {/* Video */}
              <div className="col-2">
                <video
                  className="heading-video"
                  src="assets/videos/video-3.webm"
                  muted
                  autoPlay
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
                {services.map((service) => (
                  <tr key={service.id}>
                    <td>{service.id}</td>
                    <td>{service.name}</td>
                    <td>$ {service.price}</td>
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
                            <a onClick={() => handleShow(service.id, "detail")}>
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
                              to={`/updateService?${service.id}`}
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
                            <a onClick={() => handleShow(service.id, "delete")}>
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

        {/* Detail Box */}
        <Modal show={showDetail} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Service Detail</Modal.Title>
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
              <tbody></tbody>
            </Table>
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