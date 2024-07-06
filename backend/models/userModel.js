const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    fullname: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String
    },
    status: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    dateOfBirth: {
        type: Date
    },
    gender: {
        type: String,
        enum: ['Male', 'Female']
    },
    address: {
        type: String
    }
},{
    timestamps : true
})


const userModel =  mongoose.model("user",userSchema)


module.exports = userModel