const {Schema, model} = require('mongoose')

const registeredUser = new Schema({
    name:
    {
        type: String,
        required: true,
    },

    email:
    {
        type: String,
        required: true
    },

    password:
    {
        type: String,
        required: true
    },

    phone:
    {
        type: String,
        required: true
    },

    creditCard:
    {
        type: Number,
        required: false
    },

    achieves:
    {
        type: [Number],
        required: false
    },

    tickets:
    {
        type: [Number],
        required: false
    },

    isVisitIndivid:
    {
        type: Boolean,
        required: false,
        default: false
    },

    amountOfTours:
    {
        type: Number,
        required: false,
        default: 0
    },

    firstRate:
    {
        type: Boolean,
        required: true,
        default: false
    }
}, {versionKey: false})

module.exports = model('User', registeredUser)