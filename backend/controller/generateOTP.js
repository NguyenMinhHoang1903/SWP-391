
const userModel = require('../models/userModel')
const otpGenerator = require('otp-generator')
 async function generateOTP(res,req){
    req.app.locals.OTP = await otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false})
    res.status(201).send({code: req.app.locals.OTP })

}
module.exports = generateOTP

 async function verifyOTP(res,req){
    const { code } = req.query;
    if(parseInt(req.app.locals.OTP) === parseInt(code)){
        req.app.locals.OTP = null;
        req.app.locals.resetSession = true;
        return res.status(201).send({ msg: 'Verify Successfully!'})
    }
    return res.status(400).send({ error: "Invalid OTP"})
}
module.exports = verifyOTP

 async function verifyUser(req, res, next){
    try {
        
        const { name } = req.method == "GET" ? req.query : req.body;

        // check the user existance
        let exist = await userModel.findOne({ name });
        if(!exist) return res.status(404).send({ error : "Can't find User!"});
        next();

    } catch (error) {
        return res.status(404).send({ error: "Authentication Error"});
    }
}
module.exports = verifyUser