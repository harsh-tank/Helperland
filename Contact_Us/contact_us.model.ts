import { Joi } from 'celebrate';

const params: object = {
    Contact_UsId: Joi.number()
        .integer()
        .required()
        .description('Id of Contact_Us')
};

export const Contact_UsSchema = {
    get: {
        params: params
    },
    add_Con: {
        body: Joi.object({
            Name: Joi.string()
                .required()
                .example('Harsh')
                .description('Name of Contact_Us'),
            Email: Joi.string()
                .required()
                .email()
                .example('abc@gmail.com')
                .description('email of Contact_Us'),
            Subject: Joi.string()
                .example('abc')
                .description('Subject of Contact_Us'),
            PhoneNumber: Joi.string()
                .required()
                .example('1234567890')
                .description('Number of Contact_Us'),
            Message: Joi.string()
                .required()
                .example('abc')
                .description('Message of Contact_Us'),
            UploadFileName: Joi.string()
                .example('abc')
                .description('FileName of Contact_Us'),
            Filepath: Joi.string()
                .example('abc')
                .description('Filepath of Contact_Us'),
            CreatedBy: Joi.number().integer()
                .example('abc')
                .description('CreatedBy'),  
        })
    },
    update: {
        params: params,
        body: Joi.object({
            Name: Joi.string()
                .required()
                .example('Harsh')
                .description('Name of Contact_Us'),
            Email: Joi.string()
                .required()
                .email()
                .example('abc@gmail.com')
                .description('email of Contact_Us'),
            Subject: Joi.string()
                .example('abc')
                .description('Subject of Contact_Us'),
            PhoneNumber: Joi.string()
                .required()
                .example('1234567890')
                .description('Number of Contact_Us'),
            Message: Joi.string()
                .required()
                .example('abc')
                .description('Message of Contact_Us'),
            UploadFileName: Joi.string()
                .example('abc')
                .description('FileName of Contact_Us'),
            Filepath: Joi.string()
                .example('abc')
                .description('Filepath of Contact_Us'),
            CreatedBy: Joi.number().integer()
                .example('abc')
                .description('CreatedBy'),   
        })
    }
};

