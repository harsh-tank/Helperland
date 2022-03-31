import {Joi} from "celebrate"

const params1: object = {
    id: Joi.number().integer().required().description('User ID')
};
export const SR_Schema = {
    upd_SR: {
        body: Joi.object({
            AddressLine1:Joi.string()
                        .required()
                        .example('Shaktivijay')
                        .description('Street name'),
            AddressLine2:Joi.string()
                        .required()
                        .example('44')
                        .description('House number'),
            City:Joi.string()
                        .required()
                        .example('Surat')
                        .description('City'),
            Notes:Joi.string()
                        .example('Comment')
                        .description('Comment'),
            PostalCode:Joi.string()
                        .required()
                        .example('395006')
                        .description('Zip code'),
            RescheduleReason:Joi.string()
                        .example('Reason')
                        .description('Reason'),
            ServiceRequestId:Joi.number()
                        .required()
                        .example('4')
                        .description('Service request id'),
            ServiceStartDate:Joi.string()
                        .required()
                        .example('18/03/2022')
                        .description('Date'),
            ServiceTime:Joi.string()
                        .required()
                        .example('18:00')
                        .description('Time'),
                
        })
    },

}