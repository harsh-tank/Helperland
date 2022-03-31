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
                .example('123H@321')
                .description('password'),
        })
    },
}