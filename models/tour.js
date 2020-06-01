const {Schema, model} = require('mongoose')

const tour = new Schema({
    title:
    {
        type: String,
        required: true,
    },

    description:
    {
        type: String,
        required: true
    },

    distance:
    {
        type: Number,
        required: true
    },

    duration:
    {
        type: Number,
        required: true
    },

    sights:
    {
        type: [String],
        required: true
    },

    meetPoint:
    {
        type: String,
        required: true
    },

    adress: {
        type: String,
        required: true
    },

    image:
    {
        type: String,
        require: true
    },

    image360:
    {
        type: String,
        require: true
    }
}, {versionKey: false})

module.exports = model('Tour', tour)