const productModel = require('../model/productModel')


exports.addProduct = (req, res)=>{

   const productDetails = req.body
   console.log(productDetails)
   const newProduct  = new productModel({
    name:productDetails.nameOfProduct,
    image:productDetails.imageOfProduct,
    description:productDetails.descriptionOfProduct,
    productType:productDetails.typeOfProduct,
    company:productDetails.companyOfProduct
   }).save(
    (error)=>{
        if(error){
            console.log(error)
            return res.json({message:"Unable to save new product"})
        }
        else{
            return res.json({status:"ok", message:"Success"})
        }
    }
   )

}

exports.getProducts = async (req, res)=>{
    const productInfo = req.body
    console.log(productInfo)
    
    //get the products
    const userProducts = await productModel.find({
      company: productInfo.companyOfProduct,
    });

    //check if product exists
    if(userProducts){
        return res.json({status:"ok", userProducts:userProducts})
    }
    else{
        return res.json({message:"error"})
    }

}