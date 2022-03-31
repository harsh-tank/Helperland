import {Joi} from "celebrate"
const params1: object = {
    id: Joi.number().integer().required().description('User ID')
};