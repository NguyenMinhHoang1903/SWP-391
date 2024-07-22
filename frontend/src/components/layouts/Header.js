import { Link } from "react-router-dom";
import SummaryApi from "../../common";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../../store/userSlice";
import { ImProfile } from "react-icons/im";
import { MdOutlineChangeCircle } from "react-icons/md";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import BookTwoToneIcon from "@mui/icons-material/BookTwoTone";
import { MdManageAccounts } from "react-icons/md";
import { MdHistory } from "react-icons/md";
import React, { useEffect, useState } from "react";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { Collapse } from "react-bootstrap";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FaWallet } from "react-icons/fa6";
import { FaEye, FaEyeSlash } from "react-icons/fa";


const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const signOut = useSignOut();
  const [openManageLink, setOpenManageLink] = useState(false);
  const [nameLink, setNameLink] = useState("");
  const [openMyBooking, setOpenMyBooking] = useState(false);
  const [showWallet, setShowWallet] = useState(true); // State to show/hide wallet
  const [myWallet, setMyWallet] = useState([]);

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: "include",
    });

    const data = await fetchData.json();
    if (data.success) {
      signOut();
      toast.success(data.message);
      dispatch(setUserDetails(null));
    }
    if (data.error) {
      toast.error(data.message);
    }
  };
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // eslint-disable-next-line
  useEffect(() => {
    // Handle manage link
    const handleManageLink = async () => {
      if (user === null) return;
      else if (user.role === "ADMIN") {
        setOpenManageLink(true);
        setNameLink("/adminHome");
      } else if (user.role === "MANAGER") {
        setOpenManageLink(true);
        setNameLink("/manageService");
      } else if (user.role === "STAFF") {
        setOpenManageLink(true);
        setNameLink("/manageBooking");
      } else if (user.role === "CUSTOMER") {
        setOpenMyBooking(true);
        setNameLink("/myBookingList");
      }
    };

    handleManageLink();
  }, [user]);

  //show-hide number of money
  const toggleWallet = () => {
    setShowWallet(!showWallet);
  };

  const fetchAllUsers = async () => {
    const fetchData = await fetch(SummaryApi.allUser.url, {
      method: SummaryApi.allUser.method,
      credentials: "include",
    });

    const dataResponse = await fetchData.json();
    if (dataResponse.success) {
      // Filter bookings by logged-in user
      const userWallet = dataResponse.data.filter(wallet => wallet.name === user.name);
      setMyWallet(userWallet);
    }

    if (dataResponse.error) {
      toast.error(dataResponse.message);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN').format(amount);
  };

  return (
    <div className="navbar-container">
      <div className="container">
        <div className="navbar">
          <div className="navbar-left">
            <Link className="link" to="/">
              <img src="Logo.png" alt="LogoPet" />
            </Link>
            <div class="wrapper">
              <div class="tabs">
                <input type="radio" name="tabs" checked id="tab1" />
                <label for="tab1">
                  <Link className="link" to="/">
                    Home
                  </Link>
                </label>

                <input type="radio" name="tabs" checked id="tab2" />
                <label for="tab2">
                  <Link className="link" to="/booking">
                    Booking
                  </Link>
                </label>

                <input type="radio" name="tabs" checked id="tab3" />
                <label for="tab3">
                  <Link className="link" to="/serviceslist">
                    Service
                  </Link>
                </label>

                <input type="radio" name="tabs" checked id="tab4" />
                <label for="tab1">
                  <Link className="link" to="/myPetList">
                    My Pets
                  </Link>
                </label>
                <div class="glider"></div>
              </div>
            </div>
          </div>
          <div className="navbar-right">

            <div>
              <div className="userIcon">
                <img src="userIcon.png" alt="userIcon" />
                <div />
                <div class="dropdown">
                  {user ? (
                    <div>
                      <div
                        class="btn username btn-7sm "
                        type="button"
                        data-bs-toggle="dropdown"
                      >
                        {user.name}
                      </div>
                      <ul
                        class="dropdown-menu container-fluid p-0"
                        aria-labelledby="dropdownMenu2"
                      >
                        <Link className="profile" to="/userprofile">
                          <div class="dropdown-item">
                            <ImProfile /> Profile
                          </div>
                        </Link>
                        <Link className="profile" to="/changepassword">
                          <div class="dropdown-item">
                            <MdOutlineChangeCircle /> Password
                          </div>
                        </Link>

                        <Collapse in={openMyBooking}>
                          <div>
                            <Link className="profile" to={nameLink}>
                              <div class="dropdown-item">
                                <BookTwoToneIcon /> My Booking{" "}
                              </div>
                            </Link>
                          </div>
                        </Collapse>

                        <Collapse in={openManageLink}>
                          <div>
                            <Link className="profile" to={nameLink}>
                              <div class="dropdown-item">
                                <MdManageAccounts /> Manage{" "}
                              </div>
                            </Link>
                          </div>
                        </Collapse>
                      </ul>
                    </div>
                  ) : (
                    <div class="guest">Guest</div>
                  )}
                </div>
              </div>

              <div className="wallet">
                {user ? (
                  <div className="wallet-part">
                    <div className="iconWallet">
                      <FaWallet />
                    </div>
                    <div className="numberWallet">
                      {myWallet.map((data, index) => {
                        const showUserWallet = formatCurrency(data?.wallet);
                        return (
                          <div>{showWallet ? "********" : showUserWallet + " VND"}</div>
                        );
                      })}
                    </div>
                    <div className="iconEye" onClick={toggleWallet}>
                      {showWallet ? <FaEye /> : <FaEyeSlash />}
                    </div>
                  </div>
                ) : (
                  <div class="guest"></div>
                )}
              </div>
            </div>

            <div className="btnLogout">
              {user ? (
                <button onClick={handleLogout} className="login-button">
                  Logout
                </button>
              ) : (
                <div>
                  <Link className="login-button" to="login">
                    Login
                  </Link>
                </div>
              )}
            </div>
          </div>

          <div className="bar_btn" onClick={toggleMenu}>
            <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
          </div>
        </div>
        <div className={`dropdown_menu ${isOpen ? "open" : ""}`}>
          <li>
            <Link className="link" to="/" style={{ color: "black" }}>
              Home
            </Link>
          </li>
          <li>
            <Link className="link" to="/booking" style={{ color: "black" }}>
              Booking
            </Link>
          </li>
          <li>
            <Link
              className="link"
              to="/serviceslist"
              style={{ color: "black" }}
            >
              Service
            </Link>
          </li>

          <li>
            <div className="wallet2">
              <div className="iconWallet">
                <FaWallet />
              </div>
              <div className="numberWallet">
                {myWallet.map((data) => {
                  const showUserWallet = formatCurrency(data?.wallet);
                  return (
                    <div>{showWallet ? "********" : showUserWallet + " VND"}</div>
                  );
                })}
              </div>
              <div className="iconEye" onClick={toggleWallet}>
                {showWallet ? <FaEye /> : <FaEyeSlash />}
              </div>
            </div>
          </li>

          <li>
            <div className="userIcon">
              <img src="userIcon.png" alt="userIcon" />
              <div />
              <div class="dropdown">
                {user ? (
                  <div>
                    <div
                      class="btn username btn-7sm "
                      style={{ color: "black" }}
                      type="button"
                      data-bs-toggle="dropdown"
                    >
                      {user?.name}
                    </div>
                    <ul
                      class="dropdown-menu container-fluid p-0"
                      aria-labelledby="dropdownMenu2"
                      style={{ color: "black" }}
                    >
                      <Link className="profile" to="/userprofile">
                        <div class="dropdown-item">
                          <ImProfile /> Profile
                        </div>
                      </Link>
                      <Link className="profile" to="/changepassword">
                        <div class="dropdown-item">
                          <MdOutlineChangeCircle /> Password
                        </div>
                      </Link>

                      <Collapse in={openMyBooking}>
                        <div>
                          <Link className="profile" to={nameLink}>
                            <div class="dropdown-item">
                              <BookTwoToneIcon /> My Booking{" "}
                            </div>
                          </Link>
                        </div>
                      </Collapse>

                      <Collapse in={openManageLink}>
                        <div>
                          <Link className="profile" to={nameLink}>
                            <div class="dropdown-item">
                              <MdManageAccounts /> Manage{" "}
                            </div>
                          </Link>
                        </div>
                      </Collapse>
                    </ul>
                  </div>
                ) : (
                  <div class="guest" style={{ color: "black" }}>
                    Guest
                  </div>
                )}
              </div>
            </div>

            <div>
              <div>
                {user ? (
                  <div
                    onClick={handleLogout}
                    className="login-button"
                    style={{ color: "black" }}
                  >
                    Logout
                  </div>
                ) : (
                  <div>
                    <Link
                      className="login-button"
                      to="login"
                      style={{ color: "black" }}
                    >
                      Login
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </li>
        </div>
      </div>
    </div>
  );
};
export default Header;
