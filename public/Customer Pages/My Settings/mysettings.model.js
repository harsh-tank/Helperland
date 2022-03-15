"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySettingsSchema = void 0;
const celebrate_1 = require("celebrate");
exports.MySettingsSchema = {
    User_Update: {
        body: celebrate_1.Joi.object({
            FirstName: celebrate_1.Joi.string()
                .required()
                .example('XYZ')
                .description('FirstName'),
            LastName: celebrate_1.Joi.string()
                .required()
                .example('XYZ')
                .description('LastName'),
            Mobile: celebrate_1.Joi.string()
                .length(10)
                .required()
                .example('0123456789')
                .description('Phone No'),
            DateOfBirth: celebrate_1.Joi.string()
                .required()
                .example('01-01-2022')
                .description('birth date'),
            LanguageId: celebrate_1.Joi.number()
                .integer()
                .required()
                .example(1)
                .description('Preferred language')
        })
    },
    Create_or_Update_Add: {
        body: celebrate_1.Joi.object({
            StreetName: celebrate_1.Joi.string()
                .required()
                .example('XYZ')
                .description('StreetName'),
            HouseNumber: celebrate_1.Joi.string()
                .required()
                .example('XYZ')
                .description('House No'),
            PostalCode: celebrate_1.Joi.string()
                .required()
                .example('380005')
                .description('Postal code'),
            City: celebrate_1.Joi.string()
                .required()
                .example('Ahmedabad')
                .description('City'),
            Mobile: celebrate_1.Joi.string()
                .required()
                .length(10)
                .example('0123456789')
                .description('Phone No'),
        })
    },
    Reset_Pass: {
        body: celebrate_1.Joi.object({
            Old_Password: celebrate_1.Joi.string()
                .required()
                .example('12345678')
                .description('password'),
            New_Password: celebrate_1.Joi.string()
                .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
                .required()
                .example('123H@321')
                .description('password'),
            Confirm_Password: celebrate_1.Joi.string()
                .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
                .required()
                .example('123H@321')
                .description('Confirm password')
        })
    },
};
