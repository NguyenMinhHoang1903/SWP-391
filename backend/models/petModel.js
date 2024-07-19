const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const petSchema = new Schema({
    userName: {
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
    weight: {
        type: Number,
        required: true 
    },
}, { timestamps: true });

const pet = mongoose.model('Pet', petSchema);
module.exports = pet;