const {Schema, model} = require('mongoose')

const ticket = new Schema({
    tourTitle:
    {
        type: String,
        required: true,
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

    meetPoint:
    {
        type: String,
        required: true
    },

    guide:
    {
        type: Number,
        required: true
    },

    userName:
    {
        type: String,
        required: true
    },

    userSurname:
    {
        type: String,
        required: true
    },

    tripcyPhone:
    {
        type: String,
        required: true,
        default: "+38-057-776-56-89"
    },

    qr_code:
    {
        type: Number,
        required: true
    }
}, {versionKey: false})

module.exports = model('Ticket', ticket)