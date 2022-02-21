import {Joi} from "celebrate"

export const ForgotPasswordSchema = {
    Reset: {
        body: Joi.object({
            Email: Joi.string()
                    .required()
                    .email()
                    .example('harsh@gmail.com')
                    .description('Email of user'),
        })
    },
    changePassword: {
        body: Joi.object({
            resetLink: Joi.string()
                    .required()
                    .description('Reset link'),
            changedPassword: Joi.string()
                    .required()
                    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
                    .description('New Password of user'),
        })
    },
}