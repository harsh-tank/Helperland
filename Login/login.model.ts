import {Joi} from "celebrate"



export const LoginSchema = {
    Login: {
        body: Joi.object({
            Email: Joi.string()
                    .required()
                    .email()
                    .description('email of user'),
            Password: Joi.string()
                .required()
                .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
                .description('password'),
        })
    },
}