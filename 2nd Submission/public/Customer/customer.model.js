"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerSchema = void 0;
const celebrate_1 = require("celebrate");
const params = {
    id: celebrate_1.Joi.number()
        .integer()
        .required()
        .description('Id of Customer')
};
exports.CustomerSchema = {
    get: {
        params: params
    },
    add: {
        body: celebrate_1.Joi.object({
            FirstName: celebrate_1.Joi.string()
                .required()
                .example('Harsh')
                .description('FirstName of Customer'),
            LastName: celebrate_1.Joi.string()
                .required()
                .example('Tank')
                .description('LastName of Customer'),
            Email: celebrate_1.Joi.string()
                .required()
                .email()
                .example('harsh@gmail.com')
                .description('email of Customer'),
            Password: celebrate_1.Joi.string()
                .required()
                .description('password of Customer'),
            Confirm_Password: celebrate_1.Joi.string()
                .required()
                .description('confirmPassword'),
            Mobile: celebrate_1.Joi.string()
                .required()
                .example('1234567890')
                .description('Mobile of Customer'),
        })
    },
};
