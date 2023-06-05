const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema(
    {
        _id: {
            type: Schema.Types.ObjectId,
            default: mongoose.Types.ObjectId
          },
        name:{type:String, required:true},
        image:{
            type:String,  
        }, 
        
        description:{ 
            type:String,
            required:true
        },
        productType:{
            type:String,
            required:true
        },
        company:{
            type:String,
            required:true
        }
    }
)

module.exports = mongoose.model('Products', ProductSchema)