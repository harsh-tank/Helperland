import express from "express";
import router from "./routes";
import cors from "cors";
import {sequelize} from "./models";
import  swaggerJSDoc from "swagger-jsdoc";
import  swaggerUI from "swagger-ui-express";

const corsOptions = {
    origin: `http://localhost:${process.env.PORT}`
  };

  const app = express();

  const swaggerOption={
    definition:{
        openapi:'3.0.0',
        info:{
            title:'SignUp and Login APIs',
            version: '1.0.0',
            description:'Helperland SignUp and Login APIs',
            contact:{
                name:'Harsh Tank',
                email:'harshptank2212@gmail.com'
            },
            servers:[
                {
                url: "http://locslhost:3000"
                }
            ]
        }
    },
    apis:["routes.ts"]
}
const swaggerDocs = swaggerJSDoc(swaggerOption);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
  
  app.use(cors(corsOptions));

  app.use(express.json());
  app.use(express.urlencoded({ extended: false}));
  require('dotenv').config();

app.use('/',router);

app.listen(process.env.PORT, () => {
  console.log(`Server rocking at ${process.env.PORT}`)
  sequelize.authenticate().then(async() => {
      console.log("database connected");

      try {
          await sequelize.sync();
      } catch (error) {
          console.log(error)
      }

  }).catch( (e: any) => {
      console.log(e.message)
  })
})