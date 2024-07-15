import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import SummaryApi from "../../common";
import { toast } from "react-toastify";
import Context from "../../context";
import { setUserDetails } from "../../store/userSlice";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDMF5sjf2c4h2fl5RGVbZYHWY_LCAvIocc",
  authDomain: "login-58187.firebaseapp.com",
  projectId: "login-58187",
  storageBucket: "login-58187.appspot.com",
  messagingSenderId: "329617442969",
  appId: "1:329617442969:web:04af9b386c1b8336751008"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = 'en';
const provider = new GoogleAuthProvider();

const Login = () => {
  const signIn = useSignIn();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { fetchUserDetails } = useContext(Context);
  const [showPassword, setShowPassword] = useState(false);

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
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        dispatch(setUserDetails({ name: user.displayName, email: user.email, role: "CUSTOMER" }));
        toast.success("Sign in with your Google account successfully")
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
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
            <div className="checkbox">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={toggleShowPassword}
              />
              Show Password
            </div>
            <Link
              to="/forgotpassword"
              className="block w-fit ml-auto hover:underline"
            >
              Forgot password?
            </Link>
            <button className="btnn">Sign In</button>
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
              <p>Register with your personal details to use all of site features</p>
              <button className="btnn" id="register" onClick={handleRegisterClick}>
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
