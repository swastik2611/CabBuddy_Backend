const mongoose = require("mongoose");
const User=mongoose.model('User')

const getUserProfile=async(req,res)=>{
    const user=await User.findById(req.header._id);
    if(user){
        res.json({
            _id:user._id,
            fname: user.fname,
            lname: user.lname,
            email: user.email,
            contact: user.contact,
        })
    }else{
        res.status(404).json({
            success:false,
            msg
        })
    }
}

module.exports={getUserProfile}
