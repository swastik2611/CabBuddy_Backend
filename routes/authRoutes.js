const express = require('express')
const mongoose = require('mongoose')
const jwt=require('jsonwebtoken');
const { jwtkey } = require('../models/key');
const router = express.Router();
const User = mongoose.model('User');
const Journey = mongoose.model('Journey');
const a="128",b="62";
router.post('/signup',async (req,res)=>{
   const{fname,lname,contact,email,password}=req.body;
   try{
    const user = new User({fname,lname,contact,email,password});
    await user.save();
    const token = jwt.sign({userId:user._id},jwtkey)
    res.send({token});
   }catch(err){
       return res.status(422).send(err.message);
   }
});
router.post('/journey',async (req,res)=>{
   const{email,contact,from,to,sourceCoordinates,destinationCoordinates,vacant}=req.body;
   try{
    frm=from;
    const journey = new Journey({email,contact,from,to,sourceCoordinates,destinationCoordinates,vacant});
    await journey.save();
    const token = jwt.sign({journeyId:journey._id},jwtkey)
    res.send({token});
   }catch(err){
       return res.status(422).send(err.message);
   } 
});
router.get('/availability',async (req,res)=>{
    const{frm,too,cntct,vct}=req.body;
    try{
        const journey = await Journey.find({from:{$regex:a},to:{$regex:b}});
        console.log(req.body);
        res.send(journey);
        // console.log(journey);
    }catch(err){
        return res.status(422).send(err.message);
    }
});
router.post('/signin',async (req,res)=>{
    const{email,password}=req.body;
    if(!email || !password){
        return res.status(422).send({error:"must provide email and password"});
    }
    const user = await User.findOne({email});
    if(!user){
        return res.status(422).send({error:"must provide email and password"});
    }
    try{
        await user.comparePassword(password);
       const token = jwt.sign({userId:user._id},jwtkey);
        res.send({token});
    }catch(err){
        return res.status(422).send({error:"must provide email and password"});
    }
});
module.exports = router;