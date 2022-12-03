const mongoose = require('mongoose');
const journeySchema = mongoose.Schema({
    email:{
        type:String,
    },
    contact:{
        type:String,
        required:true,
        unique:true,
    },
    from:{
        type:String,
        required:true,
    },
    to:{
        type:String,
        required:true,
    },
    sourceCoordinates:{
        type:String,
    },
    destinationCoordinates:{
        type:String,
    },
    vacant:{
        type:Number,
        required:true,
    },
    fare:{
        type:Number,
        required:true,
    }
});
mongoose.model('Journey',journeySchema); 
// {
//     "email": "abcd@gmail.com",
//     "contact": "1234567890",
//     "from": "Mumbai",
//     "to": "Delhi",
//     "sourceCoordinates": "19.0760° N, 72.8777° E",
//     "destinationCoordinates": "28.7041° N, 77.1025° E",
//     "vacant": 2
// }