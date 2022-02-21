"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookServiceSchema = void 0;
const celebrate_1 = require("celebrate");
const header = {
    authorization: celebrate_1.Joi.string().required()
};
exports.BookServiceSchema = {
    zipcode_match: {
        body: celebrate_1.Joi.object({
            postalcode: celebrate_1.Joi.string()
                .length(6)
                .required()
                .example('380005')
                .description('ZipCode')
        })
    },
    U_Add: {
        body: celebrate_1.Joi.object({
            AddressLine1: celebrate_1.Joi.string()
                .required()
                .example('Sabarmati visat')
                .description('Address 1'),
            AddressLine2: celebrate_1.Joi.string()
                .example('B/32 Ravipark')
                .description('Address 2'),
            City: celebrate_1.Joi.string()
                .required()
                .example('Ahmedabad')
                .description('City'),
            State: celebrate_1.Joi.string()
                .example('Gujarat')
                .description('State'),
            PostalCode: celebrate_1.Joi.string()
                .required()
                .length(6)
                .example('380005')
                .description('postal code'),
            IsDefault: celebrate_1.Joi.boolean()
                .required()
                .example('true'),
            IsDeleted: celebrate_1.Joi.boolean()
                .required()
                .example('true'),
            Mobile: celebrate_1.Joi.string()
                .example('7990604567')
                .description('User mobile number')
        })
    },
    Create_Ser: {
        body: celebrate_1.Joi.object({
            ServiceId: celebrate_1.Joi.number()
                .integer()
                .required()
                .example(1)
                .description('ServiceId'),
            ServiceStartDate: celebrate_1.Joi.date()
                .required()
                .example('10-02-2022')
                .description('Date'),
            ServiceStartTime: celebrate_1.Joi.string()
                .required()
                .example('09:00')
                .description('Time'),
            ServiceHours: celebrate_1.Joi.number()
                .integer()
                .required()
                .example('3')
                .description('Service Hours'),
            Comments: celebrate_1.Joi.string()
                .example('Hi')
                .description('comment'),
            PaymentDue: celebrate_1.Joi.boolean()
                .required()
                .example('true'),
            HasPets: celebrate_1.Joi.boolean()
                .required()
                .example('true')
                .description('Have pets at home'),
            ServiceRequestAddress: celebrate_1.Joi.object()
                .required(),
            ExtraService: celebrate_1.Joi.array()
        })
    },
};
