const jwt  = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const User_Model = require ("../model/user")

exports.register= async (req, res)=>{
    const user = req.body

    //check if user is in databse
    const user_exists = await User_Model.findOne({username:user.name})
    const mail_exists = await User_Model.findOne({email:user.email})

    if(user_exists || mail_exists){
        res.json({message:"An account already exists with the username or email"})
    }else{
        const hashPassword = await bcrypt.hash(req.body.password, 10)

        const newUser = new User_Model({
            username: user.name,
            email:user.email,
            password:hashPassword,
            company:user.company
        }).save(error=>{
            if(error){
                console.log(error)
                res.json({message:"Try again"})
            }else{
                res.json({status:"ok", message:"Success"})
            }
        })
    }
}