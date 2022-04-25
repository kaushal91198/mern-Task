const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true, 
        unique:false
    },
    // tag:{
    //     type: String,
    //     default: "General"
    // },
    date:{
        type: Date,
        required: true, 
        // default: Date.now
    },
  });

  module.exports = mongoose.model('notes', NotesSchema);