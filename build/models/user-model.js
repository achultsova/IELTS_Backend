"use strict";
var _a = require('mongoose'), Schema = _a.Schema, model = _a.model;
var UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
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
    isActivated: {
        type: Boolean,
        default: false
    },
    activationLink: {
        type: String
    }
});
module.exports = model('User', UserSchema);
