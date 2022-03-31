import {Joi} from "celebrate"

const params:Object = {
    UserId: Joi.number().integer().required().description('Id of Service Provider')
};

export const ProviderSchema = {
    get: {
        params: params
    },
    validate: {
        body: Joi.object({
            FirstName: Joi.string()
                .required()
                .example('Harsh')
                .description('FirstName of Provider'),
            LastName: Joi.string()
                .required()
                .example('Tank')
                .description('LastName of Provider'),
            Email: Joi.string()
                    .required()
                    .email()
                    .example('harsh@gmail.com')
                    .description('email of Provider'),
            Password: Joi.string()
                .required()
                .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
                .description('password'),
            Confirm_Password: Joi.string()
                .required()
                .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
                .description('confirmPassword'),
            Mobile: Joi.string()
                .required()
                .length(10)
                .example('1234567890')
                .description('Mobile of Service Provider'),
            ZipCode: Joi.string()
                .required()
                .example('380005')
                .description('Zip code of Service Provider'),
        })
    },
}