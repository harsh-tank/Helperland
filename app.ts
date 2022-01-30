import express from "express";
import {sequelize} from "./models";
import router from "./routes";
import multer from "multer";
import  swaggerJSDoc from "swagger-jsdoc";
import  swaggerUI from "swagger-ui-express";
//import router from "./routes";
// import swaggerUi from "swagger-ui-express";
// const internalDoc = require('./swagger/swagger.json');

require('dotenv').config();
const app = express();

const swaggerOption={
    definition:{
        openapi:'3.0.0',
        info:{
            title:'Contact_Us API',
            version: '1.0.0',
            description:'Helperland ContactUs API',
            contact:{
                name:'Harsh Tank',
                email:'harshptank2212@gmail.com'
            },
            servers:[
                {
                url: "http://localhost:3000"
                }
            ]
        }
    },
    apis:["routes.ts"]
}
const swaggerDocs = swaggerJSDoc(swaggerOption);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(multer({dest:'uploadFiles'}).single('file'));

app.use('/', router);

//app.use('/swagger', swaggerUi.serve, swaggerUi.setup(internalDoc));

app.listen(process.env.PORT, () => {
    console.log(`Server rocking at ${process.env.PORT}`)
    sequelize.authenticate().then(async() => {
        console.log("database connected");

        try {
            //await sequelize.sync()
        } catch (error) {
            console.log(error)
        }

    }).catch( (e: any) => {
        console.log(e.message)
    })
})

// export { app };