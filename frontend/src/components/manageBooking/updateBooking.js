import React, { useState } from "react";
import STATUSBOOKING from "../../common/statusBooking";
import { IoMdClose } from "react-icons/io";
import SummaryApi from "../../common/index";
import { toast } from "react-toastify";
import { Modal, Button, Row, Col } from "react-bootstrap";
import { Tooltip, Zoom } from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";

const ChangeBookingRole = ({ userName, statusBooking, bookingId, onClose, callFunc }) => {
  const [show, setShow] = useState(false);

  // Close delete box
  const handleClose = () => {
    setShow(false);
  };

  // Open delete box
  const handleShow = () => {
    setShow(true);
  };

  const [bookingStatus, setBookingStatus] = useState(statusBooking);

  const handleOnChangeSelect2 = (e) => {
    setBookingStatus(e.target.value);
  };


  const updateBooking = async () => {
    const fetchResponse = await fetch(SummaryApi.updateBooking.url, {
      method: SummaryApi.updateBooking.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        bookingId: bookingId,
        status: bookingStatus,
      }),
    });

    const responseData = await fetchResponse.json();

    if (responseData.success) {
      toast.success(responseData.message);
      onClose();
      callFunc();
    }
  };

  return (
    <div className="updatestaff-background">
      <div className="updatestaff-container">
        <button className="close-button" onClick={onClose}>
          <IoMdClose />
        </button>

        <h1 className="updatestaff-title">Change Booking</h1>

        <div className="user-info">
          <p>Username : {userName}</p>
        </div>

        <div className="status-selection">
          <p>Status :</p>
          <select value={bookingStatus} onChange={handleOnChangeSelect2}>
            {Object.values(STATUSBOOKING).map((data) => {
              return (
                <option value={data} key={data}>
                  {data}
                </option>
              );
            })}
          </select>
        </div>

        <div className="change-button">
          <button className="change-role-button" onClick={updateBooking}>
            Update Booking
          </button>
        </div>
        {/* <Button className="delete-button" onClick={() => handleShow()}>
          DELETE
        </Button> */}
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Notification</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row className="justify-content-md-center">
              <Col lg="1" className="mt-1">
                <Tooltip TransitionComponent={Zoom} title="Warning">
                  <WarningIcon />
                </Tooltip>
              </Col>
              <Col lg="6">
                <h3>Are you sure?</h3>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default ChangeBookingRole;
