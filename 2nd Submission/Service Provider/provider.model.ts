import {Joi} from "celebrate"

const params:Object = {
    id: Joi.number()
            .integer()
            .required()
            .description('Id of Service Provider')
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
                .description('password'),
            Confirm_Password: Joi.string()
                .required()
                .description('confirmPassword'),
            Mobile: Joi.string()
                .required()
                .example('1234567890')
                .description('Mobile of Service Provider'),
            
        })
    },
}