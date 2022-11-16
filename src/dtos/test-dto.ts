import { ObjectId } from "mongoose";

module.exports = class TestDto {
    id;
    count;
    section1;
    section2;
    section3;
    answers;
    isPublished;


    constructor(model: { _id: string, count: number, section1: ObjectId, section2: ObjectId, section3: ObjectId, answers: string[], isPublished: boolean }) {
        this.id = model._id;
        this.count = model.count;
        this.section1 = model.section1;
        this.section2 = model.section2;
        this.section3 = model.section3;
        this.answers = model.answers;
        this.isPublished = model.isPublished;
    }
}