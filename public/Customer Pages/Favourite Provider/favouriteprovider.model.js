"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoriteProviderSchema = void 0;
const celebrate_1 = require("celebrate");
exports.FavoriteProviderSchema = {
    Favor: {
        body: celebrate_1.Joi.object({
            IsFavorite: celebrate_1.Joi.boolean().required().example('true')
        })
    },
    Block: {
        body: celebrate_1.Joi.object({
            IsBlocked: celebrate_1.Joi.boolean().required().example('true')
        })
    }
};
