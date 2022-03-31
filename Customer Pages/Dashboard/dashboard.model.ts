import {Joi} from "celebrate"

const params1: object = {
    id: Joi.number()
        .integer()
        .required()
        .description('Id of User')
};

export const DashboardSchema = {

    PrintDashboard: {
            params:params1
    },

    Reschedule_SR: {
            body: Joi.object({
                    date:Joi.string()
                            .required()
                            .example('01-03-2022')
                            .description('date of rescheduled Service'),
                    time:Joi.string()
                            .required()
                            .example('10:30')
                            .description('time of rescheduled Service')
                    
            })
},

Cancel_SR: {
    body: Joi.object({
            comment:Joi.string()
                    .example('Due to XYZ Reason')
                    .description('comment')
            
    })
},
}
