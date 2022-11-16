module.exports = class sectionDto {
    id;
    firstText;
    secondText;


    constructor(model: { _id: string, firstText: string, secondText: string }) {
        this.id = model._id;
        this.firstText = model.firstText;
        this.secondText = model.secondText;
    }
}