const {Schema, model} = require('mongoose')

const sight = new Schema({
    title:
    {
        type: String,
        required: true
    },
    
    description:
    {
        type: String,
        required: true
    },

    image:
    {
        type: String,
        required: true
    }
}, {versionKey: false})

module.exports = model('Sight', sight)