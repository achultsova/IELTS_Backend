export { };
const { Schema, model } = require('mongoose')

const SecondSectionSchema = new Schema({
    id: {
        type: String,
    },
    firstText: {
        type: String,
        default: ''
    },
    secondText: {
        type: String,
        default: ''
    }
})

module.exports = model('SecondSection', SecondSectionSchema)