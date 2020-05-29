const {Schema, model} = require('mongoose')

const admin = new Schema({
    password:
    {
        type: String,
        required: true,
        default: "admin"
    },

    login:
    {
        type: String,
        required: true,
        default: "admin"
    }
}, {versionKey: false})

module.exports = model('Admin', admin)