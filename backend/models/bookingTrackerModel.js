const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingTrackerSchema = new Schema({
    tracker: {
        type: Array,
        required: true 
    },
}, { timestamps: true });

const Booking = mongoose.model('BookingTracker', bookingTrackerSchema);


module.exports = Booking;