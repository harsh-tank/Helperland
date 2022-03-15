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
                    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
                    .required()
                    .example('123H@321')
                    .description('password'),
            confirm_changedPassword: Joi.string()
                    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
                    .required()
                    .example('123H@321')
                    .description('Confirm password'),
        })
    },
}