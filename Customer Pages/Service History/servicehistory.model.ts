import {Joi} from "celebrate"

export const ServiceHistorySchema = {
    
    Rate: {
        body: Joi.object({
                Comments: Joi.string()
                        .example('Give XYZ Feedback')
                        .description('comment'),
                OnTimeArrival: Joi.number()
                        .example('5'),
                Friendly: Joi.number()
                        .example('5'),
                QualityOfService: Joi.number()
                        .example('5'),
        })
    },
}