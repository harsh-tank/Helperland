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
                .required()
                .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
                .description('New Password of user'),
        })
    },
};
