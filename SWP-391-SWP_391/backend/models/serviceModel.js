const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
    id: {
        type: Number,
        required: true 
    },
    name: {
        type: String,
        required: true 
    },
    price: {
        type: Number,
        required: true 
    }
}, { timestamps: true });

const Service = mongoose.model('Service', serviceSchema);


module.exports = Service;