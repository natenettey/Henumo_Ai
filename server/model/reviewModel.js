const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ReviewSchema = new Schema(
    {
        productId: {
            type: Schema.Types.ObjectId,
            ref: 'Products',
            required:true
          },
        reviewerName:{type:String, required:true},
        reviewerEmail:{
            type:String,
            required:true  
        }, 
        
        rating:{ 
            type:String,
            required:true
        },
        comment:{
            type:String,
            required:true
        },
        date:{
            type:String,
            required:true
        }
    }
)

module.exports = mongoose.model('Reviews', ReviewSchema)