const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    userName: {
        type: String,
        required: true 
    },
    email: {
        type: String,
        required: true 
    },
    petName: {
        type: String,
        required: true 
    },
    petType: {
        type: String,
        required: true 
    },
    date: {
        type: Date,
        required: true 
    },
    weight: {
        type: Number,
        required: true 
    },
    services: {
        type: Array,
        required: true 
    },
    combo: {
        type: String,
    },
    total: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    paymentDate: {
        type: Date,
    }
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);


module.exports = Booking;