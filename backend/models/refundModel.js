const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const refundSchema = new Schema({
    userName : {
        type: String,
    },
    bookingId : {
        type: String,  
    },
    reason : {
        type: String,
        required: true 
    },
    bank : {
        type: String,
        required: true 
    },
    bankNumber : {
        type: String,
        required: true
    },
    holder : {
        type: String,
        required: true
    },
    amount : {
        type: String,
        required: true
    },
    status : {
        type: String
    },
}, { timestamps: true });

const Refund = mongoose.model('Refund', refundSchema);


module.exports = Refund;