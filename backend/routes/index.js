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

// Booking Import
const booking = require('../controller/booking');

// Service Import
const service = require('../controller/service');

// Combo Import
const combo = require('../controller/combo');

// Feedback Import
const feedback = require('../controller/feedback');

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

// Booking Router
router.post('/bookings/create', booking.createBooking);
router.get('/bookings/read/:id', booking.readOneBooking);

// Service Router
router.get('/', service.indexService);
router.post('/services/create', service.createService);
router.get('/services/read', service.readAllService);
router.get('/services/read/:id', service.readOneService);
router.delete('/services/delete/:id', service.deleteOneService);
router.post('/services/update', service.updateOneService);

// Combo Router
router.get('/combos', combo.indexCombo);
router.post('/combos/create', combo.createCombo);
router.get('/combos/read', combo.readAllCombo);
router.get('/combos/readOne/:id', combo.readOneCombo);
router.get('/combos/read/:id', combo.readAllServiceOfCombo);
router.delete('/combos/delete/:id', combo.deleteOneCombo);
router.post('/combos/update', combo.updateOneCombo);

// Feedback Router
router.post('/feedbacks/create', feedback.createFeedback);

module.exports = router