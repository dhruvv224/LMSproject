const express=require('express')
const app=express()
require('dotenv').config()
const cors=require('cors')
cors()
const connectDb=require('./Config/ConnectDb.js')
const PORT=process.env.PORT || 5000
const bodyParser = require('body-parser');
connectDb()
app.use(bodyParser.json());
const userRoute=require('./Routes/UserRoute.js')
app.use('/api/users',userRoute)
app.get('/',(req,res)=>{
    res.send('hellllo')
})
app.listen(PORT,()=>{
    console.log("hello")
})
