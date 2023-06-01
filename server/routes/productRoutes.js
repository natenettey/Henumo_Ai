const express = require('express');
const router = express.Router();
const productRoutes = require('../controllers/productController')

router.post('/create-product', productRoutes.addProduct)
router.post('/fetchproducts',productRoutes.getProducts)
router.get('/fetch-all-products', productRoutes.getAllProducts)


module.exports = router