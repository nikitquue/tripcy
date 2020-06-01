const {Schema, model} = require('mongoose')

const guide = new Schema({
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

    description:
    {
        type: String,
        required: true
    },

    password:
    {
        type: String,
        required: true
    },

    email:
    {
        type: String,
        required: true
    },

    rate:
    {
        type: Number,
        default: 0,
        required: false
    },

    events:
    {
        type: [String],
        required: false
    },

    rateCount:
    {
        type: Number,
        required: true,
        default: 0
    },

    image:
    {
        type: String,
        required: true
    },

    phone:
    {
        type: String,
        required: true
    }
}, {versionKey: false})

module.exports = model('Guide', guide)