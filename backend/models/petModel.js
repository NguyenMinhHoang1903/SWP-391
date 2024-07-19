const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const petSchema = new Schema({
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

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    pets: [petSchema]
}, { timestamps: true });

const OwnPet = mongoose.model('Pet', userSchema);
module.exports = OwnPet;
