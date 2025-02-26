const userModel = require('../models/userModel')
const bcrypt = require('bcryptjs');


async function userSignUpController(req,res){
    try{
        const { password, name, email} = req.body

        const user = await userModel.findOne({name})

        console.log("user",user)

        if(user){
            throw new Error("Already user existed.")
        }

        const existEmail = await userModel.findOne({email})

        console.log("Email",existEmail)
        
        if(existEmail){
            throw new Error ("Already Email existed.")
        }
        
        if(!email){
            throw new Error("Please provide email")
        }
        if(!name){
            throw new Error("Please provide name")
        }

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hashSync(password, salt);

        if(!hashPassword){
            throw new Error("Something is wrong")
        }

        const payload = {
            ...req.body,
            role : "CUSTOMER",
            status : "ACTIVE",
            password : hashPassword
        }

        const userData = new userModel(payload)
        const saveUser = await userData.save()

        res.status(201).json({
            data : saveUser,
            success : true,
            error : false,
            message : "User created Successfully!"
        })


    }catch(err){
        res.json({
            message : err.message || err  ,
            error : true,
            success : false,
        })
    }
}

module.exports = userSignUpController