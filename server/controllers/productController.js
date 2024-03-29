const productModel = require("../model/productModel");
const jwt = require("jsonwebtoken");

exports.addProduct = (req, res) => {
  console.log(req.headers);
  const token = req.headers.authorization;
  console.log("token issss", token);
  // return res.json({ status: "ok", message: "Success" });
  try {
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const productDetails = req.body;
      console.log(productDetails);
      const newProduct = new productModel({
        name: productDetails.nameOfProduct,
        image: productDetails.imageOfProduct,
        description: productDetails.descriptionOfProduct,
        productType: productDetails.typeOfProduct,
        company: productDetails.companyOfProduct,
      }).save((error) => {
        if (error) {
          console.log(error);
          return res.json({
            status: "Error",
            message: "Unable to save new product",
          });
        } else {
          return res.json({ status: "ok", message: "Success" });
        }
      });
    } else {
      return res
        .status(401)
        .json({ status: "Unauthorized", message: "Invalid Token" });
    }
  } catch (error) {
    return res.status(401).json({ status: "Unauthorized", message: error });
  }
};

exports.getProducts = async (req, res) => {
  const token = req.headers.authorization;
  // console.log("token is", token);
  const productInfo = req.body;
  console.log(productInfo);

  try {
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      //get the products
      const userProducts = await productModel.find({
        company: productInfo.companyOfProduct,
      });
      //check if product exists
      if (userProducts) {
        return res.json({ status: "ok", userProducts: userProducts });
      } else {
        return res.json({ message: "error" });
      }
    }
  } catch (error) {
    return res.status(401).json({ status: "Unauthorized", message: error });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const allProducts = await productModel.find({})
    if(allProducts){
      res.json({status: "ok", products:allProducts})
    }else{
      res.json({message:error})
    }
  } catch (error) {
    res.json({message:error})
  }
 
}

exports.getSpecificProduct = async (req, res)=>{
   try {
    //body containsid
    const productInfo = req.body
    !productInfo && res.json({status:"bad",message:"no id passed"})

    const singleProduct = await productModel.find({
      _id:productInfo.id
    })

    if(singleProduct){
      res.json({status: "ok", product:singleProduct})
    }else{
      res.json({message:error})
    }
   } catch (error) {
    
   }

}