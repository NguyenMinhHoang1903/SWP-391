import React, { useState } from "react";
import ROLE from "../../common/role";
import STATUSUSER from "../../common/statusUser";
import { IoMdClose } from "react-icons/io";
import SummaryApi from "../../common/index";
import { toast } from "react-toastify";
import { Modal, Button, Row, Col } from "react-bootstrap";
import { Tooltip, Zoom } from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";

const ChangeUserRole = ({ name, email, role, statusUser, userId, onClose, callFunc }) => {
  const [show, setShow] = useState(false);

  // Close delete box
  const handleClose = () => {
    setShow(false);
  };

  // Open delete box
  const handleShow = () => {
    setShow(true);
  };

  const [userRole, setUserRole] = useState(role);
  const [userStatus, setUserStatus] = useState(statusUser);

  const handleOnChangeSelect = (e) => {
    setUserRole(e.target.value);

    console.log(e.target.value);
  };

  const handleOnChangeSelect2 = (e) => {
    setUserStatus(e.target.value);

    console.log(e.target.value);
  };

  //Delete one user by id
  const deleteUser = async () => {
    const fetchResponse = await fetch(SummaryApi.deleteUser.url, {
      method: SummaryApi.deleteUser.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
      }),
    });

    const responseData = await fetchResponse.json();

    if (responseData.success) {
      toast.success(responseData.message);
      onClose();
      callFunc();
    }
    else {
      toast.error(responseData.message);
    }
  }

  const updateUser = async () => {
    const fetchResponse = await fetch(SummaryApi.updateUser.url, {
      method: SummaryApi.updateUser.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        role: userRole,
        status: userStatus,
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

        <h1 className="updatestaff-title">Change User</h1>

        <div className="user-info">
          <p>Name : {name}</p>
          <p>Email : {email}</p>
        </div>

        <div className="role-selection">
          <p>Role :</p>
          <select value={userRole} onChange={handleOnChangeSelect}>
            {Object.values(ROLE).map((el) => {
              return (
                <option value={el} key={el}>
                  {el}
                </option>
              );
            })}
          </select>
        </div>

        <div className="status-selection">
          <p>Status :</p>
          <select value={userStatus} onChange={handleOnChangeSelect2}>
            {Object.values(STATUSUSER).map((el) => {
              return (
                <option value={el} key={el}>
                  {el}
                </option>
              );
            })}
          </select>
        </div>

        <div className="change-button">
          <button className="change-role-button" onClick={updateUser}>
            Update User
          </button>
        </div>
        <Button className="delete-button" onClick={() => handleShow()}>
          DELETE
        </Button>
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
            <Button
              variant="danger"
              id="delete-button"
              onClick={() => deleteUser()}
            >
              DELETE
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default ChangeUserRole;
