const verifyToken = (token)=>{
    const token = req.headers["x-access-token"]?.split(' ')[1]
    try {
        if(token){
           const decoded =  jwt.verify(token,process.env.JWT_SECRET )
           var user_details = {
             id :decoded.id,
            username:decoded.username,
            email  : decoded.email
           }
           
           next()
        }
    } catch (error) {
        if(error) res.json({message:"incorrect token",isLogged:false})
    }
    
}
module.exports=verifyJWT