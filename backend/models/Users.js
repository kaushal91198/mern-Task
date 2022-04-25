const mongoose = require("mongoose");

// eslint-disable-next-line no-undef
const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    email:{ 
        type: String, 
        required: true,
        unique:true
    },
    password:{ 
        type: String, 
        required: true 
    },
    date:{
        type:String,
        default:Date.now
    }
});

module.exports  =  mongoose.model('user',userSchema)