const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userProfileSchema = new Schema({
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


const userProfileModel =  mongoose.model("Profile",userProfileSchema)


module.exports = userProfileModel