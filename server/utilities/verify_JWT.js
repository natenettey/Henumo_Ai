const verifyJWT = (req,res,next)=>{
    const token = req.headers["x-access-token"]?.split(' ')[1]
    try {
        if(token){
           const decoded =  jwt.verify(token,process.env.JWT_SECRET )
           const user_details = {
             id :decoded.id,
            username:decoded.username,
            email  : decoded.email
           }
           res.json({message:"Approved", details:user_details,isLogged:true})
        }
    } catch (error) {
        if(error) res.json({message:"incorrect token",isLogged:false})
    }
    
}