const jwt  = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const User_Model = require ("../model/user")

exports.register= async (req, res)=>{
    const user = req.body
 
    //check if user is in databse
    const user_exists = await User_Model.findOne({username:user.user})
    const mail_exists = await User_Model.findOne({email:user.email})

    if(user_exists || mail_exists){
        res.json({message:"An account already exists with the username or email"})
    }else{
        const hashPassword = await bcrypt.hash(req.body.password, 10)

        const newUser = new User_Model({
            username: user.user,
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
     const user_exists = await User_Model.findOne({email:user.user})
     
     if(user_exists){
        //compare hashed passwords
        await bcrypt.compare(user.password, user_exists.password).then(
            data=>{
                console.log(data)
                if(!data){
                    return res.json({
                        message:"Invalid Pass"
                    })
                }
                //sign jwt token
                try {
                            const token = jwt.sign(
                                {
                                    id:user_exists._id,
                                    username:user_exists.username,
                                    email:user_exists.email
                                },process.env.JWT_SECRET,
                                {expiresIn:86400}
                            )
                            return res.json({message:"ok",token:token})
                        } catch (error) {
                            if(error){
                                console.log(error)
                                return res.json({message:error})
                            }
                        }
                
            }
        )
      }else{
         return  res.json({
             message:"Invalid username - password"
         })
      }

}

exports.checkAuth = (req, res)=>{
    const token = req.headers["x-access-token"]
   console.log(token)
        if(token){
           const decoded =  jwt.verify(token,process.env.JWT_SECRET )
           var user_details = {
             id :decoded.id,
            username:decoded.username,
            email  : decoded.email
           }
           return res.json({message:"correct token",isValid:true,user_info:user_details})
           
        }else{
            return res.json({message:"invalid token",isValid:false})
        }
}