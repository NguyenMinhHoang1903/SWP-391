const Booking = require("../models/bookingModel")

async function updateListBooking(req, res) {
    try {
        await Booking.updateOne({ _id: req.body.bookingId.toString() }, { $set: { status: req.body.status } })
        res.json({
            data: "",
            message: "Booking Updated",
            success: true,
            error: false
        })
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = updateListBooking 