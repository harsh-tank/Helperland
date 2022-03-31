import {Joi} from "celebrate"

const params1: object = {
        id: Joi.number()
            .integer()
            .required()
            .description('Id of User')
    };