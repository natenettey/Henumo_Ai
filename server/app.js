const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const auth_router = require('./routes/auth_routes')
const product_router = require('./routes/productRoutes')

//db connection
const mongoose =require('mongoose')
const mongoDB=`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@sandbox.p5qetim.mongodb.net/henumo_ai?retryWrites=true&w=majority`
mongoose.connect(mongoDB,{ useNewUrlParser: true , useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cors())
app.use('/account',auth_router)
app.use('/products',product_router)
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
 })


// app.get('/home',(req,res)=>{
//     res.json({
//         name:"name",
//         age:12
//     })
// })


app.listen(8000)