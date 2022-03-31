"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgotPasswordSchema = void 0;
const celebrate_1 = require("celebrate");
exports.ForgotPasswordSchema = {
    Reset: {
        body: celebrate_1.Joi.object({
            Email: celebrate_1.Joi.string()
                .required()
                .email()
                .example('harsh@gmail.com')
                .description('Email of user'),
        })
    },
    changePassword: {
        body: celebrate_1.Joi.object({
            resetLink: celebrate_1.Joi.string()
                .required()
                .description('Reset link'),
            changedPassword: celebrate_1.Joi.string()
                //.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
                .required()
                .example('123H@321')
                .description('password'),
            confirm_changedPassword: celebrate_1.Joi.string()
                //.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
                .required()
                .example('123H@321')
                .description('Confirm password'),
        })
    },
};
