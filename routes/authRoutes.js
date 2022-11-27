const express = require('express')
const mongoose = require('mongoose')
const jwt=require('jsonwebtoken');
const { jwtkey } = require('../models/key');
const router = express.Router();
const User = mongoose.model('User');
const Journey = mongoose.model('Journey');
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
    const journey = new Journey({email,contact,from,to,sourceCoordinates,destinationCoordinates,vacant});
    await journey.save();
    const token = jwt.sign({journeyId:journey._id},jwtkey)
    res.send({token});
   }catch(err){
       return res.status(422).send(err.message);
   } 
});
router.get('/availability',async (req,res)=>{
    //const{from,to,contact,vacant}=req.body;
    try{
        const journey = await Journey.find();
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