const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = mongoose.Schema({
    fname:{
        type:String,
        required:true,
    },
    lname:{
        type:String,
        required:true,
    },
    contact:{
        type:String,
        unique:true,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
});
userSchema.pre('save',function(next){
    const user = this;
    if(!user.isModified('password')){
        return next();
    }
    bcrypt.genSalt(10,(err,salt)=>{
        if(err){
            return next(err);
        }
        bcrypt.hash(user.password,salt,(err,hash)=>{
            if(err){
                return next(err);
            }
            user.password = hash;
            next();
        });
    }   
    );
}); 

userSchema.methods.comparePassword = function(candidatePassword){
    const user = this;
    return new Promise((resolve,reject)=>{
        bcrypt.compare(candidatePassword,user.password,(err,isMatch)=>{
            if(err){
                return reject(err);
            }
            if(!isMatch){
                return reject(false);
            }
            resolve(true);
        });
    }
    );
}; 
mongoose.model('User',userSchema);  

// {
//     "fname":"Swastik",
//     "lname":"Singh",
//     "contact":"+919695953090",
//     "email":"9920103039@mail.jiit.ac.in",
//     "password":"abcdefg",

// }