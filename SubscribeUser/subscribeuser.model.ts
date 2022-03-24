import { Joi } from 'celebrate';

const params: object = {
    id: Joi.number()
        .integer()
        .required()
        .description('Subscriber ID')
};

export const SubscribeUserSchema = {
    getSubscriber: {
        params: params
    },
    addSubscriber: {
        body: Joi.object({
            Email: Joi.string()
                .email()
                .example('xyz')
                .description('email of Subscriber')
        })
    }
};