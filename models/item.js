const mongoose = require('mongoose')


const itemSchema = new mongoose.Schema({
    itemName:{
        type: String,
        required:true
    },
    
     itemDiscription:{
        type: String,
        required: true
    },

    itemType:{
        type:String,
        required:true
    },
})

module.exports = mongoose.model('Item',itemSchema)