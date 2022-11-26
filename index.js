const express = require('express')
const bodyparser = require('body-parser')
const app=express();
var cors = require("cors");
app.use(cors());
const mongoose = require('mongoose')
const PORT=3000
const {mongoUrl}=require('./models/key')
require('./models/User')
require('./models/Journey')
const requireToken = require('./middleware/requireToken')
const authRoutes = require('./routes/authRoutes')
app.use(bodyparser.json());
app.use(authRoutes)
mongoose.connect(mongoUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
});
mongoose.connection.on('connected',()=>{
    console.log("connected to mongo"); 
});
mongoose.connection.on('error',(err)=>{
    console.log("error",err); 
});
app.use(bodyparser.json());

app.post('/signup',(req,res)=>{
    console.log(req.body);
    res.send("done");
});
app.post('/journey',(req,res)=>{
    console.log(req.body);
    res.send("done ok");
});
app.get('/',requireToken,(req,res)=>{
    res.send({email:req.user.email});
});
app.get('/availability',(req,res)=>{
    // res.send({from:req.journey.from});
    // console.log(res);
    // console.log(req);
    res.send("done hhe ok");
});
app.listen(PORT,()=>{
    console.log("server is running on",PORT);
});