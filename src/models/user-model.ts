const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
    id: {
        type: String,
        unique: true,
    },
    name: {
        type: String,
    },
    surname: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isActivated: {
        type: Boolean,
        default: false
    },
    activationLink: {
        type: String
    },
    resetLink: {
        type: String
    }
})

module.exports = model('User', UserSchema)