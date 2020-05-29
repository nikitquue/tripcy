const {Schema, model} = require('mongoose')

const group = new Schema({

    title:
    {
        type: String, // Personal (1-5)
        required: true
    },

    max:
    {
        type: Number, // 5
        required: true
    },

    cost:
    {
        type: Number,
        required: true
    }
}, {versionKey: false})

module.exports = model('Group', group)