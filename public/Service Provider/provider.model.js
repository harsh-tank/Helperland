"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderSchema = void 0;
const celebrate_1 = require("celebrate");
const params = {
    UserId: celebrate_1.Joi.number()
        .integer()
        .required()
        .description('Id of Service Provider')
};
exports.ProviderSchema = {
    get: {
        params: params
    },
    validate: {
        body: celebrate_1.Joi.object({
            FirstName: celebrate_1.Joi.string()
                .required()
                .example('Harsh')
                .description('FirstName of Provider'),
            LastName: celebrate_1.Joi.string()
                .required()
                .example('Tank')
                .description('LastName of Provider'),
            Email: celebrate_1.Joi.string()
                .required()
                .email()
                .example('harsh@gmail.com')
                .description('email of Provider'),
            Password: celebrate_1.Joi.string()
                .required()
                .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
                .description('password'),
            Confirm_Password: celebrate_1.Joi.string()
                .required()
                .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
                .description('confirmPassword'),
            Mobile: celebrate_1.Joi.string()
                .required()
                .length(10)
                .example('1234567890')
                .description('Mobile of Service Provider'),
            ZipCode: celebrate_1.Joi.string()
                .required()
                .example('380005')
                .description('Zip code of Service Provider'),
        })
    },
};
