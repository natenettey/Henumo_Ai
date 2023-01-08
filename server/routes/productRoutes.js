const express = require('express');
const router = express.Router();
const productRoutes = require('../controllers/productController')

router.post('/create-product', productRoutes.addProduct)
router.get('/fetchproducts',productRoutes.getProducts)

module.exports = router