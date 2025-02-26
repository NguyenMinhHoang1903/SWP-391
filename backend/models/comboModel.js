const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const comboSchema = new Schema({
    name: {
        type: String,
        required: true 
    },
    price: {
        type: Number,
        required: true
    },
    desc: {
        type: String,
        required: true 
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
       type: Date,
        required: true,
    },
    serviceId: {
        type: Array,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    imageName: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
    },
    ratingNumber: {
        type: Number,
    },
}, { timestamps: true });

const Combo = mongoose.model('Combo', comboSchema);


module.exports = Combo;