const Refund = require('../models/refundModel');

const allListRefund = async (req, res) => {
    try {
        const allRefundUser = await Refund.find()

        res.json({
            message: "All User ",
            data: allRefundUser,
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
};

module.exports = {
    allListRefund,
};
