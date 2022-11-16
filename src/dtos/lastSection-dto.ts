module.exports = class lastSectionDto {
    id;
    text;


    constructor(model: { _id: string, text: string, }) {
        this.id = model._id;
        this.text = model.text;
    }
}