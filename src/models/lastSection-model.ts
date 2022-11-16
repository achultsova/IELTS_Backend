export { };
const { Schema, model } = require('mongoose')

const LastSectionSchema = new Schema({
    id: {
        type: String,
    },
    text: {
        type: String,
        default: ''
    }
})

module.exports = model('LastSection', LastSectionSchema)