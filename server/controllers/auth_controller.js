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

exports.login = async (req,res)=>{
     const user = req.body

     //check if user exists in the db
     const user_exists = await User_Model.findOne({email:user.email})
     
     if(user_exists){
        //compare hashed passwords
        const passwordCheck = await bcrypt.compare(req.body.password, user_exists.password)
        if(!passwordCheck){
            res.json({
                message:"Invalid username / password"
            })
            
        }else{
            try {
                const token = jwt.sign(
                    {
                        id:user_exists._id,
                        username:user_exists.username,
                        email:user_exists.email
                    },process.env.JWT_SECRET,
                    {expiresIn:86400}
                )
                res.json({message:"ok",token:"Bearer" + token})
            } catch (error) {
                if(error){
                    console.log(error)
                    res.json({message:error})
                }
            }
        }
     }else{
        res.json({
            message:"Invalid username / password"
        })
     }

}