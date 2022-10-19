const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

//db connection
const mongoose =require('mongoose')
const mongoDB=`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@sandbox.p5qetim.mongodb.net/henumo_ai?retryWrites=true&w=majority`
mongoose.connect(mongoDB,{ useNewUrlParser: true , useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cors())


app.get('/home',(req,res)=>{
    res.json({
        name:"name",
        age:12
    })
})


app.listen(8000)