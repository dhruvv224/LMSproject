const express=require('express')
const router=express.Router()
const {RegisterUser, displaydemo, LoginUser}=require('../Controler/UserAuth.js')
router.post('/register',RegisterUser)
router.get('/demo',displaydemo)
router.post('/login',LoginUser);


module.exports=router