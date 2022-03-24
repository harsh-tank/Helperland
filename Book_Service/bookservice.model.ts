import {Joi} from "celebrate"

const header:Object = {
    authorization:  Joi.string().required()
};

export const BookServiceSchema = {
    zipcode_match: {
        body: Joi.object({
            postalcode: Joi.string()
                    .length(6)
                    .required()
                    .example('380005')
                    .description('ZipCode')
        })
    },
    U_Add: {
        body: Joi.object({
                AddressLine1: Joi.string()
                        .required()
                        .example('Sabarmati visat')
                        .description('Address 1'),
                AddressLine2: Joi.string()
                        .example('B/32 Ravipark')
                        .description('Address 2'),
                City: Joi.string()
                        .required()
                        .example('Ahmedabad')
                        .description('City'),
                State: Joi.string()
                        .example('Gujarat')
                        .description('State'),
                // PostalCode: Joi.string()
                //         .required()
                //         .length(6)
                //         .example('380005')
                //         .description('postal code'),
                IsDefault: Joi.boolean()
                        .required()
                        .example('true'),
                IsDeleted: Joi.boolean()
                        .required()
                        .example('true'),
                Mobile: Joi.string()
                        .example('7990604567')
                        .description('User mobile number')
           
        })
    },
    Create_Ser: {
        body: Joi.object({
                ServiceId: Joi.number()
                        .integer()
                        .required()
                        .example(1)
                        .description('ServiceId'),
                ServiceStartDate: Joi.string()
                        .required()
                        .example('01-01-2022')
                        .description('Date'),
                ServiceStartTime: Joi.string()
                        .required()
                        .example('09:00')
                        .description('Time'),
                ServiceHours: Joi.number()
                        .integer()
                        .required()
                        .example('3')
                        .description('Service Hours'),
                Comments: Joi.string()
                        .example('Hi')
                        .description('comment'),
                PaymentDue: Joi.boolean()
                        .required()
                        .example('true'),
                HasPets: Joi.boolean()
                        .required()
                        .example('true')
                        .description('Have pets at home'),
                ServiceRequestAddress: Joi.object()
                        .required(),
                ExtraService: Joi.array()
        })
    },
}