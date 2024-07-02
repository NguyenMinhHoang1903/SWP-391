import "./App.css";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Footer from "./components/layouts/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider, useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "./store/userSlice";
import { store } from "./store/store";
import { Toaster } from "react-hot-toast";
import { Container } from "react-bootstrap";
import SummaryApi from "./common";
import Context from "./context";
// Components
import Login from "./components/template/Login";
import Home from "./components/template/Home";
import Header from "./components/layouts/Header";
import Booking from "./components/template/Booking";
import ForgotPassword from "./components/template/ForgotPassword";
import ManageStaff from "./components/manageStaff/manage";
import UpdateStaff from "./components/manageStaff/updateStaff";
import HairDye from "./components/details/HairDye";
import TrimFur from "./components/details/TrimFur";
import CutNails from "./components/details/Cutnails";
import ManageService from "./components/manageService/ManageService";
import AddService from "./components/manageService/AddService";
import UpdateService from "./components/manageService/UpdateService";
import ManageCombo from "./components/manageCombo/ManageCombo";
import AddCombo from "./components/manageCombo/AddCombo";
import UpdateCombo from "./components/manageCombo/UpdateCombo";
import Feedback from "./components/feedback/Feedback";
import TransactionHistory from "./components/transactionHistory/TransactionHistory";
import ExerciseSpaShop from "./components/services/ExerciseSpaShop";
import UserProfile from "./components/template/UserProfile";
import Washing from "./components/details/Washing";
import Spinner from "./components/Spinner/Spinner";
import OTPVerification from "./components/template/OTPVerification";
import ChangePassword from "./components/template/ChangPassWord";
import SpeedDialBox from "./components/layouts/SpeedDialBox";
import BookingDetail from "./components/template/BookoingDetail";

function App() {
  // Get user from store
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();

  const fetchUserDetails = async () => {
    const dataResponse = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      credentials: "include",
    });
    const dataApi = await dataResponse.json();
    if (dataApi.success) {
      dispatch(setUserDetails(dataApi.data));
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [dispatch]);

  // Spinner
  const [spinnerLoader, setSpinnerLoader] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setSpinnerLoader(false);
    }, 2000);
  }, []);

  const PrivateRoute = ({ children }) => {
    return user ? children : <Navigate to="/login" />;
  };

  const AdminRoute = ({ children }) => {
    return user?.role === "ADMIN" ? children : <Navigate to="/" />;
  };

  const ErrorElement = () => (
    <Container>
      <h1 className="text-center">SORRY</h1>
      <h2 className="text-center">We couldn't find that page</h2>
      <h2 className="text-center">
        Try going to <Link to="/">Pet Spa's home page</Link>
      </h2>
    </Container>
  );

  return (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          {spinnerLoader ? (
            <Spinner />
          ) : (
            <>
              <Toaster position="top-right" />
              <Context.Provider value={{ fetchUserDetails }}>
                <ToastContainer />
                <Header />
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/serviceslist" element={<ExerciseSpaShop />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/feedback" element={<Feedback />} />

                  {/* Protected Routes */}
                  <Route
                    path="/booking"
                    element={
                      <PrivateRoute>
                        <Booking />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/userprofile"
                    element={
                      <PrivateRoute>
                        <UserProfile />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/changepassword"
                    element={
                      <PrivateRoute>
                        <ChangePassword />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/otpverificate"
                    element={
                      <PrivateRoute>
                        <OTPVerification />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/forgotpassword"
                    element={
                      <PrivateRoute>
                        <ForgotPassword />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/bookingDetail"
                    element={
                      <PrivateRoute>
                        <BookingDetail />
                      </PrivateRoute>
                    }
                  />

                  {/* Service List */}
                  <Route path="/washingservice" element={<PrivateRoute><Washing /></PrivateRoute>} />
                  <Route path="/hairdyeservice" element={<PrivateRoute><HairDye /></PrivateRoute>} />
                  <Route path="/trimfurservice" element={<PrivateRoute><TrimFur /></PrivateRoute>} />
                  <Route path="/cutnailservice" element={<PrivateRoute><CutNails /></PrivateRoute>} />

                  {/* Manage Staff */}
                  <Route path="/manageStaff" element={<AdminRoute><ManageStaff /></AdminRoute>} />
                  <Route path="/update" element={<AdminRoute><UpdateStaff /></AdminRoute>} />

                  {/* Manage Service */}
                  <Route path="/manageService" element={<AdminRoute><ManageService /></AdminRoute>} />
                  <Route path="/addService" element={<AdminRoute><AddService /></AdminRoute>} />
                  <Route path="/updateService" element={<AdminRoute><UpdateService /></AdminRoute>} />

                  {/* Manage Combo */}
                  <Route path="/manageCombo" element={<AdminRoute><ManageCombo /></AdminRoute>} />
                  <Route path="/addCombo" element={<AdminRoute><AddCombo /></AdminRoute>} />
                  <Route path="/updateCombo" element={<AdminRoute><UpdateCombo /></AdminRoute>} />

                  {/* Transaction History */}
                  <Route path="/transactionHistory" element={<PrivateRoute><TransactionHistory /></PrivateRoute>} />

                  {/* 404 Page */}
                  <Route path="*" element={<ErrorElement />} />
                </Routes>
                <Footer />
                <SpeedDialBox />
              </Context.Provider>
            </>
          )}
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
