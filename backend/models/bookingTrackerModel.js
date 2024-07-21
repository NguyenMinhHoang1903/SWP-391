const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingTrackerSchema = new Schema({
    year: {
        type: Number,
        required: true 
    },
    month: {
        type: Number,
        required: true 
    },
    date: {
        type: Number,
        required: true 
    },
    tracker: {
        type: Array,
        required: true 
    },
}, { timestamps: true });

const Booking = mongoose.model('BookingTracker', bookingTrackerSchema);


module.exports = Booking;