const {Schema, model} = require('mongoose')

const card = new Schema({
    name:
    {
        type: String,
        required: true
    },
    
    surname:
    {
        type: String,
        required: true
    },

    number:
    {
        type: String,
        required: true
    },  
    
    term:
    {
        type: String,
        required: true
    },
    
    cvv:
    {
        type: String,
        required: true
    }
}, {versionKey: false})

module.exports = model('Card', card)