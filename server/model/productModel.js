const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema(
    {
        name:{type:String, required:true},
        filePath:{
            type:String,
            
        }, 
        originalName:{
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