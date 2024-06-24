const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken');

async function userSignInController(req,res){
    try{
        const {name,password} = req.body
        if(!password){
            throw new Error("Please provide password")
        }
        if(!name){
            throw new Error("Please provide name")
        }

        const user = await userModel.findOne({name})

        if(!user){
            throw new Error ("User not found")
        }

        const onepassword = await userModel.findOne({password})

        if(onepassword){
            throw new Error ("Wrong password")
        }
  

        const checkPassword = await bcrypt.compare(password,user.password)

        if(checkPassword){
            const tokenData = {
                _id : user._id,
                name : user.name,
            }
            const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 * 8 });
            const tokenOption = {
                httpOnly : true,
                secure : true
            }
             res.cookie("token",token,tokenOption).status(200).json({
                message : "Login Successfully",
                data : token,
                success : true,
                error : false
             })

        }else{
            throw new Error("Please check Password")
        }

    }catch(err){
        res.json({
            message : err.message || err  ,
            error : true,
            success : false,
        })
    }
}

module.exports = userSignInController 