import {Joi} from "celebrate"

export const MySettingsSchema = {
    User_Update: {
        body: Joi.object({
                FirstName: Joi.string()
                        .required()
                        .example('XYZ')
                        .description('FirstName'),
                LastName: Joi.string()
                        .required()
                        .example('XYZ')
                        .description('LastName'),
                Mobile: Joi.string()
                        .length(10)
                        .required()
                        .example('0123456789')
                        .description('Phone No'),
                DateOfBirth: Joi.string()
                        .required()
                        .example('01-01-2022')
                        .description('birth date'),
                LanguageId: Joi.number()
                        .integer()
                        .required()
                        .example(1)
                        .description('Preferred language')
           
        })
    },

    Create_or_Update_Add: {
        body: Joi.object({
                StreetName: Joi.string()
                        .required()
                        .example('XYZ')
                        .description('StreetName'),
                HouseNumber: Joi.string()
                        .required()
                        .example('XYZ')
                        .description('House No'),
                PostalCode: Joi.string()
                        .required()
                        .example('380005')
                        .description('Postal code'),
                City: Joi.string()
                        .required()
                        .example('Ahmedabad')
                        .description('City'),
                Mobile: Joi.string()
                        .required()
                        .length(10)
                        .example('0123456789')
                        .description('Phone No'),
           
        })
    },

    Reset_Pass: {
        body: Joi.object({
                Old_Password: Joi.string()
                        .required()
                        .example('12345678')
                        .description('password'),
                New_Password: Joi.string()
                        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
                        .required()
                        .example('123H@321')
                        .description('password'),
                Confirm_Password: Joi.string()
                        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
                        .required()
                        .example('123H@321')
                        .description('Confirm password')
           
        })
    },

}   