import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import SummaryApi from "../../common";
import moment from "moment";
import { TiEdit } from "react-icons/ti";
import ChangeUserRole from "./updateStaff";
import { Box, Button, TextField } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

export default function ManageStaff() {
  const [allUser, setAllUsers] = useState([]);
  const [openUpdateRole, setOpenUpdateRole] = useState(false);
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const keys = ["name"];
  const [updateUserDetails, setUpdateUserDetails] = useState({
    email: "",
    name: "",
    role: "",
    status: "",
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

  const handleBack = () => {
    navigate(-1);
  };

  //search name account
  const search = (data) => {
    if (query) {
      return data.filter((item) =>
        keys.some((key) =>
          item[key].toString().toLowerCase().includes(query.toLowerCase())
        )
      );
    }
    return data;
  };

  const searchByName = search(allUser);

  return (
    <>
      <div className="manageStaff-component">
        <div className="container-fluid">
          <div className="container">
            <div className="table">
              <div className="row">
                <div className="col-2">
                  <div className="heading-button-Link">
                    <Button
                      sx={{ bgcolor: "rgb(0, 201, 170)" }}
                      variant="contained"
                      type="button"
                      onClick={handleBack}
                    >
                      <ArrowBackIcon />
                    </Button>
                  </div>
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

              {/* Filter search bar */}
              <div className="row justify-content-end mb-3">
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: 3,
                  }}
                >
                  <TextField
                    sx={{ bgcolor: "white" }}
                    placeholder="Search by Name"
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </Box>
              </div>

              <table>
                <thead>
                  <tr>
                    <th style={{ textAlign: "center" }}>No.</th>
                    <th style={{ textAlign: "center" }}>Name</th>
                    <th style={{ textAlign: "center" }}>Email</th>
                    <th style={{ textAlign: "center" }}>Role</th>
                    <th style={{ textAlign: "center" }}>Status</th>
                    <th style={{ textAlign: "center" }}>Time</th>
                    <th>Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {searchByName.map((el, index) => (
                    <tr>
                      <td style={{ textAlign: "center" }}>{index + 1}</td>
                      <td>{el?.name}</td>
                      <td>{el?.email}</td>
                      <td style={{ textAlign: "center" }}>{el?.role}</td>
                      <td style={{ textAlign: "center" }}>{el?.status}</td>
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
            status={updateUserDetails.status}
            userId={updateUserDetails._id}
            callFunc={fetchAllUsers}
          />
        )}
      </div>
    </>
  );
}
