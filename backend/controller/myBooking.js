const Booking = require('../models/bookingModel');

const allMyBooking = async (req, res) => {
  try{
    const allBooking = await Booking.find()
    
    res.json({
        message : "All User ",
        data : allBooking,
        success : true,
        error : false
    })
}catch(err){
    res.status(400).json({
        message : err.message || err,
        error : true,
        success : false
    })
}
};

module.exports = {
  allMyBooking,
};
