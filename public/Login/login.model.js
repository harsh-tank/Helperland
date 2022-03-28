"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginSchema = void 0;
const celebrate_1 = require("celebrate");
exports.LoginSchema = {
    Login: {
        body: celebrate_1.Joi.object({
            Email: celebrate_1.Joi.string()
                .required()
                .email()
                .description('email of user'),
            Password: celebrate_1.Joi.string()
                .required()
                .example('123H@321')
                .description('password'),
        })
    },
};
