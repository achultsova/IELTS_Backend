export { };
const TestModel = require('../models/test-model');
const TestDto = require('../dtos/test-dto');
const SectionDto = require('../dtos/section-dto');
const LastSectionDto = require('../dtos/lastSection-dto');
const ApiError = require('../exceptions/api-error');
const FirstSectionModel = require('../models/firstSection-model');
const SecondSectionModel = require('../models/secondSection-model');
const LastSectionModel = require('../models/lastSection-model');
import { ObjectId } from "mongoose"

class TestService {
    async createTest(count: number) {
        console.log(count)
        const candidate = await TestModel.findOne({ count })
        if (candidate) {
            throw ApiError.BadRequest(`Тест с таким номером ${count} уже существует`)
        }
        const firstSection = await FirstSectionModel.create({})
        const firstDto = new SectionDto(firstSection);
        const secondSection = await SecondSectionModel.create({})
        const secondDto = new SectionDto(secondSection);
        const lastSection = await LastSectionModel.create({})
        const lastDto = new LastSectionDto(lastSection);
        const test = await TestModel.create({ count, section1: firstDto.id, section2: secondDto.id, section3: lastDto.id })
        const testDto = new TestDto(test);
        await
            console.log('test created')
        return { test: testDto }
    }

    async getAllTests() {
        const tests = await TestModel.find();
        return tests;
    }

    async getTestNumber(testId: ObjectId) {
        const test = await TestModel.findOne({ _id: testId })
        if (!test) {
            throw ApiError.BadRequest('Тест с таким id не найден')
        }
        return test
    }
}



module.exports = new TestService();