const mongoose = require('mongoose')

const Schema = mongoose.Schema
const UserSchema  = new Schema(
    {
        username:{type:String, required:true, maxLength:100},
        email:{type:String, required:true, unique:true, maxLength:100},
        password:{type:String,required:true, minLength:8,maxLength:100},
        company:{type:String, minLength:3}
    }
)

module.exports = mongoose.model('User', UserSchema)