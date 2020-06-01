const {Schema, model} = require('mongoose')

const event = new Schema({
    tour:
    {
        type: String,
        required: true,
    },

    guide:
    {
        type: String,
        required: true
    },

    date:
    {
        type: String,
        required: true
    },

    time:
    {
        type: String,
        required: true
    },

    group:
    {
        type: String,
        required: true
    },

    counter:
    {
        type: Number,
        required: true,
        default: 0
    }
}, {versionKey: false})

module.exports = model('Event', event)