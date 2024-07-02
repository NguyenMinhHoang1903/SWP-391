import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import SummaryApi from "../../common";
import moment from "moment";
import { TiEdit } from "react-icons/ti";
import ChangeUserRole from "./updateStaff";
import { Link } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import { Button } from "@mui/material";

export default function ManageStaff() {
  const [allUser, setAllUsers] = useState([]);
  const [openUpdateRole, setOpenUpdateRole] = useState(false);
  const [updateUserDetails, setUpdateUserDetails] = useState({
    email: "",
    name: "",
    role: "",
    _id: "",
  });

  const fetchAllUsers = async () => {
    const fetchData = await fetch(SummaryApi.allUser.url, {
      method: SummaryApi.allUser.method,
      credentials: "include",
    });

    const dataResponse = await fetchData.json();

    if (dataResponse.success) {
      setAllUsers(dataResponse.data);
    }

    if (dataResponse.error) {
      toast.error(dataResponse.message);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  // Delete one staff from backend by using staff ID
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="manageStaff-component">
        <div className="container-fluid">
          <div className="container">
            <div className="table">
              <div className="row">
                <div className="col-2">
                  {/* Manage Service Button */}
                  <Button
                    className="heading-button mb-3"
                    variant="contained"
                    endIcon={<SendIcon />}
                  >
                    <Link className="heading-button-Link" to="/manageService">
                      Manage Service
                    </Link>
                  </Button>
                  {/* Manage Service Button */}
                  <Button
                    className="heading-button"
                    variant="contained"
                    endIcon={<SendIcon />}
                  >
                    <Link className="heading-button-Link" to="/manageCombo">
                      Manage Combo
                    </Link>
                  </Button>
                </div>
                <div className="col-8">
                  <div className="heading">
                    Manage Account
                  </div>
                </div>
                <div className="col-2">
                  <img
                    className="table-heading-right"
                    src="assets/imgs/gif-1.gif"
                    alt=""
                  />
                </div>
              </div>
              <table>
                <thead>
                  <tr>
                    <th style={{ textAlign: "center" }}>St</th>
                    <th style={{ textAlign: "center" }}>Name</th>
                    <th style={{ textAlign: "center" }}>Email</th>
                    <th style={{ textAlign: "center" }}>Role</th>
                    <th style={{ textAlign: "center" }}>Time</th>
                    <th>Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {allUser.map((el, index) => (
                    <tr>
                      <td style={{ textAlign: "center" }}>{index + 1}</td>
                      <td>{el?.name}</td>
                      <td>{el?.email}</td>
                      <td style={{ textAlign: "center" }}>{el?.role}</td>
                      <td style={{ textAlign: "center" }}>
                        {moment(el?.createdAt).format("LL")}
                      </td>
                      <td>
                        {" "}
                        <button
                          className="edit"
                          onClick={() => {
                            setUpdateUserDetails(el);
                            setOpenUpdateRole(true);
                          }}
                        >
                          <TiEdit />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {openUpdateRole && (
          <ChangeUserRole
            onClose={() => setOpenUpdateRole(false)}
            name={updateUserDetails.name}
            email={updateUserDetails.email}
            role={updateUserDetails.role}
            userId={updateUserDetails._id}
            callFunc={fetchAllUsers}
          />
        )}
      </div>
    </>
  );
}
