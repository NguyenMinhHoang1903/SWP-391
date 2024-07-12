import "./App.css";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider, useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "./store/userSlice";
import { store } from "./store/store";
import { Toaster } from "react-hot-toast";
import { Container } from "react-bootstrap";
import SummaryApi from "./common";
import Context from "./context";
import { Loader } from "./loader/Loader";
import ShowListCombo from "./components/services/ShowListCombo";
import ShowListService from "./components/services/ShowListService";

// Components
const Header = lazy(() => import("./components/layouts/Header"));
const Booking = lazy(() => import("./components/template/Booking"));
const Feedback = lazy(() => import("./components/feedback/Feedback"));
const Login = lazy(() => import("./components/template/Login"));
const ForgotPassword = lazy(() =>
  import("./components/template/ForgotPassword")
);
const ManageStaff = lazy(() => import("./components/manageAccount/manage"));
const UpdateStaff = lazy(() =>
  import("./components/manageAccount/updateStaff")
);
const HairDye = lazy(() => import("./components/details/HairDye"));
const TrimFur = lazy(() => import("./components/details/TrimFur"));
const CutNails = lazy(() => import("./components/details/CutNails"));
const ManageService = lazy(() =>
  import("./components/manageService/ManageService")
);
const AddService = lazy(() => import("./components/manageService/AddService"));
const UpdateService = lazy(() =>
  import("./components/manageService/UpdateService")
);
const ManageCombo = lazy(() => import("./components/manageCombo/ManageCombo"));
const AddCombo = lazy(() => import("./components/manageCombo/AddCombo"));
const UpdateCombo = lazy(() => import("./components/manageCombo/UpdateCombo"));

const UserProfile = lazy(() => import("./components/template/UserProfile"));
const Washing = lazy(() => import("./components/details/Washing"));
const Spinner = lazy(() => import("./components/Spinner/Spinner"));
const OTPVerification = lazy(() =>
  import("./components/template/OTPVerification")
);
const ChangePassword = lazy(() =>
  import("./components/template/ChangePassword")
);
const SpeedDialBox = lazy(() => import("./components/layouts/SpeedDialBox"));

const BookingDetail = lazy(() => import("./components/template/BookingDetail"));
const ManageBooking = lazy(() => import("./components/manageBooking/ManageBooking"));
const ManageBookingDetail = lazy(() => import("./components/manageBooking/bookingDetail"));
const MyBookingList = lazy(() => import("./components/myBooking/bookingList"))
const MyBookingDetail = lazy(() => import("./components/myBooking/bookingDetail"));
const UpdateBooking = lazy(() => import("./components/manageBooking/updateBooking"));

const Refund = lazy(() => import("./components/template/Refund"));
const ManageRefund = lazy(() => import("./components/manageRefund/ManageRefund"));

const Home = lazy(() => import("./components/template/Home"));
const Footer = lazy(() => import("./components/layouts/Footer"));

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

  const CustomerRoute = ({ children }) => {
    return user?.role === "CUSTOMER" ? children : <Navigate to="/" />;
  };

  const AdminRoute = ({ children }) => {
    return user?.role === "ADMIN" ? children : <Navigate to="/" />;
  };

  const StaffRoute = ({ children }) => {
    return user?.role === "STAFF" ? children : <Navigate to="/" />;
  };

  const ManagerRoute = ({ children }) => {
    return user?.role === "MANAGER" ? children : <Navigate to="/" />;
  };

  const ErrorElement = () => (
    <Container>
      <div style={{ marginTop: 200, marginBottom: 200 }}>
        <h1 className="text-center">SORRY</h1>
        <h2 className="text-center">We couldn't find that page</h2>
        <h2 className="text-center">
          Try going to <Link to="/">Pet Spa's home page</Link>
        </h2>
      </div>
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
                <Suspense fallback={<Loader />}>
                  <Header />
                </Suspense>

                <Routes>
                  {/* Public Routes */}
                  <Route
                    path="/"
                    element={
                      <Suspense fallback={<Loader />}>
                        <Home />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/serviceslist"
                    element={
                      <Suspense fallback={<Loader />}>
                        <ShowListService />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/serviceslist"
                    element={
                      <Suspense fallback={<Loader />}>
                        <ShowListCombo />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/login"
                    element={
                      <Suspense fallback={<Loader />}>
                        <Login />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/feedback"
                    element={
                      <Suspense fallback={<Loader />}>
                        <Feedback />
                      </Suspense>
                    }
                  />

                  {/* Protected Routes */}
                  <Route
                    path="/booking"
                    element={
                      <Suspense fallback={<Loader />}>
                        <CustomerRoute>
                          <Suspense fallback={<Loader />}>
                            <Booking />
                          </Suspense>
                        </CustomerRoute>
                      </Suspense>
                    }
                  />
                  <Route
                    path="/userprofile"
                    element={
                      <Suspense fallback={<Loader />}>
                        <PrivateRoute>
                          <Suspense fallback={<Loader />}>
                            <UserProfile />
                          </Suspense>
                        </PrivateRoute>
                      </Suspense>
                    }
                  />
                  <Route
                    path="/changepassword"
                    element={
                      <Suspense fallback={<Loader />}>
                        <PrivateRoute>
                          <Suspense fallback={<Loader />}>
                            <ChangePassword />
                          </Suspense>
                        </PrivateRoute>
                      </Suspense>
                    }
                  />
                  <Route
                    path="/otpverificate"
                    element={
                      <Suspense fallback={<Loader />}>
                        <PrivateRoute>
                          <Suspense fallback={<Loader />}>
                            <OTPVerification />
                          </Suspense>PrivateRoute
                        </PrivateRoute>
                      </Suspense>
                    }
                  />
                  <Route
                    path="/forgotpassword"
                    element={
                      <Suspense fallback={<Loader />}>
                        <Suspense fallback={<Loader />}>
                          <ForgotPassword />
                        </Suspense>
                      </Suspense>
                    }
                  />
                  <Route
                    path="/bookingDetail"
                    element={
                      <Suspense fallback={<Loader />}>
                        <PrivateRoute>
                          <Suspense fallback={<Loader />}>
                            <BookingDetail />
                          </Suspense>
                        </PrivateRoute>
                      </Suspense>
                    }
                  />

                  <Route
                    path="/myBookingList"
                    element={
                      <Suspense fallback={<Loader />}>
                        <PrivateRoute>
                          <Suspense fallback={<Loader />}>
                            <MyBookingList />
                          </Suspense>
                        </PrivateRoute>
                      </Suspense>
                    }
                  />

                  <Route
                    path="/mybooking"
                    element={
                      <Suspense fallback={<Loader />}>
                        <PrivateRoute>
                          <Suspense fallback={<Loader />}>
                            <MyBookingDetail />
                          </Suspense>
                        </PrivateRoute>
                      </Suspense>
                    }
                  />

                  <Route
                    path="/manageBooking"
                    element={
                      <Suspense fallback={<Loader />}>
                        <StaffRoute>
                          <Suspense fallback={<Loader />}>
                            <ManageBooking />
                          </Suspense>
                        </StaffRoute>
                      </Suspense>
                    }
                  />

                  <Route
                    path="/ManageBookingDetail"
                    element={
                      <Suspense fallback={<Loader />}>
                        <PrivateRoute>
                          <Suspense fallback={<Loader />}>
                            <ManageBookingDetail />
                          </Suspense>
                        </PrivateRoute>
                      </Suspense>
                    }
                  />

                  <Route
                    path="/updateBooking"
                    element={
                      <Suspense fallback={<Loader />}>
                        <ManagerRoute>
                          <Suspense fallback={<Loader />}>
                            <UpdateBooking />
                          </Suspense>
                        </ManagerRoute>
                      </Suspense>
                    }
                  />

                  <Route
                    path="/refund"
                    element={
                      <Suspense fallback={<Loader />}>
                        <PrivateRoute>
                          <Suspense fallback={<Loader />}>
                            <Refund />
                          </Suspense>
                        </PrivateRoute>
                      </Suspense>
                    }
                  />

                  <Route
                    path="/manageRefund"
                    element={
                      <Suspense fallback={<Loader />}>
                        <PrivateRoute>
                          <Suspense fallback={<Loader />}>
                            <ManageRefund />
                          </Suspense>
                        </PrivateRoute>
                      </Suspense>
                    }
                  />

                  <Route
                    path="/washingservice"
                    element={
                      <Suspense fallback={<Loader />}>
                        <PrivateRoute>
                          <Suspense fallback={<Loader />}>
                            <Washing />
                          </Suspense>
                        </PrivateRoute>
                      </Suspense>
                    }
                  />
                  <Route
                    path="/hairdyeservice"
                    element={
                      <Suspense fallback={<Loader />}>
                        <PrivateRoute>
                          <Suspense fallback={<Loader />}>
                            <HairDye />
                          </Suspense>
                        </PrivateRoute>
                      </Suspense>
                    }
                  />
                  <Route
                    path="/trimfurservice"
                    element={
                      <Suspense fallback={<Loader />}>
                        <PrivateRoute>
                          <Suspense fallback={<Loader />}>
                            <TrimFur />
                          </Suspense>
                        </PrivateRoute>
                      </Suspense>
                    }
                  />
                  <Route
                    path="/cutnailservice"
                    element={
                      <Suspense fallback={<Loader />}>
                        <PrivateRoute>
                          <CutNails />
                        </PrivateRoute>
                      </Suspense>
                    }
                  />

                  <Route
                    path="/manageStaff"
                    element={
                      <Suspense fallback={<Loader />}>
                        <AdminRoute>
                          <Suspense fallback={<Loader />}>
                            <ManageStaff />
                          </Suspense>
                        </AdminRoute>
                      </Suspense>
                    }
                  />
                  <Route
                    path="/update"
                    element={
                      <Suspense fallback={<Loader />}>
                        <AdminRoute>
                          <Suspense fallback={<Loader />}>
                            <UpdateStaff />
                          </Suspense>
                        </AdminRoute>
                      </Suspense>
                    }
                  />

                  <Route
                    path="/manageService"
                    element={
                      <Suspense fallback={<Loader />}>
                        <ManagerRoute>
                          <Suspense fallback={<Loader />}>
                            <ManageService />
                          </Suspense>
                        </ManagerRoute>
                      </Suspense>
                    }
                  />
                  <Route
                    path="/addService"
                    element={
                      <Suspense fallback={<Loader />}>
                        <ManagerRoute>
                          <Suspense fallback={<Loader />}>
                            <AddService />
                          </Suspense>
                        </ManagerRoute>
                      </Suspense>
                    }
                  />
                  <Route
                    path="/updateService/:oldName"
                    element={
                      <Suspense fallback={<Loader />}>
                        <ManagerRoute>
                          <Suspense fallback={<Loader />}>
                            <UpdateService />
                          </Suspense>
                        </ManagerRoute>
                      </Suspense>
                    }
                  />

                  <Route
                    path="/manageCombo"
                    element={
                      <Suspense fallback={<Loader />}>
                        <ManagerRoute>
                          <Suspense fallback={<Loader />}>
                            <ManageCombo />
                          </Suspense>
                        </ManagerRoute>
                      </Suspense>
                    }
                  />
                  <Route
                    path="/addCombo"
                    element={
                      <Suspense fallback={<Loader />}>
                        <ManagerRoute>
                          <Suspense fallback={<Loader />}>
                            <AddCombo />
                          </Suspense>
                        </ManagerRoute>
                      </Suspense>
                    }
                  />
                  <Route
                    path="/updateCombo/:name"
                    element={
                      <Suspense fallback={<Loader />}>
                        <ManagerRoute>
                          <Suspense fallback={<Loader />}>
                            <UpdateCombo />
                          </Suspense>
                        </ManagerRoute>
                      </Suspense>
                    }
                  />

                  {/* 404 Page */}
                  <Route
                    path="*"
                    element={
                      <Suspense fallback={<Loader />}>
                        <ErrorElement />
                      </Suspense>
                    }
                  />
                </Routes>
                <Suspense fallback={<Loader />}>
                  <Footer />
                </Suspense>

                <Suspense fallback={<Loader />}>
                  <SpeedDialBox />
                </Suspense>

              </Context.Provider>
            </>
          )}
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
