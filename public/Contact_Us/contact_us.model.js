"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contact_UsSchema = void 0;
const celebrate_1 = require("celebrate");
const params = {
    Contact_UsId: celebrate_1.Joi.number()
        .integer()
        .required()
        .description('Id of Contact_Us')
};
exports.Contact_UsSchema = {
    get: {
        params: params
    },
    add_Con: {
        body: celebrate_1.Joi.object({
            Name: celebrate_1.Joi.string()
                .required()
                .example('Harsh')
                .description('Name of Contact_Us'),
            Email: celebrate_1.Joi.string()
                .required()
                .email()
                .example('abc@gmail.com')
                .description('email of Contact_Us'),
            Subject: celebrate_1.Joi.string()
                .example('abc')
                .description('Subject of Contact_Us'),
            PhoneNumber: celebrate_1.Joi.string()
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
            CreatedBy: celebrate_1.Joi.number().integer()
                .example('abc')
                .description('CreatedBy'),
        })
    },
    update: {
        params: params,
        body: celebrate_1.Joi.object({
            Name: celebrate_1.Joi.string()
                .required()
                .example('Harsh')
                .description('Name of Contact_Us'),
            Email: celebrate_1.Joi.string()
                .required()
                .email()
                .example('abc@gmail.com')
                .description('email of Contact_Us'),
            Subject: celebrate_1.Joi.string()
                .example('abc')
                .description('Subject of Contact_Us'),
            PhoneNumber: celebrate_1.Joi.string()
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
            CreatedBy: celebrate_1.Joi.number().integer()
                .example('abc')
                .description('CreatedBy'),
        })
    }
};
