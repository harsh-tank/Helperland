"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contact_UsSchema = void 0;
const celebrate_1 = require("celebrate");
const params = {
    id: celebrate_1.Joi.number()
        .integer()
        .required()
        .description('Id of Contact_Us')
};
exports.Contact_UsSchema = {
    get: {
        params: params
    },
    add: {
        body: celebrate_1.Joi.object({
            Name: celebrate_1.Joi.string()
                .required()
                .example('Max')
                .description('Name of Contact_Us'),
            Email: celebrate_1.Joi.string()
                .required()
                .email()
                .example('abc@gmail.com')
                .description('email of Contact_Us'),
            SubjectType: celebrate_1.Joi.string()
                .required()
                .example('abc')
                .description('SubjectType of Contact_Us'),
            Subject: celebrate_1.Joi.string()
                .example('abc')
                .description('Subject of Contact_Us'),
            PhoneNumber: celebrate_1.Joi.number().integer()
                .required()
                .example('1234567890')
                .description('Number of Contact_Us'),
            Message: celebrate_1.Joi.string()
                .required()
                .example('abc')
                .description('Message of Contact_Us'),
            UploadFileName: celebrate_1.Joi.string()
                .example('abc')
                .description('FileName of Contact_Us'),
            Filepath: celebrate_1.Joi.string()
                .example('abc')
                .description('Filepath of Contact_Us'),
            CreatedOn: celebrate_1.Joi.date()
                .example('abc')
                .description('CreatedDate of Contact_Us'),
            Status: celebrate_1.Joi.number().integer()
                .example('abc')
                .description('Status of Contact_Us'),
            Priority: celebrate_1.Joi.number().integer()
                .example('abc')
                .description('Priority of Contact_Us'),
            AssignedToUser: celebrate_1.Joi.number().integer()
                .example('abc')
                .description('AssignedToUser of Contact_Us'),
            IsDeleted: celebrate_1.Joi.number().integer()
                .example('abc')
                .description('AssignedToUser of Contact_Us'),
        })
    },
    update: {
        params: params,
        body: celebrate_1.Joi.object({
            Name: celebrate_1.Joi.string()
                .required()
                .example('Max')
                .description('Name of Contact_Us'),
            Email: celebrate_1.Joi.string()
                .required()
                .email()
                .example('abc@gmail.com')
                .description('email of Contact_Us'),
            SubjectType: celebrate_1.Joi.string()
                .required()
                .example('abc')
                .description('SubjectType of Contact_Us'),
            Subject: celebrate_1.Joi.string()
                .example('abc')
                .description('Subject of Contact_Us'),
            PhoneNumber: celebrate_1.Joi.number().integer()
                .required()
                .example('1234567890')
                .description('Number of Contact_Us'),
            Message: celebrate_1.Joi.string()
                .required()
                .example('abc')
                .description('Message of Contact_Us'),
            UploadFileName: celebrate_1.Joi.string()
                .example('abc')
                .description('FileName of Contact_Us'),
            Filepath: celebrate_1.Joi.string()
                .example('abc')
                .description('Filepath of Contact_Us'),
            CreatedOn: celebrate_1.Joi.date()
                .example('abc')
                .description('CreatedDate of Contact_Us'),
            Status: celebrate_1.Joi.number().integer()
                .example('abc')
                .description('Status of Contact_Us'),
            Priority: celebrate_1.Joi.number().integer()
                .example('abc')
                .description('Priority of Contact_Us'),
            AssignedToUser: celebrate_1.Joi.number().integer()
                .example('abc')
                .description('AssignedToUser of Contact_Us'),
            IsDeleted: celebrate_1.Joi.number().integer()
                .example('abc')
                .description('AssignedToUser of Contact_Us'),
        })
    }
};
