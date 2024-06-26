const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

async function userSignInController(req, res) {
    try {
        const { name, password } = req.body;

        if (!password) {
            return res.status(400).json({ message: "Please provide password", error: true, success: false });
        }
        if (!name) {
            return res.status(400).json({ message: "Please provide name", error: true, success: false });
        }

        const user = await userModel.findOne({ name });

        if (!user) {
            return res.status(404).json({ message: "User not found", error: true, success: false });
        }

        const checkPassword = await bcrypt.compare(password, user.password);

        if (!checkPassword) {
            return res.status(401).json({ message: "Wrong password", error: true, success: false });
        }

        const tokenData = {
            _id: user._id,
            name: user.name,
        };
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: '8h' });
        const tokenOption = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Ensure secure cookies only in production
        };

        res.cookie("token", token, tokenOption).status(200).json({
            message: "Login successfully",
            data: token,
            success: true,
            error: false
        });

    } catch (err) {
        res.status(500).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
}

module.exports = userSignInController;
