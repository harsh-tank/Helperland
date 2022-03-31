"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerSchema = void 0;
const celebrate_1 = require("celebrate");
const params = {
    UserId: celebrate_1.Joi.number().integer().required().description('Id of Customer')
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
                //.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
                .description('password of Customer'),
            Confirm_Password: celebrate_1.Joi.string()
                .required()
                //.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
                .description('confirmPassword'),
            Mobile: celebrate_1.Joi.string()
                .required()
                .length(10)
                .example('1234567890')
                .description('Mobile of Customer'),
            ZipCode: celebrate_1.Joi.string()
                .required()
                .example('380005')
                .description('Zip code of customer'),
        })
    },
};
