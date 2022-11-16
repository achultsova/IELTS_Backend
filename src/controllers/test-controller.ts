const testService = require('../service/test-service');
const { validationResult } = require('express-validator');
const ApiError = require('../exceptions/api-error');
import mongoose from "mongoose";
import { ObjectId } from "mongoose";

class TestController {
    async createTest(req: any, res: any, next: any) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            }
            let { count } = req.body;
            count++
            const testData = await testService.createTest(count);
            return res.json(testData);
        } catch (e) {
            next(e);
        }
    }

    async getAllTests(req: any, res: any, next: any) {
        try {
            const tests = await testService.getAllTests();
            return res.json(tests);
        } catch (e) {
            next(e);
        }
    }

    async getTestNumber(req: any, res: any, next: any) {
        try {
            const testId = new mongoose.Types.ObjectId(req.params.id);
            const testData = await testService.getTestNumber(testId);
            return res.json(testData);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new TestController();