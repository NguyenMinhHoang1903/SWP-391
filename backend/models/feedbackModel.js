const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
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