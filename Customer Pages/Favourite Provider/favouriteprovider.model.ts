import {Joi} from "celebrate"


export const FavoriteProviderSchema = {
    Favor: {
        body: Joi.object({
                IsFavorite: Joi.boolean().required().example('true')
        })
    },

    Block: {
        body: Joi.object({
                IsBlocked: Joi.boolean().required().example('true')
        })
    }
}