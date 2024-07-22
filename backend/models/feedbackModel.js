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
    servicesRating: {
        type: Array,
    },
    comboRating: {
        type: Object,
    },
    comment: {
        type: String,
    },
}, { timestamps: true });

const Feedback = mongoose.model('Feedback', feedbackSchema);


module.exports = Feedback;