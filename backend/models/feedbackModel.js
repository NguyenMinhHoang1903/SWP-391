const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
    userName: {
        type: String,
        required: true 
    },
    email: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true 
    },
    comment: {
        type: String,
    },
}, { timestamps: true });

const Feedback = mongoose.model('Feedback', feedbackSchema);


module.exports = Feedback;