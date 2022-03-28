"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySettingsSchema = void 0;
const celebrate_1 = require("celebrate");
exports.MySettingsSchema = {
    Upd_User: {
        body: celebrate_1.Joi.object({
            FirstName: celebrate_1.Joi.string()
                .required()
                .example('xyz')
                .description('FirstName'),
            LastName: celebrate_1.Joi.string()
                .required()
                .example('xyz')
                .description('LastName'),
            Mobile: celebrate_1.Joi.string()
                .length(10)
                .required()
                .example('1234567890')
                .description('Phone No'),
            DateOfBirth: celebrate_1.Joi.string()
                .required()
                .example('01-01-2022')
                .description('birth date'),
            NationalityId: celebrate_1.Joi.number()
                .integer()
                .required()
                .example(1)
                .description('Language Used'),
            Gender: celebrate_1.Joi.string()
                .required()
                .example('Male/Female')
                .description('Gender'),
            Address: celebrate_1.Joi.object()
                .required()
                .description('address')
        })
    },
    Reset_Pass: {
        body: celebrate_1.Joi.object({
            Old_Password: celebrate_1.Joi.string()
                .required()
                .example('123456')
                .description('old password'),
            New_Password: celebrate_1.Joi.string()
                //.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
                .required()
                .example('123456HA')
                .description('new password'),
            Confirm_Password: celebrate_1.Joi.string()
                //.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
                .required()
                .example('123456HA')
                .description('confirm password')
        })
    },
};
