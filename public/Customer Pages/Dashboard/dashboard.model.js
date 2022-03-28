"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardSchema = void 0;
const celebrate_1 = require("celebrate");
const params1 = {
    id: celebrate_1.Joi.number()
        .integer()
        .required()
        .description('Id of User')
};
exports.DashboardSchema = {
    PrintDashboard: {
        params: params1
    },
    Reschedule_SR: {
        body: celebrate_1.Joi.object({
            date: celebrate_1.Joi.string()
                .required()
                .example('01-03-2022')
                .description('date of rescheduled Service'),
            time: celebrate_1.Joi.string()
                .required()
                .example('10:30')
                .description('time of rescheduled Service')
        })
    },
    Cancel_SR: {
        body: celebrate_1.Joi.object({
            comment: celebrate_1.Joi.string()
                .example('Due to XYZ Reason')
                .description('comment')
        })
    },
};
