const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({

    header:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    createdAt : {
        type: Date,
        default: Date.now
    }
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;