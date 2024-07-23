import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import SummaryApi from "../../common";
import { toast } from "react-toastify";
import Context from "../../context";
import { setUserDetails } from "../../store/userSlice";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyATtcnryN20LxyhcgRgh4eVyVVzPOVQ_fU",
  authDomain: "pet-spa---swp391.firebaseapp.com",
  projectId: "pet-spa---swp391",
  storageBucket: "pet-spa---swp391.appspot.com",
  messagingSenderId: "349131660919",
  appId: "1:349131660919:web:a7ec8626ad3a07c6faf072",
  measurementId: "G-MVVZK4PHLY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = "en";
const provider = new GoogleAuthProvider();

const Login = () => {
  const signIn = useSignIn();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { fetchUserDetails } = useContext(Context);
  const [showPassword, setShowPassword] = useState(false);
  const [capVal, setCapVal] = useState(null);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Chang login and register
  const [isActive, setIsActive] = useState(false);

  const handleRegisterClick = () => {
    setIsActive(true);
  };

  const handleLoginClick = () => {
    setIsActive(false);
  };

  // Enter user name and password
  const [data, setData] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const API_KEY = "baad659508684e57832c13e81b63d551";
    const BASE_URL = "https://api.zerobounce.net/v2/validate";
    const email = data.email;

    try {
      const response = await axios.get(BASE_URL, {
        params: {
          api_key: API_KEY,
          email: email,
        },
      });
      console.log(response);
      if (response.data.status === "invalid") {
        toast.error("Invalid email address or domain");
        return;
      }
    } catch (error) {
      console.error("Error validating email:", error);
      throw error;
    }

    if (data.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!emailRegex.test(data.email)) {
      toast.error("Please enter a valid email address ending with @gmail.com");
      return;
    }
    if (data.password === data.confirmPassword) {
      const dataResponse = await fetch(SummaryApi.signUp.url, {
        method: SummaryApi.signUp.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const dataApi = await dataResponse.json();
      if (dataApi.success) {
        toast.success(dataApi.message);
      }
      if (dataApi.error) {
        toast.error(dataApi.message);
      }
    } else {
      toast.error("Please check password and confirm password");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const dataResponseLogin = await fetch(SummaryApi.signIn.url, {
      method: SummaryApi.signIn.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const dataApiLogin = await dataResponseLogin.json();
    if (dataApiLogin.success) {
      // When login successfully, create a cookie
      signIn({
        auth: {
          token: dataApiLogin.data,
          type: "Bearer",
        },
      });
      toast.success(dataApiLogin.message);
      navigate("/");
      fetchUserDetails();
    }
    if (dataApiLogin.error) {
      toast.error(dataApiLogin.message);
    }
  };

  const handleGoogleLogin = () => {
    signOut(auth).then(() => {
      signInWithPopup(auth, provider)
        .then((result) => {
          const user = result.user;
          dispatch(
            setUserDetails({
              name: user.displayName,
              email: user.email,
              role: "CUSTOMER",
            })
          );
          // Save Google user details to the backend
          axios
            .post("http://localhost:5000/api/saveGoogle", {
              name: user.displayName,
              email: user.email,
              googleId: user.uid,
            })
            .then((response) => {
              console.log("Server response:", response); // Debug log
              toast.success("Sign in with your Google account successfully");
              navigate("/");
            })
            .catch((error) => {
              if (error.response) {
                // Server responded with a status other than 2xx
                console.error("Axios error response:", error.response);
                toast.error(
                  `Failed to save user details: ${error.response.data.message}`
                );
              } else if (error.request) {
                // No response received
                console.error("Axios error request:", error.request);
                toast.error(
                  "Failed to save user details: No response from server"
                );
              } else {
                // Other errors
                console.error("Axios error message:", error.message);
                toast.error(`Failed to save user details: ${error.message}`);
              }
            });
        })
        .catch((error) => {
          toast.error(error.message);
        });
    });
  };

  return (
    <body className="loginBody">
      <div
        id="containerLogin"
        className={`containerLogin ${isActive ? "active" : ""}`}
      >
        <div className="form-containerLogin Loginsign-up">
          <form onSubmit={handleSubmit}>
            <h1>Register</h1>
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              value={data.email}
              onChange={handleOnChange}
              required
            />
            <input
              type="text"
              placeholder="Enter User Name"
              name="name"
              value={data.name}
              onChange={handleOnChange}
              required
            />
            <input
              type={showPassword ? "text" : "password"}
              value={data.password}
              name="password"
              onChange={handleOnChange}
              placeholder="Enter your password"
              required
            />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={data.confirmPassword}
              name="confirmPassword"
              onChange={handleOnChange}
              required
            />
            <div className="checkbox">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={toggleShowPassword}
              />
              Show Password
            </div>
            <button className="btnn">Sign Up</button>
          </form>
        </div>
        <div className="form-containerLogin Loginsign-in">
          <form onSubmit={handleLogin}>
            <h1>Sign In</h1>
            <div className="loginContainer" onClick={handleGoogleLogin}>
              <img src="Google_Icons.png" alt="Google Icon" />
              <div className="title">Login with Google</div>
            </div>
            <span>or use your account</span>
            <input
              type="text"
              placeholder="User Name"
              name="name"
              value={data.name}
              onChange={handleOnChange}
            />
            <input
              type={showPassword ? "text" : "password"}
              value={data.password}
              name="password"
              onChange={handleOnChange}
              placeholder="Enter your password"
            />
            <ReCAPTCHA
              sitekey="6LcK-BEqAAAAADJxdIF5CVMyPVVH_xumF3we_0zW"
              onChange={(val) => setCapVal(val)}
            />
            ,
            <div className="checkbox">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={toggleShowPassword}
              />
              <div style={{ fontSize: "10" }}>Show Password</div>
            </div>
            <Link
              to="/forgotpassword"
              className="block w-fit ml-auto hover:underline"
            >
              Forgot password?
            </Link>
            <button disabled={!capVal} className="btnn">
              Sign In
            </button>
          </form>
        </div>
        <div className="toggle-containerLogin">
          <div className="Logintoggle">
            <div className="toggle-panelLogin Logintoggle-left">
              <h1>Welcome Back!</h1>
              <p>Enter your personal details to use all of site features</p>
              <button className="btnn" id="login" onClick={handleLoginClick}>
                Sign In
              </button>
            </div>
            <div className="toggle-panelLogin Logintoggle-right">
              <h1>Hello, Friend!</h1>
              <p>
                Register with your personal details to use all of site features
              </p>
              <button
                className="btnn"
                id="register"
                onClick={handleRegisterClick}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
};

export default Login;
