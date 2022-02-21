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
                .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
                .description('password'),
        })
    },
};
