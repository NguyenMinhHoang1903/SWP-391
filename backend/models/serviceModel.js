const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    priceByWeight: {
        type: Array,
        required: true 
    },
    desc: {
        type: String,
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
}, { timestamps: true });

const Service = mongoose.model('Service', serviceSchema);


module.exports = Service;