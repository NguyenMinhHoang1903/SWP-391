const express = require('express')
const router = express.Router()

const userSignUpController = require('../controller/userSignUp')
const userSignInController = require('../controller/userSignIn')
const userDetailsController = require('../controller/userDetails')
const authToken = require('../middleware/authToken')
const userLogout = require('../controller/userLogout')
const generateOTP = require('../controller/generateOTP')
const verifyUser = require('../controller/generateOTP')
const localVariables = require('../middleware/localVariables')
const allUsers = require('../controller/allUser')
const deleteUser = require('../controller/deleteUser')
const updateUser = require('../controller/updateUser')
const updatePassword = require('../controller/changePassword')
const updateProfile = require('../controller/updateProfile')

// Booking Import
const booking = require('../controller/booking');

// Google Login
const userGoogleLogin = require('../controller/googleauth')
const userGoogleLoginFaile = require('../controller/googleauth')
const userGoogle = require('../controller/googleauth')
const userGoogleCallBack = require('../controller/googleauth')

router.post("/signup",userSignUpController)
router.post("/signin",userSignInController)
router.get("/user-details",authToken,userDetailsController)
router.get("/userLogout",userLogout)
router.get('/generateOTP', verifyUser,localVariables, generateOTP)
router.get("/all-user",authToken,allUsers)
router.delete('/delete-user',deleteUser);
router.post("/update-user", updateUser);
router.post("/update-password", updatePassword);
router.post("/update-profile", updateProfile)

// router Google
router.get("/login/success",userGoogleLogin)
router.get("/login/failed",userGoogleLoginFaile)
router.get("/google",userGoogle)
router.get("/google/callback",userGoogleCallBack)

// Booking Router
router.post('/create', booking.createBooking);

module.exports = router