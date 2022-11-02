const productModel = require('../model/productModel')


exports.addProduct = (req, res)=>{
    
    /*
    get the requests 
    get the info from the body
    save to database
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
    */
   const productDetails = req.body
   const newProduct  = new productModel({
    name:productDetails.name,
    description:productDetails.description,
    productType:productDetails.productType,
    company:productDetails.company
   }).save(
    (error)=>{
        if(error){
            return res.json({message:"Unable to save new product"})
        }
        else{
            return res.json({status:"ok", message:"Success"})
        }
    }
   )

}