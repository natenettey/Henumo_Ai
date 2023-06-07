const express = require('express');
const router = express.Router();
const reviewRoutes = require('../controllers/reviewController')

router.post('/add-review', reviewRoutes.addReview)


module.exports=router
