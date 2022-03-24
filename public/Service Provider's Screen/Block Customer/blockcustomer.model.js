"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockCustomerSchema = void 0;
const celebrate_1 = require("celebrate");
exports.BlockCustomerSchema = {
    Cust_Block: {
        body: celebrate_1.Joi.object({
            IsBlocked: celebrate_1.Joi.boolean().required().example('true')
        })
    }
};
