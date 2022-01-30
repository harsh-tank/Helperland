import { Joi } from 'celebrate';

const params: object = {
    id: Joi.number()
        .integer()
        .required()
        .description('Id of Contact_Us')
};

export const Contact_UsSchema = {
    get: {
        params: params
    },
    add: {
        body: Joi.object({
            Name: Joi.string()
                .required()
                .example('Max')
                .description('Name of Contact_Us'),
            Email: Joi.string()
                .required()
                .email()
                .example('abc@gmail.com')
                .description('email of Contact_Us'),
            SubjectType: Joi.string()
                .required()
                .example('abc')
                .description('SubjectType of Contact_Us'),
            Subject: Joi.string()
                .example('abc')
                .description('Subject of Contact_Us'),
            PhoneNumber: Joi.number().integer()
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
            CreatedOn: Joi.date()
                .example('abc')
                .description('CreatedDate of Contact_Us'),
            Status: Joi.number().integer()
                .example('abc')
                .description('Status of Contact_Us'),
            Priority: Joi.number().integer()
                .example('abc')
                .description('Priority of Contact_Us'),
            AssignedToUser: Joi.number().integer()
                .example('abc')
                .description('AssignedToUser of Contact_Us'),
            IsDeleted: Joi.number().integer()
                .example('abc')
                .description('AssignedToUser of Contact_Us'),   
        })
    },
    update: {
        params: params,
        body: Joi.object({
            Name: Joi.string()
                .required()
                .example('Max')
                .description('Name of Contact_Us'),
            Email: Joi.string()
                .required()
                .email()
                .example('abc@gmail.com')
                .description('email of Contact_Us'),
            SubjectType: Joi.string()
                .required()
                .example('abc')
                .description('SubjectType of Contact_Us'),
            Subject: Joi.string()
                .example('abc')
                .description('Subject of Contact_Us'),
            PhoneNumber: Joi.number().integer()
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
            CreatedOn: Joi.date()
                .example('abc')
                .description('CreatedDate of Contact_Us'),
            Status: Joi.number().integer()
                .example('abc')
                .description('Status of Contact_Us'),
            Priority: Joi.number().integer()
                .example('abc')
                .description('Priority of Contact_Us'),
            AssignedToUser: Joi.number().integer()
                .example('abc')
                .description('AssignedToUser of Contact_Us'),
            IsDeleted: Joi.number().integer()
                .example('abc')
                .description('AssignedToUser of Contact_Us'),   
        })
    }
};

