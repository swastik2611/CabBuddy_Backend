const express = require('express')
const mongoose = require('mongoose')
const jwt=require('jsonwebtoken');
const { jwtkey } = require('../models/key');
const router = express.Router();
const User = mongoose.model('User');
const Journey = mongoose.model('Journey');
var c="hehe",d="hoho",e="35",f="34",g="24";
var eml="1";
router.post('/signup',async (req,res)=>{
   const{fname,lname,contact,email,password}=req.body;
   console.log(req.body);
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
   const{email,contact,from,to,sourceCoordinates,destinationCoordinates,vacant,fare}=req.body;
   console.log("body is",req.body);
   try{
    const journey = new Journey({email,contact,from,to,sourceCoordinates,destinationCoordinates,vacant,fare});
    await journey.save();
    const token = jwt.sign({journeyId:journey._id},jwtkey)
    res.send({token});
   }catch(err){
       return res.status(422).send(err.message);
   } 
});
router.post('/demand',(req,res)=>{
    const{from,to,contact,vacant,fare}=req.body;
    console.log("demand",req.body);
    c=from;
    d=to;
    e=contact;
    f=vacant;
    g=fare;
    console.log("c,d",c,d);
    res.send({"from":from,"to":to,"contact":contact,"vacant":vacant});
});
router.get('/availability',async (req,res)=>{
    const{from,to,contact,vacant}=req.body;
    console.log(req.body);
    try{
        const journey = await Journey.find({from:{$regex:c},to:{$regex:d},vacant:{$gte:f}});
        console.log(req.body);
        res.send(journey);
        // console.log(journey);
    }catch(err){
        return res.status(422).send(err.message);
    }
});
router.get("/getprofile", async (req, res) => {
  
  try {
    const user = await User.find({
      email: { $regex: eml },
    });
    // console.log(req.body);
    res.send(user);
    // console.log(journey);
  } catch (err) {
    return res.status(422).send(err.message);
  }
});
router.post('/profile', (req, res) => {
  const {email} = req.body;
  console.log("email",email);
  eml=email;
  res.send({"email":email});
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