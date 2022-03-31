import {Joi} from "celebrate"

const params:Object = {
    UserId: Joi.number().integer().required().description('Id of Customer')
};

export const CustomerSchema = {
    get: {
        params: params
    },
    add: {
        body: Joi.object({
            FirstName: Joi.string()
                .required()
                .example('Harsh')
                .description('FirstName of Customer'),
            LastName: Joi.string()
                .required()
                .example('Tank')
                .description('LastName of Customer'),
            Email: Joi.string()
                    .required()
                    .email()
                    .example('harsh@gmail.com')
                    .description('email of Customer'),
            Password: Joi.string()
                .required()
                .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
                .description('password of Customer'),
            Confirm_Password: Joi.string()
                .required()
                .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
                .description('confirmPassword'),
            Mobile: Joi.string()
                .required()
                .length(10)
                .example('1234567890')
                .description('Mobile of Customer'),
            ZipCode: Joi.string()
                .required()
                .example('380005')
                .description('Zip code of customer'),
        })
    },
}