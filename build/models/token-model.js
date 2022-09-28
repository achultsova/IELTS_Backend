"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _a = require('mongoose'), Schema = _a.Schema, model = _a.model;
var TokenSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    refreshToken: { type: String, required: true },
});
module.exports = model('Token', TokenSchema);
