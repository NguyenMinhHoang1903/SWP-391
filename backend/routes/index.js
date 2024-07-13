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
const updateProfile = require('../controller/updateProfile')
const updatePassword = require('../controller/changePassword')
const updateBooking = require('../controller/updateBooking')
const forgotPassword = require('../controller/forgotPassword')
const resetPassword = require('../controller/resetPassword')


// Booking Import
const booking = require('../controller/booking');
const refund = require('../controller/refund');

const myBooking = require('../controller/myBooking')
const listBooking = require('../controller/listBooking')

const listRefund = require('../controller/listRefund')


// Service Import
const service = require('../controller/service');

// Combo Import
const combo = require('../controller/combo');

// Feedback Import
const feedback = require('../controller/feedback');

// Booking Tracker import
const bookingTracker = require('../controller/bookingTracker');

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
router.post("/update-profile", updateProfile);
router.post("/update-password", updatePassword);

// Google Router 
router.get("/login/success",userGoogleLogin)
router.get("/login/failed",userGoogleLoginFaile)
router.get("/google",userGoogle)
router.get("/google/callback",userGoogleCallBack)

// ForgotPassword
router.post("/forgotpassword",forgotPassword)
router.post("/resetPassword/${token}",resetPassword)

// Booking Router
router.post('/bookings/create', booking.createBooking);
router.get('/bookings/read/:id', booking.readOneBooking);
router.get('/myBooking/read', myBooking.allMyBooking);
router.get('/myBooking/readOne/:id', myBooking.readOneBooking);
router.get('/listBooking/read', listBooking.allListBooking);
router.post("/update-booking", updateBooking);

// Refund Router
router.post('/refund/createOne/:id', refund.createRefund);
//router.get('/refund/read', refund.readAllRefund);
//router.get('/refund/readOne/:id', refund.readOneRefund);
router.get('/listRefund/read', listRefund.allListRefund);


// Service Router
router.get('/', service.indexService);
router.post('/services/create', service.createService);
router.get('/services/read', service.readAllService);
router.get('/services/read/:oldId', service.readOneService);
router.delete('/services/delete/:id', service.deleteOneService);
router.post('/services/update', service.updateOneService);

// Combo Router
router.get('/combos', combo.indexCombo);
router.post('/combos/create', combo.createCombo);
router.get('/combos/read', combo.readAllCombo);
router.get('/combos/readOne/:oldId', combo.readOneCombo);
router.get('/combos/read/:id', combo.readAllServiceOfCombo);
router.delete('/combos/delete/:id', combo.deleteOneCombo);
router.post('/combos/update', combo.updateOneCombo);

// Feedback Router
router.post('/feedbacks/create', feedback.createFeedback);

// Booking Tracker Router
router.get('/bookingTracker/track', bookingTracker.trackNumberStaffs);

module.exports = router