export { };
const { Schema, model } = require('mongoose')

const FirstSectionSchema = new Schema({
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



module.exports = model('FirstSection', FirstSectionSchema)

