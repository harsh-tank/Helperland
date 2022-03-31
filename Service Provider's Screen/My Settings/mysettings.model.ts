import {Joi} from "celebrate"

export const MySettingsSchema = {
    Upd_User: {
        body: Joi.object({
                FirstName: Joi.string()
                        .required()
                        .example('xyz')
                        .description('FirstName'),
                LastName: Joi.string()
                        .required()
                        .example('xyz')
                        .description('LastName'),
                Mobile: Joi.string()
                        .length(10)
                        .required()
                        .example('1234567890')
                        .description('Phone No'),
                DateOfBirth: Joi.string()
                        .required()
                        .example('01-01-2022')
                        .description('birth date'),
                NationalityId: Joi.number()
                        .integer()
                        .required()
                        .example(1)
                        .description('Language Used'),
                Gender: Joi.string()
                        .required()
                        .example('Male/Female')
                        .description('Gender'),
                Address: Joi.object()
                        .required()
                        .description('address')
           
        })
    },

    Reset_Pass: {
        body: Joi.object({
                Old_Password: Joi.string()
                        .required()
                        .example('123456')
                        .description('old password'),
                New_Password: Joi.string()
                        //.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
                        .required()
                        .example('123456HA')
                        .description('new password'),
                Confirm_Password: Joi.string()
                        //.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
                        .required()
                        .example('123456HA')
                        .description('confirm password')
           
        })
    },
}