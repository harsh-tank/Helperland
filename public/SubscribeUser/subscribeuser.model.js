"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscribeUserSchema = void 0;
const celebrate_1 = require("celebrate");
const params = {
    id: celebrate_1.Joi.number()
        .integer()
        .required()
        .description('Subscriber ID')
};
exports.SubscribeUserSchema = {
    getSubscriber: {
        params: params
    },
    addSubscriber: {
        body: celebrate_1.Joi.object({
            Email: celebrate_1.Joi.string()
                .email()
                .example('xyz')
                .description('email of Subscriber')
        })
    }
};
