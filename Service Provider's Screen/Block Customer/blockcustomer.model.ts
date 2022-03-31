import {Joi} from "celebrate"

export const BlockCustomerSchema = {
    
    Cust_Block: {
            body: Joi.object({
                    IsBlocked: Joi.boolean().required().example('true')
            })
    }
}
