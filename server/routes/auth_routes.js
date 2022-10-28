const express = require('express');
const router = express.Router();
// Require controller modules
const auth_controller = require('../controllers/auth_controller')
// const verifyJWT = require("../utilities/verify_JWT")

const verifyJWT = (req,res,next)=>{
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
router.post('/register',auth_controller.register)
router.post('/login',auth_controller.login)
router.get('/auth-check',auth_controller.checkAuth)


module.exports = router