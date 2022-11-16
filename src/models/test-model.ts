export { };
const { Schema, model } = require('mongoose')

const TestSchema = new Schema({
    id: {
        type: String,
    },
    count: {
        type: Number,
        required: true,
    },
    section1: {
        type: Schema.Types.ObjectId,
        ref: 'FirstSection',
    },
    section2: {
        type: Schema.Types.ObjectId,
        ref: 'SecondSection',
    },
    section3: {
        type: Schema.Types.ObjectId,
        ref: 'LastSection',
    },
    answers: {
        type: Array,
        default: []
    },
    isPublished: {
        type: Boolean,
        required: true,
        default: false
    }
})

module.exports = model('Test', TestSchema)