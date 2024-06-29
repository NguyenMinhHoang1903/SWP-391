const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const comboSchema = new Schema({
    comboId: {
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
    },
    serviceId: {
        type: Array,
        required: true
    },
}, { timestamps: true });

const Combo = mongoose.model('Combo', comboSchema);


module.exports = Combo;