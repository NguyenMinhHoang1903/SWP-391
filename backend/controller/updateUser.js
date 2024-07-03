const userModel = require("../models/userModel")

async function updateUser(req, res) {
    try {
        await userModel.updateOne({ _id: req.body.userId.toString() }, { $set: { role: req.body.role } })
        res.json({
            data : "",
            message : "User Updated",
            success : true,
            error : false
        })
    }catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = updateUser