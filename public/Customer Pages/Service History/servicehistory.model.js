"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceHistorySchema = void 0;
const celebrate_1 = require("celebrate");
exports.ServiceHistorySchema = {
    Rate: {
        body: celebrate_1.Joi.object({
            Comments: celebrate_1.Joi.string()
                .example('Give XYZ Feedback')
                .description('comment'),
            OnTimeArrival: celebrate_1.Joi.number()
                .example('5'),
            Friendly: celebrate_1.Joi.number()
                .example('5'),
            QualityOfService: celebrate_1.Joi.number()
                .example('5'),
        })
    },
};
